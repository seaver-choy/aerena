import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";

import {
    matchStatsSchema,
    scheduleSchema,
    teamProfileSchema,
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

        conn.model("Schedules", scheduleSchema);
        conn.model("MatchStats", matchStatsSchema);
        conn.model("TeamProfiles", teamProfileSchema);
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
    } else if (event.path.includes("countries")) {
        return getCountriesWithSchedule();
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
        const currentDate = new Date().toISOString().split("T")[0];

        const weekResult = await scheduleModel.findOne(
            {
                league: league,
                matchDate: {
                    $gte: currentDate,
                },
            },
            null,
            {
                sort: { matchDate: 1 },
            }
        );

        if (!weekResult) {
            throw new Error("No upcoming matches found");
        }

        const week = weekResult.week;

        const result = await scheduleModel.aggregate([
            {
                $match: {
                    league: league,
                    // matchDate: { $gt: currentDate },
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
        const statType = event.queryStringParameters?.stat_type as string;

        let totalResult = [];
        let averageResult = [];
        let maxResult = [];
        let totalGroupStage;
        if (statType == "mvp")
            totalGroupStage = {
                $group: {
                    _id: "$athleteId",
                    player: {
                        $first: league!.length == 2 ? "$ign" : "$player",
                    },
                    team: { $first: "$team" },
                    league: {
                        $first:
                            league!.length == 2 ? "$tournamentCode" : "$league",
                    },
                    teamInfo: { $first: "$teamInfo" },
                    mvpCount: { $sum: { $cond: ["$isMVP", 1, 0] } },
                },
            };
        else
            totalGroupStage = {
                $group: {
                    _id: "$athleteId",
                    player: {
                        $first: league!.length == 2 ? "$ign" : "$player",
                    },
                    team: { $first: "$team" },
                    league: {
                        $first:
                            league!.length == 2 ? "$tournamentCode" : "$league",
                    },
                    teamInfo: { $first: "$teamInfo" },
                    [statType]: { $sum: `$${statType}` },
                },
            };
        const averageGroupStage = {
            $group: {
                _id: "$athleteId",
                player: { $first: league!.length == 2 ? "$ign" : "$player" },
                team: { $first: "$team" },
                league: {
                    $first: league!.length == 2 ? "$tournamentCode" : "$league",
                },
                tournamentCode: { $first: "$tournamentCode" },
                teamInfo: { $first: "$teamInfo" },
                [statType]: { $avg: `$${statType}` },
            },
        };
        const maxGroupStage = {
            $project: {
                _id: "$athleteId",
                player: "$player",
                team: "$team",
                league: "$league",
                teamInfo: "$teamInfo",
                [statType]: `$${statType}`,
            },
        };

        if (league!.length == 2) {
            if (statType != "kda")
                totalResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: {
                                $regex: `^${league}`,
                            },
                            playoffs: false,
                        },
                    },
                    {
                        $lookup: {
                            from: "athleteprofiles",
                            let: { athleteId: "$athleteId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$athleteId", "$$athleteId"],
                                        },
                                    },
                                },
                                {
                                    $limit: 1,
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        latestTournamentCode:
                                            "$latestTournament.code",
                                        latestIGN: "$ign",
                                    },
                                },
                            ],
                            as: "athleteProfileData",
                        },
                    },
                    {
                        $addFields: {
                            tournamentCode: {
                                $arrayElemAt: [
                                    "$athleteProfileData.latestTournamentCode",
                                    0,
                                ],
                            },
                            ign: {
                                $arrayElemAt: [
                                    "$athleteProfileData.latestIGN",
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "teams",
                            let: {
                                athleteId: "$athleteId",
                                tournamentCode: "$tournamentCode",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$league",
                                                        "$$tournamentCode",
                                                    ],
                                                },
                                                {
                                                    $in: [
                                                        "$$athleteId",
                                                        "$players.athleteId",
                                                    ],
                                                },
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
                    totalGroupStage,
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (statType != "mvp")
                averageResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: {
                                $regex: `^${league}`,
                            },
                            playoffs: false,
                        },
                    },
                    {
                        $lookup: {
                            from: "athleteprofiles",
                            let: { athleteId: "$athleteId" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$athleteId", "$$athleteId"],
                                        },
                                    },
                                },
                                {
                                    $limit: 1,
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        latestTournamentCode:
                                            "$latestTournament.code",
                                        latestIGN: "$ign",
                                    },
                                },
                            ],
                            as: "athleteProfileData",
                        },
                    },
                    {
                        $addFields: {
                            tournamentCode: {
                                $arrayElemAt: [
                                    "$athleteProfileData.latestTournamentCode",
                                    0,
                                ],
                            },
                            ign: {
                                $arrayElemAt: [
                                    "$athleteProfileData.latestIGN",
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "teams",
                            let: {
                                athleteId: "$athleteId",
                                tournamentCode: "$tournamentCode",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$league",
                                                        "$$tournamentCode",
                                                    ],
                                                },
                                                {
                                                    $in: [
                                                        "$$athleteId",
                                                        "$players.athleteId",
                                                    ],
                                                },
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
                    averageGroupStage,
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (statType != "mvp")
                maxResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: {
                                $regex: `^${league}`,
                            },
                            playoffs: false,
                        },
                    },
                    {
                        $lookup: {
                            from: "teams",
                            let: {
                                athleteId: "$athleteId",
                                league: "$league",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: [
                                                        "$league",
                                                        "$$league",
                                                    ],
                                                },
                                                {
                                                    $in: [
                                                        "$$athleteId",
                                                        "$players.athleteId",
                                                    ],
                                                },
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
                    maxGroupStage,
                    {
                        $group: {
                            _id: {
                                player: "$player",
                                team: "$team",
                                league: "$league",
                                statTypeValue: `$${statType}`,
                            },
                            doc: { $first: "$$ROOT" },
                        },
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$doc",
                        },
                    },
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (!totalResult && !averageResult && !maxResult) {
                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({ message: "No teams found" }),
                };
            }

            console.log("Returning ranking stats result for ALL leagues");

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    total: totalResult,
                    average: averageResult,
                    max: maxResult,
                }),
            };
        } else {
            if (statType != "kda")
                totalResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: league,
                            week:
                                week === "0" || week === ""
                                    ? { $exists: true }
                                    : parseInt(week!),
                            playoffs:
                                week === "0" || week === ""
                                    ? false
                                    : { $exists: true },
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
                    totalGroupStage,
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (statType != "mvp")
                averageResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: league,
                            week:
                                week === "0" || week === ""
                                    ? { $exists: true }
                                    : parseInt(week!),
                            playoffs:
                                week === "0" || week === ""
                                    ? false
                                    : { $exists: true },
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
                    averageGroupStage,
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (statType != "mvp")
                maxResult = await statsModel.aggregate([
                    {
                        $match: {
                            league: league,
                            week:
                                week === "0" || week === ""
                                    ? { $exists: true }
                                    : parseInt(week!),
                            playoffs:
                                week === "0" || week === ""
                                    ? false
                                    : { $exists: true },
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
                    maxGroupStage,
                    {
                        $group: {
                            _id: {
                                player: "$player",
                                team: "$team",
                                league: "$league",
                                statTypeValue: `$${statType}`,
                            },
                            doc: { $first: "$$ROOT" },
                        },
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$doc",
                        },
                    },
                    {
                        $sort: {
                            [statType === "mvp" ? "mvpCount" : statType]: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                ]);

            if (!totalResult && !averageResult && !maxResult) {
                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({ message: "No teams found" }),
                };
            }
            console.log("Returning ranking stats result for " + league);

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    total: totalResult,
                    average: averageResult,
                    max: maxResult,
                }),
            };
        }
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
async function getCountriesWithSchedule() {
    const teamProfilesModel = conn!.model("TeamProfiles");
    const schedulesModel = conn!.model("Schedules");

    try {
        const scheduleResult = await schedulesModel.aggregate([
            {
                $match: {
                    league: { $not: { $regex: /^(SPS|M\d+|MSC)/i } },
                },
            },
            {
                $project: {
                    countryCode: { $substr: ["$league", 0, 2] },
                },
            },
            {
                $group: {
                    _id: "$countryCode",
                },
            },
        ]);

        const validCountryCodes = scheduleResult.map((item) => item._id);

        const result = await teamProfilesModel.aggregate([
            {
                $addFields: {
                    countryCode: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$country", "China"] },
                                    then: "CN",
                                },
                                {
                                    case: { $eq: ["$country", "Cambodia"] },
                                    then: "KH",
                                },
                                {
                                    case: { $eq: ["$country", "Indonesia"] },
                                    then: "ID",
                                },
                                {
                                    case: { $eq: ["$country", "Malaysia"] },
                                    then: "MY",
                                },
                                {
                                    case: { $eq: ["$country", "Myanmar"] },
                                    then: "MM",
                                },
                                {
                                    case: { $eq: ["$country", "Philippines"] },
                                    then: "PH",
                                },
                                {
                                    case: { $eq: ["$country", "Singapore"] },
                                    then: "SG",
                                },
                            ],
                            default: "",
                        },
                    },
                },
            },
            {
                $match: {
                    countryCode: { $in: validCountryCodes },
                },
            },
            {
                $sort: { country: 1 },
            },
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
        const countries = [...new Set(result.map((item) => item.country))];
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
