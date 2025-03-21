import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";

import {
    mlTournamentSchema,
    teamProfileSchema,
    teamSchema,
} from "../../schema";

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

        conn.model("MLTournaments", mlTournamentSchema);
        conn.model("TeamProfiles", teamProfileSchema);
        conn.model("Teams", teamSchema);
    }
    if (event.path.includes("leagues")) {
        return getLeagues();
    } else if (event.path.includes("countries")) {
        return getCountries();
    } else if (event.path.includes("filtered")) {
        return getFilteredLeagues(event);
    } else if (event.path.includes("teamprofiles")) {
        return getTeamProfiles();
    } else if (event.path.includes("teams")) {
        return getTeams(event);
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

async function getLeagues() {
    const mlTournamentModel = conn!.model("MLTournaments");

    try {
        const result = await mlTournamentModel
            .find({ isActiveFilter: true })
            .sort({ endDate: -1 })
            .select("code");

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

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify([...new Set(result.map((item) => item.code))]),
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

async function getTeamProfiles() {
    const teamProfilesModel = conn!.model("TeamProfiles");

    try {
        const result = await teamProfilesModel.find();

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No team profiles found" }),
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
                message: `Failed to get team profiles list: ${e}`,
            }),
        };
    }
}
async function getCountries() {
    const teamProfilesModel = conn!.model("TeamProfiles");

    try {
        const result = await teamProfilesModel.aggregate([
            { $group: { _id: "$country" } },
            { $sort: { _id: 1 } },
        ]);
        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No countries found" }),
            };
        }
        const countries = result.map((item) => item._id);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(countries),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: `Failed to get countries list: ${e}`,
            }),
        };
    }
}

async function getFilteredLeagues(event: APIGatewayProxyEvent) {
    const mlTournamentModel = conn!.model("MLTournaments");

    try {
        const country = event.queryStringParameters?.country;
        const result = await mlTournamentModel
            .find({
                code:
                    country === "ALL"
                        ? { $regex: /^(SPS|M\d+|MSC)/i }
                        : { $regex: `^${country}`, $options: "i" },
            })
            .sort({ endDate: -1 })
            .select("code");

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

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify([...new Set(result.map((item) => item.code))]),
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

async function getTeams(event: APIGatewayProxyEvent) {
    const teamModel = conn!.model("Teams");

    try {
        const leagueTypes = event
            .queryStringParameters!.leagueTypes!.split(",")
            .filter((type) => type !== "");
        const result = await teamModel.find({ league: { $in: leagueTypes } });

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
