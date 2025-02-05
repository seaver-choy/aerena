import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import {
    athleteSchema,
    athleteStatsSchema,
    totalStatsSchema,
} from "../../schema";
let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        if (!conn) {
            conn = await mongoose
                .createConnection(uri, {
                    serverSelectionTimeoutMS: 5000,
                    dbName: "aerena",
                })
                .asPromise();

            conn.model("Athletes", athleteSchema);
            conn.model("TotalStats", totalStatsSchema);
            conn.model("AthleteStats", athleteStatsSchema);
        }

        if (event.httpMethod === "GET") {
            const eventProxy = event.pathParameters?.proxy;
            const params = eventProxy?.split("/");

            /*
                params[0] = playerName
                params[1] = week
                params[2] = league
            */
            if (params?.[2] === "all") {
                return await getAthleteTotalStats(event);
            } else {
                return await getAthleteWeeklyStats(event);
            }
        } else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Method not found for this path"),
            };
        }

        // if (event.path.includes("all")) {
        //     return await getAthleteTotalStats(event);
        // } else if (event.path.includes("weekly")) {
        //     return await getAthleteWeeklyStats(event);
        // } else {
        //     return {
        //         statusCode: 404,
        //         headers: {
        //             "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //             "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //         },
        //         body: JSON.stringify("Method not found"),
        //     };
        // }
    } catch (e) {
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "An error has occured while getting stats",
                error: e,
            }),
        };
    }
};

async function getAthleteWeeklyStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("AthleteStats");

    const params = event.pathParameters?.proxy?.split("/");
    /*
      params[0] = playerName
      params[1] = league
      params[2] = week
    */
    if (params !== undefined) {
        try {
            // const weeklyStats = await statsModel.find({
            //     player: params[0],
            //     week: parseInt(params[1]),
            // });

            const weeklyStats = await statsModel.aggregate(
                [
                    {
                        $match: {
                            player: decodeURIComponent(params[0]),
                            league: params[1],
                            week: parseInt(params[2]),
                        },
                    },
                    {
                        $group: {
                            _id: "$player",
                            totalKills: {
                                $sum: "$kill",
                            },
                            totalDeaths: {
                                $sum: "$death",
                            },
                            totalAssists: {
                                $sum: "$assist",
                            },
                            kdaRatio: {
                                $avg: "$KDA",
                            },
                            gold: {
                                $sum: "$gold",
                            },
                            heroDamage: {
                                $sum: "$hero_damage",
                            },
                            damageTaken: {
                                $sum: "$damage_taken",
                            },
                            towerDamage: {
                                $sum: "$tower_damage",
                            },
                        },
                    },
                ],
                { allowDiskUse: true, maxTimeMS: 60000 }
            );

            if (!weeklyStats) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(
                        `Athlete or athlete's stats for week ${params[1]} does not exist`
                    ),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ weeklyStats: weeklyStats }),
            };
        } catch (e) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: "An error has occured while getting weekly stats",
                    error: e,
                }),
            };
        }
    } else {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ message: "Path parameters are undefined" }),
        };
    }
}

async function getAthleteTotalStats(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");
    //const totalStatsModel = conn!.model("TotalStats");
    const params = event.pathParameters?.proxy?.split("/");

    /*
      params[0] = playerName
      params[1] = league
    */
    if (params !== undefined) {
        try {
            const allStats = await athleteModel.findOne({
                player: decodeURIComponent(params[0]),
                league: params[1],
            });

            if (!allStats) {
                console.error(`[STATS] Athlete ${params[0]} does not exist`);
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(`Athlete ${params[0]} does not exist`),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ allStats: allStats }),
            };
        } catch (e) {
            console.error(`[STATS] Failed to get athlete total stats \n ${e}`);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Failed to get athlete total stats"),
            };
        }
    } else {
        console.error(`[STATS] Params is undefined`);
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify("Path parameters are undefined"),
        };
    }
}

// async function getBatchAthleteStats(event: APIGatewayProxyEvent) {
//     const athleteModel = conn!.model("Athletes");
//     const statsModel = conn!.model("AthleteStats");

//     const payload = JSON.parse(JSON.parse(event.body!));
//     try {
//         const playerName = payload.playerName;

//         const athleteAllStats = await athleteModel.findOne({
//             player: playerName,
//         });

//         if (!athleteAllStats) {
//             //player does not exist
//             return {
//                 statusCode: 404,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
//                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
//                 },
//                 body: JSON.stringify("Athlete all stats does not exist"),
//             };
//         }
//         const athleteMatchStats = await statsModel.find({
//             player: playerName,
//         });

//         if (!athleteMatchStats) {
//             return {
//                 statusCode: 404,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
//                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
//                 },
//                 body: JSON.stringify("Athlete match stats does not exist"),
//             };
//         }

//         return {
//             statusoCode: 200,
//             headers: {
//                 "Access-Control-Allow-Origin": "*", // Required for CORS support to work
//                 "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
//             },
//             body: JSON.stringify({
//                 allStats: athleteAllStats,
//                 matchStats: athleteMatchStats,
//             }),
//         };
//     } catch (e) {
//         return {
//             statusCode: 500,
//             headers: {
//                 "Access-Control-Allow-Origin": "*", // Required for CORS support to work
//                 "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
//             },
//             body: JSON.stringify("Failed to get athlete stats"),
//         };
//     }
// }
