import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import {
    athleteSchema,
    matchStatsSchema,
    totalStatsSchema,
    athleteProfileSchema,
    mlTournamentSchema,
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
            conn.model("MatchStats", matchStatsSchema);
            conn.model("AthleteProfiles", athleteProfileSchema);
            conn.model("MLTournaments", mlTournamentSchema);
        }

        if (event.httpMethod === "GET") {
            const eventProxy = event.pathParameters?.proxy;
            const params = eventProxy?.split("/");

            /*
                params[0] = playerName
                params[1] = week
                params[2] = league
            */
            if (params?.[1] === "latest") {
                return await getAthleteLatestSeasonAverageStats(event);
            } else if (params?.[1] === "moonton") {
                return await getAthleteAllTimeAverageMoontonStats(event);
            } else if (params?.[0] === "league") {
                return await getAthleteLeagueStats(event);
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

async function getAthleteLeagueStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("MatchStats");

    const athleteId = parseInt(event.queryStringParameters!.athleteId!);
    const params = event.pathParameters?.proxy?.split("/");
    /*
        params[0] = type
    */

    if (params !== undefined) {
        try {
            //check first if matches for that league exists for the player

            const result = await statsModel.find({
                athleteId: athleteId,
                competitionType: params[1],
            });

            if (result.length > 0) {
                const leagueStats = await statsModel.aggregate(
                    [
                        {
                            $match: {
                                athleteId: athleteId,
                                competitionType: params[1],
                            },
                        },
                        {
                            $group: {
                                _id: "$league",
                                league: {
                                    $first: "$league",
                                },
                                averageKills: {
                                    $avg: "$kills",
                                },
                                totalKills: {
                                    $sum: "$kills",
                                },
                                averageDeaths: {
                                    $avg: "$deaths",
                                },
                                totalDeaths: {
                                    $sum: "$deaths",
                                },
                                averageAssists: {
                                    $avg: "$assists",
                                },
                                totalAssists: {
                                    $sum: "$assists",
                                },
                                averagePoints: {
                                    $avg: "$points",
                                },
                                totalPoints: {
                                    $sum: "$points",
                                },
                                winRate: {
                                    $avg: {
                                        $cond: ["$teamWon", 100, 0],
                                    },
                                },
                                totalWins: {
                                    $sum: {
                                        $cond: ["$teamWon", 1, 0],
                                    },
                                },
                                mvpRate: {
                                    $avg: {
                                        $cond: ["$isMVP", 100, 0],
                                    },
                                },
                                totalMVPs: {
                                    $sum: {
                                        $cond: ["$isMVP", 1, 0],
                                    },
                                },
                            },
                        },
                    ],
                    { allowDiskUse: true, maxTimeMS: 60000 }
                );

                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        leagueStats: leagueStats,
                        results: true,
                    }),
                };
            } else {
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({ results: false }),
                };
            }
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "An error has occured while getting league stats",
                }),
            };
        }
    } else {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: "An error has occured while getting league stats",
            }),
        };
    }
}
async function getAthleteWeeklyStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("MatchStats");

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
            let inputType = {};
            if (params[2] === "all") {
                inputType = {
                    athleteId: parseInt(params[0]),
                    league: params[1],
                };
            } else if (params[2] === "playoffs") {
                inputType = {
                    athleteId: parseInt(params[0]),
                    league: params[1],
                    playoffs: true,
                };
            } else {
                inputType = {
                    athleteId: parseInt(params[0]),
                    league: params[1],
                    day: parseInt(params[2]),
                };
            }
            console.log(inputType);
            const stats = await statsModel.aggregate(
                [
                    {
                        $match: inputType,
                    },
                    {
                        $group: {
                            _id: "$player",
                            averageKills: {
                                $avg: "$kills",
                            },
                            totalKills: {
                                $sum: "$kills",
                            },
                            averageDeaths: {
                                $avg: "$deaths",
                            },
                            totalDeaths: {
                                $sum: "$deaths",
                            },
                            averageAssists: {
                                $avg: "$assists",
                            },
                            totalAssists: {
                                $sum: "$assists",
                            },
                            averagePoints: {
                                $sum: "$points",
                            },
                            totalPoints: {
                                $sum: "$points",
                            },
                            winRate: {
                                $avg: {
                                    $cond: ["$teamWon", 100, 0],
                                },
                            },
                            totalWins: {
                                $sum: {
                                    $cond: ["$teamWon", 1, 0],
                                },
                            },
                            mvpRate: {
                                $avg: {
                                    $cond: ["$isMVP", 100, 0],
                                },
                            },
                            totalMvps: {
                                $sum: {
                                    $cond: ["$isMVP", 1, 0],
                                },
                            },
                        },
                    },
                ],
                { allowDiskUse: true, maxTimeMS: 60000 }
            );

            if (!stats) {
                if (params[2] === "all") {
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            message: `Athlete ${params[0]}'s stats for league ${params[1]} does not exist`,
                            status: "failed",
                        }),
                    };
                } else if (params[2] === "playoffs") {
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            message: `Athlete ${params[0]}'s playoff stats for league ${params[1]} does not exist `,
                            status: "failed",
                        }),
                    };
                } else {
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            message: `Athlete or athlete's stats for league ${params[1]} and day/week ${params[2]} does not exist`,
                            status: "failed",
                        }),
                    };
                }
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ stats: stats, status: "success" }),
            };
        } catch (e) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: "An error has occured while getting stats",
                    error: e,
                    status: "failed",
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
            body: JSON.stringify({
                message: "Path parameters are undefined",
                status: "failed",
            }),
        };
    }
}

async function getAthleteLatestSeasonAverageStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("MatchStats");
    const profileModel = conn!.model("AthleteProfiles");
    //const totalStatsModel = conn!.model("TotalStats");
    const params = event.pathParameters?.proxy?.split("/");

    /*
      params[0] = athleteId
    */

    //const athleteModel = conn!.model("Athletes");

    if (params !== undefined) {
        const athleteId = parseInt(params[0]);

        try {
            //get the athlete's latest tournament by getting the athlete profile
            const profile = await profileModel.findOne({
                athleteId: athleteId,
            });

            //aggregate and get the average stats for the latest tournament
            const average = await statsModel.aggregate(
                [
                    {
                        $match: {
                            athleteId: athleteId,
                            league: profile.latestTournament.code,
                        },
                    },
                    {
                        $group: {
                            _id: "$player",
                            averageKills: {
                                $avg: "$kills",
                            },
                            averageDeaths: {
                                $avg: "$deaths",
                            },
                            averageAssists: {
                                $avg: "$assists",
                            },
                            averagePoints: {
                                $avg: "$points",
                            },
                        },
                    },
                ],
                { allowDiskUse: true, maxTimeMS: 60000 }
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ average: average }),
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: "An error has occured while getting all stats",
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

async function getAthleteAllTimeAverageMoontonStats(
    event: APIGatewayProxyEvent
) {
    const statsModel = conn!.model("MatchStats");
    const mlModel = conn!.model("MLTournaments");

    const params = event.pathParameters?.proxy?.split("/");

    if (params !== undefined) {
        const athleteId = parseInt(params[0]);

        try {
            //get all the accredited moonton tournaments in ml_tournaments collection
            const mlTournaments = await mlModel.find(
                {
                    accredited: true,
                },
                { code: 1, _id: 0 }
            );

            //transform mlTournaments into code array

            if (mlTournaments.length === 0) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: "No accredited moonton tournaments found",
                    }),
                };
            } else {
                //aggregate and get the average stats for all accredited moonton tournaments the athlete has played on

                const codeArray = mlTournaments.map((x) => x.code);
                const average = await statsModel.aggregate(
                    [
                        {
                            $match: {
                                athleteId: athleteId,
                                league: {
                                    $in: codeArray,
                                },
                            },
                        },
                        {
                            $group: {
                                _id: "$player",
                                averageKills: {
                                    $avg: "$kills",
                                },
                                averageDeaths: {
                                    $avg: "$deaths",
                                },
                                averageAssists: {
                                    $avg: "$assists",
                                },
                                averagePoints: {
                                    $avg: "$points",
                                },
                            },
                        },
                    ],
                    {
                        allowDiskUse: true,
                        maxTimeMS: 60000,
                    }
                );

                if (average) {
                    return {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            average: average,
                            status: "success",
                        }),
                    };
                } else {
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            message: `No stats found for athlete ${athleteId}`,
                            status: "failed",
                        }),
                    };
                }
            }
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: "An error has occured while getting all stats",
                    error: e,
                    status: "failed",
                }),
            };
        }
    } else {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "No parameters found",
                status: "failed",
            }),
        };
    }
}

// async function getBatchMatchStats(event: APIGatewayProxyEvent) {
//     const athleteModel = conn!.model("Athletes");
//     const statsModel = conn!.model("MatchStats");

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
