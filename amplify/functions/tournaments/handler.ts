import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { tournamentSchema, userSchema, athleteSchema } from "../../schema";
import { TournamentDocument } from "../../interface";
import paginate from "mongoose-paginate-v2";
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

        conn.model("Tournaments", tournamentSchema);
        conn.model("User", userSchema);
        conn.model("Athletes", athleteSchema);

        tournamentSchema.plugin(paginate);
        conn.model<
            TournamentDocument,
            mongoose.PaginateModel<TournamentDocument>
        >("Tournaments", tournamentSchema, "tournaments");
    }

    if (event.path.includes("ongoing")) {
        return getOngoingTournaments(event);
    } else if (event.path.includes("previous")) {
        return getPreviousTournaments(event);
    } else if (event.path.includes("upcoming")) {
        return getUpcomingTournaments(event);
    } else if (event.path.includes("randomize")) {
        return getLuckyPicks(event);
    } else {
        switch (event.httpMethod) {
            case "GET":
                return getTournament(event);
            case "PUT":
                return submitLineupToTournament(event);
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
    }
};

async function getLuckyPicks(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");

    //TODO: add filtering for leagues, etc if needed
    console.log("Start getting lucky picks");
    const positions = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const luckyPicks = [];
    const league = event.queryStringParameters!.league!;
    for (const position of positions) {
        const res = await athleteModel.aggregate([
            {
                $match: {
                    position: position,
                    league: league,
                },
            },
            {
                $sample: {
                    size: 1,
                },
            },
            {
                $project: {
                    _id: 1,
                    player: 1,
                    displayName: 1,
                    team: 1,
                    position: 1,
                    img: 1,
                },
            },
        ]);
        luckyPicks.push(res[0]);
    }
    console.log(luckyPicks);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(luckyPicks),
    };
}

async function getUserLineup(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model<
        TournamentDocument,
        mongoose.PaginateModel<TournamentDocument>
    >("Tournaments", tournamentSchema, "tournaments");

    const tournamentId = parseInt(event.queryStringParameters!.tournamentId!);
    const userId = parseInt(event.queryStringParameters!.userId!);

    const res = await tournamentModel.findOne(
        {
            tournamentId: tournamentId,
        },
        {
            _id: 1,
            usersJoined: {
                $filter: {
                    input: "$usersJoined",
                    cond: {
                        $eq: ["$$this.userID", userId],
                    },
                },
            },
        }
    );

    if (res) {
        console.log(JSON.stringify(res));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(res),
        };
    }
}

async function getTournament(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");

    try {
        if (event.pathParameters && event.pathParameters.proxy !== null) {
            //get game of gameId
            const result = await tournamentModel.findOne({
                tournamentId: parseInt(event.pathParameters.proxy!),
            });
            if (!result) {
                console.error(
                    `[ERROR][TOURNAMENT] Tournament ${event.pathParameters.proxy} not found in database.`
                );
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({ message: "Tournament not found" }),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(result),
            };
        } else {
            //get all games
            const result = await tournamentModel.find({});
            if (!result) {
                console.error(
                    `[ERROR][TOURNAMENTS] No tournaments found in database.`
                );
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({ message: "No tournaments found" }),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(result),
            };
        }
    } catch (e) {
        console.error(
            `[ERROR][TOURNAMENTS] An error occured during getTournaments: \n${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ message: "Failed to get tournament list" }),
        };
    }
}

async function submitLineupToTournament(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");
    const userModel = conn!.model("User");

    if (event.pathParameters && event.pathParameters.proxy !== null) {
        //get initial state of user and tournament

        const payload = JSON.parse(JSON.parse(event.body!));
        const id = parseInt(event.pathParameters.proxy!);
        const userInitial = await userModel.findOne({
            userID: payload.userID,
        });

        if (!userInitial) {
            console.error(
                `[ERROR][TOURNAMENT] User ${payload.userID} not found in database.`
            );
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "User not found" }),
            };
        }

        const tournamentInitial = await tournamentModel.findOne({
            tournamentId: id,
        });

        if (!tournamentInitial) {
            console.error(
                `[ERROR][TOURNAMENT] Tournament ${id} not found in database.`
            );
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "Tournament not found" }),
            };
        }
        //add checking later

        if (
            Date.now() >
            new Date(tournamentInitial.tournamentEndSubmissionDate).getTime()
        ) {
            console.error(
                `[ERROR][TOURNAMENT] Tournament ${id} submission has ended.`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: `Tournament ${id} submission has ended.`,
                    error: "SUBMISSION_ENDED",
                }),
            };
        }
        try {
            const tournament = await tournamentModel.findOneAndUpdate(
                { tournamentId: id },
                { $push: { usersJoined: payload } },
                { new: true }
            );

            const user = await userModel.findOneAndUpdate(
                {
                    userID: payload.userID,
                },
                {
                    $inc: { joinedTournaments: 1 },
                },
                { new: true }
            );
            console.info(
                `[TOURNAMENT] User ${payload.userID} has successfully submitted lineup for tournament ${id} \n ${JSON.stringify(payload)}`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    tournamentUpdate: tournament,
                    userUpdate: user,
                }),
            };
        } catch (err) {
            await userModel.findOneAndReplace(
                { userID: payload.userID },
                userInitial
            );
            await tournamentModel.findOneAndReplace(
                { tournamentId: id },
                tournamentInitial
            );

            console.error(
                `[ERROR][TOURNAMENT] ${payload.userID} has encountered an error while submitting lineup \n ${err}`
            );

            console.info(
                `[TOURNAMENT] User ${payload.userID} initial state \n ${JSON.stringify(userInitial)}`
            );
            console.info(
                `[TOURNAMENT] Tournament initial state \n ${JSON.stringify(tournamentInitial)}`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: `User ${payload.userID} has encountered an error while submitting lineup`,
                    error: err,
                }),
            };
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("PUT request error"),
        };
    }
}

async function getOngoingTournaments(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");

    try {
        const type = event.queryStringParameters?.type;
        const currentDate = new Date();
        const result = await tournamentModel.find({
            type: type,
            $and: [
                { tournamentStartSubmissionDate: { $lte: currentDate } },
                { tournamentEndSubmissionDate: { $gt: currentDate } },
            ],
        });
        if (!result) {
            console.error(
                `[ERROR][TOURNAMENT] Ongoing tournaments not found in database.`
            );
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "No ongoing tournaments found",
                }),
            };
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(result),
        };
    } catch (e) {
        console.error(
            `[ERROR][TOURNAMENTS] An error occured during getOngoingTournaments: \n${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to get ongoing tournaments list",
            }),
        };
    }
}

async function getPreviousTournaments(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");

    try {
        const type = event.queryStringParameters?.type;
        const currentDate = new Date();
        const result = await tournamentModel.find({
            type: type,
            tournamentEndSubmissionDate: { $lt: currentDate },
        });
        if (!result) {
            console.error(
                `[ERROR][TOURNAMENT] Previous tournaments not found in database.`
            );
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "No previous tournaments found",
                }),
            };
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(result),
        };
    } catch (e) {
        console.error(
            `[ERROR][TOURNAMENTS] An error occured during getPreviousTournaments: \n${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to get previous tournament list",
            }),
        };
    }
}

async function getUpcomingTournaments(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");

    try {
        const type = event.queryStringParameters?.type;
        const currentDate = new Date();
        const result = await tournamentModel.find({
            type: type,
            tournamentStartSubmissionDate: { $gt: currentDate },
        });
        if (!result) {
            console.error(
                `[ERROR][TOURNAMENT] Upcoming tournaments not found in database.`
            );
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "No ongoing tournaments found",
                }),
            };
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(result),
        };
    } catch (e) {
        console.error(
            `[ERROR][TOURNAMENTS] An error occured during getOngoingTournaments: \n${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to get ongoing tournaments list",
            }),
        };
    }
}
