import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";

import { matchStatsSchema, scheduleSchema } from "../../schema";

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
        conn.model("MatchStats", matchStatsSchema);
    }
    if (event.path.includes("active")) {
        return getActiveSchedules(event);
    } else if (event.path.includes("nearest")) {
        return getNearestSchedules(event);
    } else if (event.path.includes("specificmatchstats")) {
        return getSpecificMatchStats(event);
    } else if (event.path.includes("rankingstats")) {
        return getRankingStats(event);
    } else if (event.path.includes("scheduleweeks")) {
        return getScheduleWeeks(event);
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
        const league = event.queryStringParameters!.league;
        const currentDate = new Date();
        const weekResult = await scheduleModel.findOne({
            league: league,
            matchDate: { $gt: currentDate },
        });

        if (!weekResult) {
            throw new Error("No upcoming matches found");
        }

        const week = weekResult.week;

        const result = await scheduleModel.aggregate([
            {
                $match: {
                    league: league,
                    matchDate: { $gt: currentDate },
                    week: week,
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
                body: JSON.stringify({ message: "No schedule found" }),
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

async function getSpecificMatchStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("MatchStats");
    const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];

    try {
        const matchId = event.queryStringParameters?.matchId;
        const team1 = event.queryStringParameters?.team1;
        const team2 = event.queryStringParameters?.team2;
        // First aggregation for team1
        const team1Pipeline = [
            {
                $match: {
                    match_id: matchId,
                    team: team1,
                },
            },
            {
                $lookup: {
                    from: "athletes",
                    let: { athleteId: "$athleteId", league: "$league" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$athleteId", "$athleteId"] },
                                        { $eq: ["$$league", "$league"] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                position: { $arrayElemAt: ["$position", 0] },
                            },
                        },
                    ],
                    as: "athleteInfo",
                },
            },
            {
                $unwind: "$athleteInfo",
            },
            {
                $group: {
                    _id: {
                        team: "$team",
                        game: "$game",
                    },
                    players: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    team: "$_id.team",
                    game: "$_id.game",
                    players: {
                        $map: {
                            input: positionList,
                            as: "pos",
                            in: {
                                position: "$$pos",
                                stats: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$players",
                                                cond: {
                                                    $and: [
                                                        {
                                                            $eq: [
                                                                "$$this.athleteInfo.position",
                                                                "$$pos",
                                                            ],
                                                        },
                                                        {
                                                            $ne: [
                                                                "$$this.athleteId",
                                                                null,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        ];

        // Second aggregation for team2
        const team2Pipeline = [
            {
                $match: {
                    match_id: matchId,
                    team: team2,
                },
            },
            {
                $lookup: {
                    from: "athletes",
                    let: { athleteId: "$athleteId", league: "$league" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$athleteId", "$athleteId"] },
                                        { $eq: ["$$league", "$league"] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                position: { $arrayElemAt: ["$position", 0] },
                            },
                        },
                    ],
                    as: "athleteInfo",
                },
            },
            {
                $unwind: "$athleteInfo",
            },
            {
                $group: {
                    _id: {
                        team: "$team",
                        game: "$game",
                    },
                    players: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    team: "$_id.team",
                    game: "$_id.game",
                    players: {
                        $map: {
                            input: positionList,
                            as: "pos",
                            in: {
                                position: "$$pos",
                                stats: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$players",
                                                cond: {
                                                    $and: [
                                                        {
                                                            $eq: [
                                                                "$$this.athleteInfo.position",
                                                                "$$pos",
                                                            ],
                                                        },
                                                        {
                                                            $ne: [
                                                                "$$this.athleteId",
                                                                null,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        ];

        // Execute both aggregations and combine results
        const team1Results = await statsModel.aggregate(team1Pipeline);
        const team2Results = await statsModel.aggregate(team2Pipeline);

        const result = [...team1Results, ...team2Results];

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

async function getRankingStats(event: APIGatewayProxyEvent) {
    const statsModel = conn!.model("MatchStats");

    try {
        const league = event.queryStringParameters?.league;
        const week = event.queryStringParameters?.week;

        // let result;
        // if (league!.length == 2) {
        //     result = await statsModel.aggregate([
        //         {
        //             $match: {
        //                 league: {
        //                     $regex: `^${league}`,
        //                     $options: "i",
        //                 },
        //             },
        //         },
        //         {
        //             $addFields: {
        //                 matchDate: {
        //                     $dateFromString: {
        //                         dateString: {
        //                             $arrayElemAt: [
        //                                 { $split: ["$match_id", "-"] },
        //                                 2,
        //                             ],
        //                         },
        //                         format: "%Y%m%d",
        //                     },
        //                 },
        //             },
        //         },
        //         {
        //             $sort: {
        //                 matchDate: -1,
        //             },
        //         },
        //         {
        //             $lookup: {
        //                 from: "teams",
        //                 let: {
        //                     team: "$team",
        //                     athleteId: "$athleteId",
        //                     league: "$league",
        //                 },
        //                 pipeline: [
        //                     {
        //                         $match: {
        //                             $expr: {
        //                                 $and: [
        //                                     { $eq: ["$key", "$$team"] },
        //                                     { $eq: ["$league", "$$league"] },
        //                                 ],
        //                             },
        //                         },
        //                     },
        //                     {
        //                         $project: {
        //                             _id: 0,
        //                             colors: 1,
        //                             position: {
        //                                 $arrayElemAt: [
        //                                     {
        //                                         $map: {
        //                                             input: {
        //                                                 $filter: {
        //                                                     input: "$players",
        //                                                     cond: {
        //                                                         $eq: [
        //                                                             "$$this.athleteId",
        //                                                             "$$athleteId",
        //                                                         ],
        //                                                     },
        //                                                 },
        //                                             },
        //                                             as: "player",
        //                                             in: "$$player.position",
        //                                         },
        //                                     },
        //                                     0,
        //                                 ],
        //                             },
        //                         },
        //                     },
        //                 ],
        //                 as: "teamInfo",
        //             },
        //         },
        //         {
        //             $addFields: {
        //                 teamInfo: { $arrayElemAt: ["$teamInfo", 0] },
        //             },
        //         },
        //         {
        //             $group: {
        //                 _id: "$athleteId",
        //                 player: { $first: "$player" },
        //                 team: { $first: "$team" },
        //                 league: { $first: "$league" },
        //                 teamInfo: { $first: "$teamInfo" },
        //                 matchDate: { $first: "$matchDate" },
        //                 totalKills: { $sum: "$kills" },
        //                 avgKills: { $avg: "$kills" },
        //                 maxKills: { $max: "$kills" },
        //                 totalAssists: { $sum: "$assists" },
        //                 avgAssists: { $avg: "$assists" },
        //                 maxAssists: { $max: "$assists" },
        //                 avgKDA: { $avg: "$kda" },
        //                 maxKDA: { $max: "$kda" },
        //                 mvpCount: { $sum: { $cond: ["$isMVP", 1, 0] } },
        //                 totalPoints: { $sum: "$points" },
        //                 avgPoints: { $avg: "$points" },
        //                 maxPoints: { $max: "$points" },
        //             },
        //         },
        //     ]);
        // } else {
        // result = await statsModel.aggregate([
        const result = await statsModel.aggregate([
            {
                $match: {
                    league: league,
                    day:
                        week === "0" || week === ""
                            ? { $exists: true }
                            : parseInt(week!),
                },
            },
            {
                $lookup: {
                    from: "teams",
                    let: {
                        team: "$team",
                        athleteId: "$athleteId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$key", "$$team"] },
                                        { $eq: ["$league", league] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                colors: 1,
                                position: {
                                    $arrayElemAt: [
                                        {
                                            $map: {
                                                input: {
                                                    $filter: {
                                                        input: "$players",
                                                        cond: {
                                                            $eq: [
                                                                "$$this.athleteId",
                                                                "$$athleteId",
                                                            ],
                                                        },
                                                    },
                                                },
                                                as: "player",
                                                in: "$$player.position",
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    ],
                    as: "teamInfo",
                },
            },
            {
                $addFields: {
                    teamInfo: {
                        $arrayElemAt: ["$teamInfo", 0],
                    },
                },
            },
            {
                $group: {
                    _id: "$athleteId",
                    player: { $first: "$player" },
                    team: { $first: "$team" },
                    league: { $first: "$league" },
                    teamInfo: { $first: "$teamInfo" },
                    totalKills: { $sum: "$kills" },
                    avgKills: { $avg: "$kills" },
                    maxKills: { $max: "$kills" },
                    totalAssists: { $sum: "$assists" },
                    avgAssists: { $avg: "$assists" },
                    maxAssists: { $max: "$assists" },
                    avgKDA: { $avg: "$kda" },
                    maxKDA: { $max: "$kda" },
                    mvpCount: { $sum: { $cond: ["$isMVP", 1, 0] } },
                    totalPoints: { $sum: "$points" },
                    avgPoints: { $avg: "$points" },
                    maxPoints: { $max: "$points" },
                },
            },
        ]);
        // }

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
        console.log("[ERROR] " + e);
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

async function getScheduleWeeks(event: APIGatewayProxyEvent) {
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
                $group: {
                    _id: {
                        week: "$week",
                        playoffs: "$playoffs",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    week: "$_id.week",
                    playoffs: "$_id.playoffs",
                },
            },
            {
                $sort: {
                    week: 1,
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
                body: JSON.stringify({ message: "No schedule weeks found" }),
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
                message: `Failed to get schedule weeks list: ${e}`,
            }),
        };
    }
}
