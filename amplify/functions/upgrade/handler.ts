import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { userSchema } from "../../schema";
import { Token } from "../../interface";
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
    }

    switch (event.httpMethod) {
        case "PUT":
            return upgradeAthlete(event);
        default:
            return {
                statusCode: 405,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Method not allowed"),
            };
    }
};

async function getPointMultiplier(star: number) {
    switch (star) {
        case 1:
            return 1.05;
        case 2:
            return 1.1;
        case 3:
            return 1.3;
        case 4:
            return 1.5;
        case 5:
            return 2;
    }
}

async function checkTotalNeededAthletes(star: number) {
    console.log(star);
    switch (star) {
        case 0:
            return 5;
        case 1:
            return 20;
        case 2:
            return 80;
        case 3:
            return 200;
        case 4:
            return 700;
        default:
            return -1;
    }
}

async function upgradeAthlete(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("Users");

    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userID;
        const baseToken = payload.baseToken; // the token to be upgraded
        const baseIndex = payload.baseIndex;
        const feedTokens = payload.feedTokens; // the tokens to be sacrificed for the upgrade

        console.info(
            `[UPGRADE] User ${userID} is attempting to upgrade token ${baseToken.tokenId}`
        );
        const user = await userModel.findOne({ userID });
        if (!user) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("User does not exist"),
            };
        }

        if (baseToken.tokenId !== user.tokens[baseIndex].tokenId) {
            console.log(
                `Base Token ${baseToken.tokenId} CheckToken ${user.tokens[baseIndex].tokenId}`
            );
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("TokenId and index does not match"),
            };
        }

        if (baseToken.star === 5) {
            console.log(
                `[UPGRADE] Base token ${baseToken.tokenId} has already reached the maximum upgrade limit`
            );
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Athlete has already reached max level"),
            };
        }

        const resultingAmount =
            baseToken.numAthletesNeededToUpgrade - feedTokens.length;
        try {
            if (resultingAmount > 0) {
                //base athlete does not meet the required amount of athletes to upgrade to the next star

                await userModel.findOneAndUpdate(
                    { userID },
                    {
                        $set: {
                            [`tokens.${baseIndex}.numAthletesNeededToUpgrade`]:
                                resultingAmount,
                        },
                    }
                );
                const update = await userModel.findOneAndUpdate(
                    {
                        userID,
                    },
                    {
                        $pull: {
                            tokens: {
                                tokenId: {
                                    $in: [
                                        ...feedTokens.map(
                                            (token: Token) => token.tokenId
                                        ),
                                    ],
                                },
                            },
                        },
                    },
                    {
                        new: true,
                    }
                );
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        userUpdate: update,
                        message: "Succes",
                        type: "non-upgrade",
                    }),
                };
            } else if (resultingAmount === 0) {
                //base athlete meets the required amount of athletes to upgrade to the next star

                await userModel.findOneAndUpdate(
                    { userID },
                    {
                        $set: {
                            [`tokens.${baseIndex}.statMultiplier`]:
                                await getPointMultiplier(baseToken.star + 1),
                            [`tokens.${baseIndex}.numAthletesNeededToUpgrade`]:
                                await checkTotalNeededAthletes(
                                    baseToken.star + 1
                                ),
                        },
                        $inc: {
                            [`tokens.${baseIndex}.star`]: 1,
                        },
                    }
                );
                const update = await userModel.findOneAndUpdate(
                    {
                        userID,
                    },
                    {
                        $pull: {
                            tokens: {
                                tokenId: {
                                    $in: [
                                        ...feedTokens.map(
                                            (token: Token) => token.tokenId
                                        ),
                                    ],
                                },
                            },
                        },
                    },
                    {
                        new: true,
                    }
                );

                console.info(
                    `[UPGRADE] Athlete upgrade successful for ${userID}'s ${
                        baseToken.player
                    } with tokenId ${baseToken.tokenId}, going from ${baseToken.star} to ${baseToken.star + 1}`
                );
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        userUpdate: update,
                        message: "Success",
                        type: "upgrade",
                    }),
                };
            } else {
                console.error(
                    `[UPGRADE] Invalid upgrade amount: ${resultingAmount}`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: "Invalid upgrade amount",
                        type: "error",
                    }),
                };
            }
        } catch (e) {
            console.error(
                `[UPGRADE] An error has occured during the updating process. User state will be reset to before the transaction. \n ${e}`
            );
            await userModel.findOneAndReplace(
                { userID },
                {
                    user,
                }
            );

            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(`An error has occured ${e}`),
            };
        }

        //checking if the tokens to be used for upgrading matches the amount needed
        //TODO: just use one if statement to check all?
        // switch (nextStar) {
        //     case 1: {
        //         if (feedTokens.length !== 5) {
        //             console.error(
        //                 `[UPGRADE] Not enough tokens to upgrade. Need 5 tokens but got ${feedTokens.length}`
        //             );
        //             return {
        //                 statusCode: 400,
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //                 },
        //                 body: JSON.stringify("Not enough tokens to upgrade"),
        //             };
        //         }
        //         break;
        //     }
        //     case 2: {
        //         if (feedTokens.length !== 20) {
        //             console.error(
        //                 `[UPGRADE] Not enough tokens to upgrade. Need 20 tokens but got ${feedTokens.length}`
        //             );
        //             return {
        //                 statusCode: 400,
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //                 },
        //                 body: JSON.stringify("Not enough tokens to upgrade"),
        //             };
        //         }
        //         break;
        //     }
        //     case 3: {
        //         if (feedTokens.length !== 80) {
        //             console.error(
        //                 `[UPGRADE] Not enough tokens to upgrade. Need 80 tokens but got ${feedTokens.length}`
        //             );
        //             return {
        //                 statusCode: 400,
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //                 },
        //                 body: JSON.stringify("Not enough tokens to upgrade"),
        //             };
        //         }
        //         break;
        //     }
        //     case 4: {
        //         if (feedTokens.length !== 200) {
        //             console.error(
        //                 `[UPGRADE] Not enough tokens to upgrade. Need 200 tokens but got ${feedTokens.length}`
        //             );
        //             return {
        //                 statusCode: 400,
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //                 },
        //                 body: JSON.stringify("Not enough tokens to upgrade"),
        //             };
        //         }
        //         break;
        //     }
        //     case 5: {
        //         if (feedTokens.length !== 700) {
        //             console.error(
        //                 `[UPGRADE] Not enough tokens to upgrade. Need 700 tokens but got ${feedTokens.length}`
        //             );
        //             return {
        //                 statusCode: 400,
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //                     "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //                 },
        //                 body: JSON.stringify("Not enough tokens to upgrade"),
        //             };
        //         }
        //     }
        // }

        // try {
        //     await userModel.findOneAndUpdate(
        //         { userID },
        //         {
        //             $set: {
        //                 [`tokens.${baseIndex}.statMultiplier`]:
        //                     await getPointMultiplier(nextStar),
        //             },
        //             $inc: {
        //                 [`tokens.${baseIndex}.star`]: 1,
        //             },
        //         }
        //     );
        //     const update = await userModel.findOneAndUpdate(
        //         {
        //             userID,
        //         },
        //         {
        //             $pull: {
        //                 tokens: {
        //                     tokenId: {
        //                         $in: [
        //                             ...feedTokens.map(
        //                                 (token: Token) => token.tokenId
        //                             ),
        //                         ],
        //                     },
        //                 },
        //             },
        //         },
        //         {
        //             new: true,
        //         }
        //     );
        //     console.info(
        //         `[UPGRADE] Athlete upgrade successful for ${userID}'s ${
        //             baseToken.player
        //         } with tokenId ${baseToken.tokenId}, going from ${baseToken.star} to ${nextStar}`
        //     );
        //     return {
        //         statusCode: 200,
        //         headers: {
        //             "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //             "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //         },
        //         body: JSON.stringify({
        //             userUpdate: update,
        //             message: "Success",
        //         }),
        //     };
        // } catch (e) {
        //     console.error(
        //         `[UPGRADE] An error has occured during the updating process. User state will be reset to before the transaction. \n ${e}`
        //     );
        //     await userModel.findOneAndReplace(
        //         { userID },
        //         {
        //             user,
        //         }
        //     );

        //     return {
        //         statusCode: 500,
        //         headers: {
        //             "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        //             "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        //         },
        //         body: JSON.stringify(`An error has occured ${e}`),
        //     };
        // }
    } catch (e) {
        console.error(
            `[UPGRADE] An error has occured outside of the updating process \n ${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(`An error has occured ${e}`),
        };
    }
}
