import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";

import { packInfoSchema } from "../../schema";

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!conn) {
        conn = await mongoose
            .createConnection(uri, {
                serverSelectionTimeoutMS: 5000,
                dbName: "playible",
            })
            .asPromise();

        conn.model("PackInfos", packInfoSchema);
    }
    if (event.path.includes("league")) {
        switch (event.httpMethod) {
            case "GET":
                return getLeagues();
            default: {
                return {
                    statusCode: 405,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: "Unsupported HTTP method or path",
                    }),
                };
            }
        }
    } else {
        switch (event.httpMethod) {
            case "GET":
                return getPackInfos();
            default:
                return {
                    statusCode: 405,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: "Unsupported HTTP method or path",
                    }),
                };
        }
    }
};

async function getPackInfos() {
    const packInfoModel = conn!.model("PackInfos");

    try {
        const result = await packInfoModel.aggregate([
            {
                $match: {
                    isActive: true,
                },
            },
            {
                $addFields: {
                    packTypeOrder: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$packType", "starter"],
                                    },
                                    then: 1,
                                },
                                {
                                    case: {
                                        $eq: ["$packType", "mythic"],
                                    },
                                    then: 2,
                                },
                                {
                                    case: {
                                        $eq: ["$packType", "epic"],
                                    },
                                    then: 3,
                                },
                                {
                                    case: {
                                        $eq: ["$packType", "warrior"],
                                    },
                                    then: 4,
                                },
                            ],
                            default: 5,
                        },
                    },
                },
            },
            { $sort: { packTypeOrder: 1 } },
            { $project: { packTypeOrder: 0 } },
        ]);

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No packInfos found" }),
            };
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(result),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: `Failed to get packInfos list: ${e}`,
            }),
        };
    }
}

async function getLeagues() {
    const packInfoModel = conn!.model("PackInfos");

    try {
        const result = await packInfoModel
            .find({ isActive: true })
            .select({ leagueType: 1, competitionType: 1 });

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No leagues found" }),
            };
        }
        const leagueTypes = [
            ...new Map(
                result.map((item) => [
                    JSON.stringify([item.competitionType, item.leagueType]),
                    item,
                ])
            ).values(),
        ];

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(leagueTypes),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: `Failed to get league list: ${e}`,
            }),
        };
    }
}
