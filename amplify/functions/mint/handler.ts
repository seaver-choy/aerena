import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { athleteSchema, counterSchema, userSchema } from "../../schema";
import { InventoryItem } from "../../interface";
let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

interface Token {
    tokenId: number;
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    packId: string;
}

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
            conn.model("Users", userSchema);
            conn.model("Counter", counterSchema);
        }
        switch (event.httpMethod) {
            case "GET":
                return await getAthletes();
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
            body: JSON.stringify({
                message: "An error occured during the minting process",
                error: e,
            }),
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

                const inventoryIndex = userResult.inventory.findIndex(
                    (item: InventoryItem) => item.key === payload.packId
                );

                if (inventoryIndex === -1) {
                    /*
                        For now, handle it as an error condition. May want to change this later to add an 
                        unexisting starter-pack to the user inventory instead so we don't have to 
                        manually add new starter-packs to inventories.
                    */

                    console.error(
                        `[ERROR] User ${payload.userID} does not have starter pack ${payload.packId}`
                    );
                    return {
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        body: JSON.stringify({
                            message: `User ${payload.userID} does not have starter pack ${payload.packId}`,
                        }),
                    };
                } else {
                    //the pack exists within the user's inventory

                    if (userResult.inventory[inventoryIndex].isClaimed) {
                        console.error(
                            `[ERROR] User ${payload.userID} has already claimed starter pack ${payload.packId}`
                        );
                        return {
                            statusCode: 500,
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                            },
                            body: JSON.stringify({
                                message: `User ${payload.userID} has already claimed starter pack ${payload.packId}`,
                            }),
                        };
                    } else {
                        //additional checking if user has enough points to purchase

                        if (userResult.points < payload.cost) {
                            console.error(
                                `[ERROR] User ${payload.userID} does not have enough points to purchase starter pack`
                            );
                            return {
                                statusCode: 500,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true,
                                },
                                body: JSON.stringify({
                                    message:
                                        "User does not have enough points to purchase this pack",
                                }),
                            };
                        }
                        const positions = [
                            "Roam",
                            "Mid",
                            "Jungle",
                            "EXP",
                            "Gold",
                        ];

                        const newTokens: Token[] = [];
                        let counter = 0;
                        for (const position of positions) {
                            const athlete = await athleteModel.find({
                                position: position,
                                league: payload.league,
                                type: payload.type,
                                numSeasonsPlayed: { $lte: 7 }, //Epic is at most 7 seasons
                            });

                            let isExist = false;
                            let index: number;
                            do {
                                index = Math.floor(
                                    Math.random() * athlete.length
                                );

                                isExist = newTokens.some(
                                    (element) =>
                                        element.displayName ===
                                        athlete[index].displayName
                                );
                            } while (isExist);

                            const newToken = {
                                tokenId: tokenCounter + counter,
                                player: athlete[index].player,
                                displayName: athlete[index].displayName,
                                team: athlete[index].team,
                                position: athlete[index].position,
                                img: athlete[index].img,
                                packId: payload.packId,
                                mintedAt: new Date(),
                            };
                            newTokens.push(newToken);
                            counter++;
                        }

                        const userUpdate = await userModel.findOneAndUpdate(
                            { userID: payload.userID },
                            {
                                $set: {
                                    hasBoughtStarter: true, //this is for the level up task
                                    [`inventory.${inventoryIndex}.isClaimed`]:
                                        true,
                                    pointsUpdatedAt: new Date(),
                                },
                                $push: { tokens: newTokens },
                                $inc: { points: -parseInt(payload.cost) },
                            },
                            { new: true }
                        );

                        const newCounter = {
                            tokenCounter: tokenCounter + 5,
                        };

                        await counterModel.findByIdAndUpdate(
                            process.env.TOKEN_COUNTER_ID!,
                            newCounter
                        );

                        console.info(
                            `[MINT][STARTER] User ${userResult.userID} has minted the following athletes with starter pack ${payload.packId} with cost ${payload.cost}: \n` +
                                JSON.stringify(newTokens)
                        );
                        return {
                            statusCode: 200,
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": true,
                            },
                            body: JSON.stringify({
                                tokens: newTokens,
                                userUpdate: userUpdate,
                            }),
                        };
                    }
                }
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
                        const inventoryIndex = userResult.inventory.findIndex(
                            (item: InventoryItem) => item.key === payload.packId
                        );
                        if (inventoryIndex === -1) {
                            /*
                                For now, handle it as an error condition. May want to change this later to add an 
                                unexisting starter-pack to the user inventory instead so we don't have to 
                                manually add new starter-packs to inventories.
                            */
                            console.error(
                                `[MINT][BOOSTER] User ${payload.userID} does not have ${payload.packId} in their inventory`
                            );
                            return {
                                statusCode: 500,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true,
                                },
                                body: JSON.stringify({
                                    message: `User ${payload.userID} does not have ${payload.packId} in their inventory`,
                                }),
                            };
                        } else {
                            const numPacks =
                                userResult.inventory[inventoryIndex].stock;
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
                                        [`inventory.${inventoryIndex}.stock`]:
                                            -numPacks,
                                        totalBoosterBought: numPacks,
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
                                `[MINT][BOOSTER] User ${userResult.userID} has minted the following athletes with ${numPacks} paid ${payload.packType} booster claims:\n` +
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
                    }
                    case "stars": {
                        const inventoryIndex = userResult.inventory.findIndex(
                            (item: InventoryItem) => item.key === payload.packId
                        );
                        if (inventoryIndex === -1) {
                            /*
                                For now, handle it as an error condition. May want to change this later to add an 
                                unexisting starter-pack to the user inventory instead so we don't have to 
                                manually add new starter-packs to inventories.
                            */
                            console.error(
                                `[MINT][BOOSTER] User ${payload.userID} does not have ${payload.packId} in their inventory`
                            );
                            return {
                                statusCode: 500,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true,
                                },
                                body: JSON.stringify({
                                    message: `User ${payload.userID} does not have ${payload.packId} in their inventory`,
                                }),
                            };
                        } else {
                            const numPacks = payload.numPacks;
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
                                        totalBoosterBought: numPacks,
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
                                `[MINT][BOOSTER] User ${userResult.userID} has minted the following athletes with ${numPacks} paid ${payload.packType} booster claims:\n` +
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

//for getting mintable dream athletes (not user's dream athletes)
async function getAthletes() {
    const athleteModel = conn!.model("Athletes");

    const result = await athleteModel.find({});
    if (!result) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "No dream team athletes available",
            }),
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
}
