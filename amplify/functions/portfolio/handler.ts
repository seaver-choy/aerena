import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import paginate from "mongoose-paginate-v2";
import {
    userSchema,
    athleteSchema,
    teamSchema,
    athleteProfileSchema,
} from "../../schema";
import { AthleteDocument } from "../../interface";
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

        conn.model("Users", userSchema);
        conn.model("Teams", teamSchema);
        athleteSchema.plugin(paginate);
        conn.model<AthleteDocument, mongoose.PaginateModel<AthleteDocument>>(
            "Athletes",
            athleteSchema,
            "athletes"
        );
        conn.model("AthleteProfile", athleteProfileSchema);
    }
    if (event.path.includes("paginated")) {
        return getPaginatedAthletes(event);
    } else if (event.path.includes("teams")) {
        return getTeamInfo(event);
    } else if (event.path.includes("profile")) {
        return getAthleteProfile(event);
    } else {
        return getAthletePositionFilter(event);
    }
};
async function getTeamInfo(event: APIGatewayProxyEvent) {
    const teamModel = conn!.model("Teams", teamSchema);
    const teamKey = event.queryStringParameters!.teamKey!;
    const league = event.queryStringParameters!.league!;
    const type = event.queryStringParameters!.type!;
    try {
        const res = await teamModel.findOne({
            key: teamKey,
            league: league,
            type: type,
        });

        if (res) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(res),
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "Team not found",
                }),
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
                message: "An unexpected error occured",
                error: e,
            }),
        };
    }
}

async function getAthleteProfile(event: APIGatewayProxyEvent) {
    const profileModel = conn!.model("AthleteProfile");

    const athleteId = parseInt(event.queryStringParameters!.athleteId!);

    try {
        const res = await profileModel.findOne({
            athleteId: athleteId,
        });

        if (res) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ profile: res }),
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "Profile not found",
                }),
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
                message: "An unexpected error occured",
                error: e,
            }),
        };
    }
}

async function getPaginatedAthletes(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model<
        AthleteDocument,
        mongoose.PaginateModel<AthleteDocument>
    >("Athletes", athleteSchema, "athletes");
    const pageOffset = parseInt(event.queryStringParameters!.pageOffset!);
    console.log(pageOffset);
    const limit = parseInt(event.queryStringParameters!.limit!);
    const searchString = event.queryStringParameters!.searchString!;
    const position = event.queryStringParameters!.position!;

    // const search = {
    //     offset: pageOffset,
    //     limit: limit,
    //     query: {
    //         $or: [
    //             {
    //                 player: {
    //                     $regex: searchString,
    //                 },
    //             },
    //             {
    //                 displayName: {
    //                     $regex: searchString,
    //                 },
    //             },
    //         ],
    //     },
    // };
    const options = {
        offset: pageOffset,
        limit: limit,
    };

    // const res = await athleteModel.paginate(
    //     ...new PaginationParameters(search).get()
    // );
    const res = await athleteModel.paginate(
        {
            $or: [
                {
                    player: {
                        $regex: searchString,
                    },
                    position: position,
                },
                {
                    displayName: {
                        $regex: searchString,
                    },
                    position: position,
                },
            ],
        },
        options
    );
    console.log(JSON.stringify(res));
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(res),
    };
    // athleteModel
    //     .paginate(
    //         {
    //             $or: [
    //                 {
    //                     player: {
    //                         $regex: searchString,
    //                     },
    //                 },
    //                 {
    //                     displayName: {
    //                         $regex: searchString,
    //                     },
    //                 },
    //             ],
    //         },
    //         options
    //     )
    //     .then((result) => {
    //         console.log(JSON.stringify(result));
    //         return {
    //             statusCode: 200,
    //             headers: {
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Access-Control-Allow-Credentials": true,
    //             },
    //             body: JSON.stringify(result),
    //         };
    //     });
    // console.log(JSON.stringify(res));
}

async function getAthletePositionFilter(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");

    const position = event.queryStringParameters!.position!;
    const league = event.queryStringParameters!.league!;

    // const res = await athleteModel
    //     .find(
    //         {
    //             position: position,
    //         },
    //         "_id athleteId player displayName team position img"
    //     )
    //     .distinct("athleteId");
    let res;

    if (league == "") {
        res = await athleteModel.aggregate([
            {
                $match: {
                    position: position,
                },
            },
            {
                $group: {
                    _id: "$athleteId",
                    athleteId: {
                        $first: "$athleteId",
                    },
                    player: {
                        $first: "$player",
                    },
                    displayName: {
                        $first: "$displayName",
                    },
                    team: {
                        $first: "$team",
                    },
                    position: {
                        $first: "$position",
                    },
                    img: {
                        $first: "$img",
                    },
                },
            },
            {
                $sort: {
                    team: 1,
                    displayName: 1,
                },
            },
        ]);
    } else {
        res = await athleteModel.aggregate([
            {
                $match: {
                    position: position,
                    league: league,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    athleteId: {
                        $first: "$athleteId",
                    },
                    player: {
                        $first: "$player",
                    },
                    displayName: {
                        $first: "$displayName",
                    },
                    team: {
                        $first: "$team",
                    },
                    position: {
                        $first: "$position",
                    },
                    img: {
                        $first: "$img",
                    },
                },
            },
            {
                $sort: {
                    team: 1,
                    displayName: 1,
                },
            },
        ]);
    }

    if (res.length > 0) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(res),
        };
    } else {
        console.error(
            `[ERROR][ATHLETE] An error occured during getAthletePositionFilter`
        );
        console.error(
            `[ERROR][ATHLETE] No athletes found for position ${position}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: `No athletes found for position ${position}`,
            }),
        };
    }
}

async function getPlayers(event: APIGatewayProxyEvent) {
    const userId = parseInt(event.queryStringParameters!.userId!);
    const position = event.queryStringParameters!.position;
    const userModel = conn!.model("Users");
    try {
        const result = await userModel.aggregate([
            {
                $match: {
                    userID: userId,
                },
            },
            {
                $unwind: "$tokens",
            },
            {
                $match: {
                    "tokens.position": { $regex: position },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    userID: { $first: "$userID" },
                    tokens: { $push: "$tokens" },
                },
            },
        ]);
        if (result.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(result[0]),
            };
        } else throw new Error("More than one user");
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(`${err}`),
        };
    }
}
