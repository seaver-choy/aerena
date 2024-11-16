import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { athleteSchema, userSchema } from '../../schema';

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!conn) {
            conn = await mongoose
                .createConnection(uri, {
                    serverSelectionTimeoutMS: 5000,
                    dbName: "aerena_prod",
                })
                .asPromise();
            conn.model("Athletes", athleteSchema);
            conn.model("Users", userSchema);
        }
        switch (event.httpMethod) {
            case "PUT":
                return await mintPlayers(event);
            default:
                return {
                    statusCode: 405,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify("METHOD does not exist"),
                };
        }
    } catch (e) {
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(`${e}`),
        };
    }
};

async function mintPlayers(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");
    const userModel = conn!.model("Users");
    const allResult = await athleteModel.find({}); //get all players in MPL

    if (!allResult) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("No players found"),
        };
    }

    const payload = JSON.parse(JSON.parse(event.body!));

    console.log(payload.userID);

    //get the initial state of the user, in case an error happens
    const userResult = await userModel.findOne({
        userID: payload.userID,
    });
    const counterModel = conn!.model("Counter");
    const counterResult = await counterModel.findById(
        process.env.TOKEN_COUNTER_ID!
    );
    if (!userResult) {
        console.error(`[ERROR] User ${payload.userID} not found`);
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "No user found" }),
        };
    }

    try {
        const tokenCounter = Number(counterResult.tokenCounter);

        switch (payload.packType) {
            case "starter": {
                // const packInfo = await packModel.findOne({
                //     packId: payload.packId,
                // });

                // if (!packInfo) {
                //     console.error(`[ERROR] Pack ${payload.packId} not found`);
                //     return {
                //         statusCode: 400,
                //         headers: {
                //             "Access-Control-Allow-Origin": "*",
                //             "Access-Control-Allow-Credentials": true,
                //         },
                //         body: JSON.stringify({ message: "No pack found" }),
                //     };
                // }
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify("starter"),
                };
            }
            case "mythic":
            case "epic":
            case "warrior": {
                const minSeasons =
                        payload.packType === "mythic"
                            ? 8
                            : payload.packType === "epic"
                              ? 5
                              : 0,
                    maxSeasons =
                        payload.packType === "mythic"
                            ? 14
                            : payload.packType === "epic"
                              ? 7
                              : 4;
                const result = await athleteModel.find({
                    league: payload.league,
                    type: payload.type,
                    numSeasonsPlayed: {
                        $gte: minSeasons,
                        $lte: maxSeasons,
                    },
                });
                switch (payload.paymentType) {
                    case "points": {
                        const numPacks = payload.numPacks;
                        const boosterPackCost =
                            payload.packType === "mythic"
                                ? 240000
                                : payload.packType === "epic"
                                  ? 120000
                                  : 40000;
                        const totalCost = boosterPackCost * numPacks;
                        if (payload.cost !== totalCost) {
                            console.error(
                                `[MINT][BOOSTER] Payload cost does not match for ${payload.packType} booster`
                            );
                            return {
                                statusCode: 500,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true,
                                },
                                body: JSON.stringify({
                                    message: "Payload cost does not match",
                                }),
                            };
                        }

                        if (totalCost > userResult.points) {
                            console.error(
                                `[MINT][BOOSTER] User ${payload.userID} does not have enough points to buy ${payload.packType} booster. User has ${userResult.points} points while it costs ${totalCost}`
                            );
                            return {
                                statusCode: 500,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true,
                                },
                                body: JSON.stringify({
                                    message: "User does not have enough points",
                                }),
                            };
                        }

                        const tokenArray = [];
                        for (let i = 0; i < numPacks; i++) {
                            const index = Math.floor(
                                Math.random() * result.length
                            );
                            const newToken = {
                                tokenId: tokenCounter + i,
                                player: result[index].player,
                                displayName: result[index].displayName,
                                team: result[index].team,
                                position: result[index].position,
                                img: result[index].img,
                                packId: payload.packId,
                                mintedAt: new Date(),
                            };

                            tokenArray.push(newToken);
                        }

                        const userUpdate = await userModel.findOneAndUpdate(
                            { userID: payload.userID },
                            {
                                $push: { tokens: tokenArray },
                                $inc: {
                                    points: -parseInt(payload.cost),
                                    numBoosterBought: numPacks,
                                    totalBoosterBought: numPacks,
                                },
                                $set: {
                                    pointsUpdatedAt: new Date(),
                                },
                            },
                            { new: true }
                        );

                        const newCounter = {
                            tokenCounter: tokenCounter + numPacks,
                        };

                        await counterModel.findByIdAndUpdate(
                            process.env.TOKEN_COUNTER_ID!,
                            newCounter
                        );

                        console.info(
                            `[MINT][BOOSTER] User ${userResult.userID} has minted the following athletes with ${numPacks} ${payload.packType} booster claims with cost ${payload.cost}:\n` +
                                JSON.stringify(tokenArray)
                        );

                        return {
                            statusCode: 200,
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                            },
                            body: JSON.stringify({
                                tokens: tokenArray,
                                userUpdate: userUpdate,
                            }),
                        };
                    }
                    case "cash": {
                        return {
                            statusCode: 400,
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                            },
                            body: JSON.stringify("cash"),
                        };
                    }
                    default:
                        console.error(
                            `[MINT] Payment type ${payload.paymentType} does not exist. Caller: ${payload.userID}`
                        );
                        return {
                            statusCode: 400,
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                            },
                            body: JSON.stringify({
                                message: "Payment type does not exist",
                            }),
                        };
                }
                break;
            }
            default: {
                console.error(
                    `[MINT] Pack type ${payload.packType} does not exist. Caller: ${payload.userID}`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        message: "Pack type does not exist",
                    }),
                };
            }
        }
    } catch (err) {
        await userModel.findOneAndReplace(
            { userID: payload.userID },
            userResult
        );
        await counterModel.findOneAndReplace(
            { id: process.env.TOKEN_COUNTER_ID! },
            counterResult
        );
        console.error(
            `[MINT] ${payload.userID} has encountered an error \n ${err}`
        );

        console.info(
            `User ${payload.userID} initial state \n ${JSON.stringify(userResult)}`
        );

        console.info(
            `Counter initial state \n ${JSON.stringify(counterResult)}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: err }),
        };
    }
}