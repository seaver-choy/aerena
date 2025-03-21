import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";

import { scheduleSchema } from "../../schema";

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!conn) {
        conn = await mongoose
            .createConnection(uri, {
                serverSelectionTimeoutMS: 5000,
                dbName: "aerena",
            })
            .asPromise();

        conn.model("Schedules", scheduleSchema);
    }
    if (event.path.includes("active")) {
        return getActiveSchedules(event);
    } else if (event.path.includes("nearest")) {
        return getNearestSchedules(event);
    } else {
        switch (event.httpMethod) {
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

async function getActiveSchedules(event: APIGatewayProxyEvent) {
    const scheduleModel = conn!.model("Schedules");

    try {
        const league = event.queryStringParameters?.league;
        const result = await scheduleModel.aggregate([
            {
                $match: {
                    league: league,
                },
            },
            {
                $lookup: {
                    from: "ml_tournaments",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$code", league] },
                                        { $eq: ["$isActiveFilter", true] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "tournamentData",
                },
            },
            {
                $sort: { matchDate: 1 },
            },
            {
                $group: {
                    _id: {
                        league: "$league",
                        week: "$week",
                    },
                    schedules: { $push: "$$ROOT" },
                },
            },
        ]);

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No active schedules found" }),
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
                message: `Failed to get active schedules list: ${e}`,
            }),
        };
    }
}
async function getNearestSchedules(event: APIGatewayProxyEvent) {
    const scheduleModel = conn!.model("Schedules");

    try {
        const leagueTypes = event
            .queryStringParameters!.leagueTypes!.split(",")
            .filter((type) => type !== "");
        const currentDate = new Date();
        const result = await scheduleModel.aggregate([
            {
                $match: {
                    league: { $in: leagueTypes },
                    matchDate: { $gt: currentDate },
                },
            },
            {
                $sort: { matchDate: 1 },
            },
            {
                $group: {
                    _id: {
                        league: "$league",
                        week: "$week",
                    },
                    schedules: { $push: "$$ROOT" },
                },
            },
        ]);

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No teams found" }),
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
                message: `Failed to get teams list: ${e}`,
            }),
        };
    }
}
