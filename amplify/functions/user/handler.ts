import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import {
    userSchema,
    questSchema,
    battlePassSchema,
    packInfoSchema,
} from "../../schema";

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

type InventoryItem = {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!conn) {
        conn = await mongoose
            .createConnection(uri, {
                serverSelectionTimeoutMS: 5000,
                dbName: "aerena",
            })
            .asPromise();
        conn.model("User", userSchema);
        conn.model("Quest", questSchema);
        conn.model("Battlepass", battlePassSchema);
        conn.model("PackInfo", packInfoSchema);
    }

    if (event.path.includes("quests")) {
        switch (event.httpMethod) {
            case "GET":
                return getQuests();
            case "PUT":
                return updateQuestClaim(event);
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
    } else if (event.path.includes("checkUsername")) {
        return checkUserNameExists(event);
    } else if (event.path.includes("joinTgChannel")) {
        return joinTgChannel(event);
    } else if (event.path.includes("login")) {
        return login(event);
    } else if (event.path.includes("battlepass")) {
        return claimBattlepassReward(event);
    } else if (event.path.includes("templineup")) {
        return updateTempLineup(event);
    } else if (event.path.includes("joinfree")) {
        return subtractBP(event);
    }  else if (event.path.includes("savedreamteam")) {
        return saveDreamTeam(event);
    } else {
        switch (event.httpMethod) {
            case "GET":
                return getUser(event);
            case "POST":
                return createUser(event);
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

async function getUser(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    try {
        const userID = event.queryStringParameters?.user_id;
        const userResult = await userModel.findOne({ userID });
        if (!userResult) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "User ID not found",
                }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(userResult),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to fetch user; " + error,
            }),
        };
    }
}

async function createUser(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("User");

        const payload = JSON.parse(JSON.parse(event.body!));
        const checkUser = await userModel.findOne({
            userID: payload.userID,
        });
        if (!checkUser) {
            //for getting packInfo for inventory
            const packInfoModel = conn!.model("PackInfo");
            const packinfoResult = await packInfoModel.aggregate([
                {
                    $addFields: {
                        packTypeOrder: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $eq: ["$packType", "starter"],
                                        },
                                        then: 1,
                                    },
                                    {
                                        case: {
                                            $eq: ["$packType", "mythic"],
                                        },
                                        then: 2,
                                    },
                                    {
                                        case: {
                                            $eq: ["$packType", "epic"],
                                        },
                                        then: 3,
                                    },
                                    {
                                        case: {
                                            $eq: ["$packType", "warrior"],
                                        },
                                        then: 4,
                                    },
                                ],
                                default: 5,
                            },
                        },
                    },
                },
                { $sort: { packTypeOrder: 1 } },
                { $project: { packTypeOrder: 0 } },
            ]);

            const inventory: InventoryItem[] = [];
            packinfoResult.forEach((packInfo) => {
                const packType = packInfo.packType;

                inventory.push({
                    key: packInfo.packId,
                    type: packType === "starter" ? "starter-pack" : packType,
                    ...(packType === "starter"
                        ? { isClaimed: false }
                        : { stock: 0 }),
                });
            });
            const userData = {
                username: payload.username,
                userID: payload.userID,
                tokens: [],
                friends: [],
                quests: [
                    {
                        questId: 1,
                        isClaimed: false,
                    },
                    {
                        questId: 2,
                        isClaimed: false,
                    },
                    {
                        questId: 3,
                        isClaimed: false,
                    },
                ],
                inventory: inventory,
                seasonalLogins: 1,
                points: 20000, //TODO: temporary hardcoded to give 20k BP to new users for Aerena free tournament
            };

            if (payload.isReferred && payload.referredBy !== payload.username) {
                const referralCheck = await userModel.findOne({
                    $and: [
                        { username: payload.referredBy },
                        { "friends.userID": payload.userID },
                    ],
                });

                if (referralCheck) {
                    console.error(
                        `[ERROR][CREATEUSER] User ${payload.userID} is already referred by ${payload.referredBy}`
                    );

                    //check if new user used a different username

                    type Referral = {
                        userID: number;
                        username: string;
                        _id: string;
                    };
                    const index = referralCheck.friends.findIndex(
                        (obj: Referral) => obj.userID === payload.userID
                    );

                    if (
                        referralCheck.friends[index].username !==
                        payload.username
                    ) {
                        console.info(
                            `[CREATEUSER] Updating referral username for ${payload.userID} in ${payload.referredBy}'s referral list`
                        );

                        await userModel.findOneAndUpdate(
                            { username: payload.referredBy },
                            {
                                $set: {
                                    [`friends.${index}.username`]:
                                        payload.username,
                                    referralDate: new Date(),
                                },
                            }
                        );
                    }
                } else {
                    await userModel.findOneAndUpdate(
                        {
                            username: payload.referredBy,
                        },
                        {
                            $push: {
                                friends: {
                                    userID: payload.userID,
                                    username: payload.username,
                                    isReferred: true,
                                    referralDate: new Date(),
                                },
                            },
                            $inc: {
                                referralCount: 1,
                                points: 5000,
                                weeklyReferralCount: 1,
                            },
                            $set: {
                                pointsUpdatedAt: new Date(),
                            },
                        }
                    );
                }

                console.info(
                    `[CREATEUSER] User ${payload.username} is referred by ${payload.referredBy}`
                );
            }
            const newUser = new userModel(userData);
            await newUser.save();
            console.info(
                `[CREATEUSER] A new user ${userData.userID} has been created \n ${JSON.stringify(userData)}`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(newUser),
            };
        } else {
            //user exists
            console.error(
                `[ERROR][CREATEUSER] User ${payload.userID} already exists`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "User already exists" }),
            };
        }
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to create new user: " + e,
            }),
        };
    }
}

async function getQuests() {
    const questModel = conn!.model("Quest");
    try {
        const result = await questModel.find({});
        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No quests" }),
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
                message: "Failed to get quest list",
                error: e,
            }),
        };
    }
}

async function updateQuestClaim(event: APIGatewayProxyEvent) {
    const questModel = conn!.model("Quest");
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    const questId = payload.questId;
    const user = await userModel.findOne({ userID });

    if (!user) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "User not found " }),
        };
    }
    //checking of quest requirements

    if (user.quests[questId - 1].isClaimed) {
        console.error(
            `[ERROR][QUEST] User ${userID} has already claimed quest ${questId}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: "User has already claimed this quest",
            }),
        };
    }

    const quest = await questModel.findOne({ questId });

    if (!quest) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "No quests found" }),
        };
    }

    let claim = false;
    for (const task of quest.tasks) {
        console.log(`${task.taskName}`);
        console.log(`${user[task.taskName]} vs ${task.value}`);
        if (user[task.taskName] >= task.value) {
            claim = true;
        } else {
            claim = false;
            break;
        }
    }

    if (claim) {
        try {
            const result = await userModel.findOneAndUpdate(
                {
                    userID,
                    "quests.questId": questId,
                },
                {
                    $set: {
                        "quests.$.isClaimed": true,
                        pointsUpdatedAt: new Date(),
                    },
                    $inc: {
                        points: quest.reward,
                    },
                },
                {
                    new: true,
                }
            );

            console.info(
                `[QUEST] User ${userID} has successfully claimed quest ${questId}`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(result),
            };
        } catch (e) {
            console.error(`[ERROR][QUEST] ${e}`);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: `Error occured quest claiming for user ${userID} ${e}`,
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
                message: `${userID} does not meet the requirements to claim this quest`,
            }),
        };
    }
}

async function checkUserNameExists(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    try {
        const username = event.queryStringParameters?.username;
        const findResult = await userModel.findOne({ username: username });
        if (!findResult) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "UNIQUE",
                }),
            };
        }
        console.error(
            `[CHECKUSERNAME] Duplicate! ${username} already exists in the system.`
        );
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "DUPLICATE",
            }),
        };
    } catch (error) {
        console.error(`[CHECKUSERNAME] An error has occured.`);
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to check username: " + error,
            }),
        };
    }
}

async function joinTgChannel(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userID;
        if (userID === "0") throw new Error("Invalid user ID");
        const userResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        joinedTgChannel: true,
                    },
                },
            ],
            { new: true }
        );
        console.info(
            `[JOINCHANNEL] User ${userID} has joined the Telegram channel`
        );
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(userResult),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to join tg channel " + e,
            }),
        };
    }
}

async function login(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    if (userID === "0") throw new Error("Invalid user ID");
    const userResult = await userModel.findOne({ userID });
    if (!userResult) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ message: "User ID not found" }),
        };
    }

    try {
        if (userResult.isNewDay) {
            // If it's a new day, set isNewDay to false and increment seasonalLogins
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        lastLoggedInAt: new Date(),
                        isNewDay: false,
                    },
                    $inc: { seasonalLogins: 1 },
                },
                { new: true }
            );

            if (userResult.seasonalLogins == 0) {
                console.info(
                    `[LOGIN] User ${userResult.username} has logged in for the first time since reset`
                );
            } else {
                console.info(
                    `[LOGIN] User ${userResult.username} has logged in for a new day`
                );
            }

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(updateResult),
            };
        } else {
            // Not a new day, just update lastLoggedInAt
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        lastLoggedInAt: new Date(),
                    },
                },
                { new: true }
            );

            console.info(`[LOGIN] User ${userResult.username} has logged in`);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(updateResult),
            };
        }
    } catch (e) {
        //reset to initial state before the transaction occured
        await userModel.findOneAndReplace(
            { userID: payload.userID },
            userResult
        );

        console.error(
            `[LOGIN] ${payload.userID} has encountered an error during the login process \n ${e}`
        );
        console.error(
            `[LOGIN] ${payload.userID} state has been reset to before the login occured`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ message: "Failed to login " + e }),
        };
    }
}

async function claimBattlepassReward(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    const userResult = await userModel.findOne({ userID });
    try {
        const bpLevel = parseInt(payload.bpLevel);

        if (!userResult) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "User ID not found" }),
            };
        }
        //TODO: rename seasonalLogins to battlepass level?
        if (userResult.seasonalLogins < bpLevel) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    message: "The user's battlepass level is too low",
                }),
            };
        }

        if (payload.isPremium) {
            if (!userResult.premiumMember) {
                console.error(
                    `[BATTLEPASS] User ${userID} is not a premium member`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: "The user is not a premium member",
                    }),
                };
            }
            if (userResult.battlepass[bpLevel - 1].premClaimed) {
                console.error(
                    `[BATTLEPASS] User ${userID} has already claimed the premium reward for level ${bpLevel}`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: `The user has already claimed the premium reward for level ${bpLevel}`,
                    }),
                };
            }
            if (
                typeof userResult.battlepass[bpLevel - 1].premReward ===
                "number"
            ) {
                const updateResult = await userModel.findOneAndUpdate(
                    { userID },
                    {
                        $set: {
                            [`battlepass.${bpLevel - 1}.premClaimed`]: true,
                        },
                        $inc: {
                            points: parseInt(
                                userResult.battlepass[bpLevel - 1].premReward
                            ),
                        },
                    },
                    { new: true }
                );
                console.info(
                    `[BATTLEPASS] User ${userID} has claimed the premium reward for level ${bpLevel}`
                );
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        userUpdate: updateResult,
                        claim: "prem",
                        type: "points",
                    }),
                };
            } else {
                const packModel = conn!.model("PackInfo");
                const pack = await packModel.findOne({
                    packId: userResult.battlepass[bpLevel - 1].premReward,
                });

                if (!pack) {
                    console.error(
                        `[BATTLEPASS] Pack ${userResult.battlepass[bpLevel - 1].premReward} not found`
                    );
                    return {
                        statusCode: 400,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            message: `Pack ${userResult.battlepass[bpLevel - 1].premReward} not found`,
                        }),
                    };
                }
                const inventoryIndex = userResult.inventory.findIndex(
                    (item: InventoryItem) =>
                        item.key ===
                        userResult.battlepass[bpLevel - 1].premReward
                );

                if (inventoryIndex === -1) {
                    const newItem = {
                        key: userResult.battlepass[bpLevel - 1].premReward,
                        type: "pack", //TODO: don't hardcode
                        stock: 1,
                    };
                    const updateResult = await userModel.findOneAndUpdate(
                        { userID },
                        {
                            $set: {
                                [`battlepass.${bpLevel - 1}.premClaimed`]: true,
                            },
                            $push: {
                                inventory: newItem,
                            },
                        }
                    );
                    console.info(
                        `[BATTLEPASS] User ${userID} has created a new inventory listing for pack ${userResult.battlepass[bpLevel - 1].premReward}`
                    );
                    console.info(
                        `[BATTLEPASS] User ${userID} has claimed the premium reward for level ${bpLevel}`
                    );
                    return {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            userUpdate: updateResult,
                            claim: "prem",
                            type: "pack",
                        }),
                    };
                } else {
                    const updateResult = await userModel.findOneAndUpdate(
                        { userID },
                        {
                            $set: {
                                [`battlepass.${bpLevel - 1}.premClaimed`]: true,
                            },
                            $inc: {
                                [`inventory.${inventoryIndex}.stock`]: 1,
                            },
                        },
                        { new: true }
                    );
                    console.info(
                        `[BATTLEPASS] User ${userID} has claimed the premium reward for level ${bpLevel}`
                    );
                    return {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            userUpdate: updateResult,
                            claim: "prem",
                            type: "pack",
                        }),
                    };
                }
            }
        } else {
            if (userResult.battlepass[bpLevel - 1].basicClaimed) {
                console.error(
                    `[BATTLEPASS] User ${userID} has already claimed the basic reward for level ${bpLevel}`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: `The user has already claimed the basic reward for level ${bpLevel}`,
                    }),
                };
            }
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        [`battlepass.${bpLevel - 1}.basicClaimed`]: true,
                    },
                    $inc: {
                        points: parseInt(
                            userResult.battlepass[bpLevel - 1].basicReward
                        ),
                    },
                },
                { new: true }
            );
            console.info(
                `[BATTLEPASS] User ${userID} has claimed the basic reward for level ${bpLevel}`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    userUpdate: updateResult,
                    claim: "basic",
                    type: "points",
                }),
            };
        }
    } catch (e) {
        await userModel.findOneAndReplace({ userID: userID }, userResult);
        console.error(
            `[BATTLEPASS] ${userID} has encountered an error while claiming a battlepass reward. User state will be reset back to before the transaction happened.`
        );
        console.error(
            `[BATTLEPASS] ${userID} was trying to claim ${payload.isPremium ? "premium" : "basic"} reward for level ${payload.bpLevel}.`
        );
        console.error(
            `[BATTLEPASS] ${userID} encountered the following error: ${e}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ message: "Failed to claim reward " + e }),
        };
    }
    // check battlepass level req
    // check if user is a premium member
    //if yes, check if basic reward is already claimed (for the event that the user bought the premium after)
    // if yes for ^, claim only premium reward for that tier. if not, claim both
    // if not, just claim basic reward
}

async function updateTempLineup(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");

    /*
        Payload includes the temporary lineup and the userID
    */
    const payload = JSON.parse(event.body!);

    const userID = payload.userID;

    const type = payload.type;

    const index = payload.index;

    if (type === "free") {
        try {
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        [`freeTempLineup.${index}.lineup`]: payload.tempLineup,
                        [`freeTempLineup.${index}.teague`]: payload.league,
                    },
                },
                {
                    new: true,
                }
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(updateResult),
            };
        } catch (e) {
            console.error(
                `[UPDATE TEMP LINEUP] Failed to update lineup for ${userID}. \n Error: ${e}`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "Failed to update lineup",
                }),
            };
        }
    } else if (type === "prem") {
        try {
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        [`premTempLineup.${index}.lineup`]:
                            payload.premTempLineup,
                        [`premTempLineup.${index}.league`]: payload.league,
                    },
                },
                {
                    new: true,
                }
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(updateResult),
            };
        } catch (e) {
            console.error(
                `[UPDATE TEMP LINEUP] Failed to update lineup for ${userID}. \n Error: ${e}`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "Failed to update lineup",
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
                message: "Wrong type",
            }),
        };
    }
}

async function subtractBP(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userID;
        const bpCost = parseInt(payload.bpCost);
        if (userID === "0") throw new Error("Invalid user ID");
        const updateResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        points:
                                {
                                    $subtract: [
                                        "$points", bpCost
                                    ],
                                },
                        pointsUpdatedAt: new Date(),
                    },
                },
            ],
            { new: true }
        );
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(updateResult),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to update points: " + e,
            }),
        };
    }
}

async function saveDreamTeam(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userId;
        if (userID === "0") throw new Error("Invalid user Id");
        const dreamTeam = payload.dreamTeam;
        console.info(dreamTeam);
        const userResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        dreamTeam: dreamTeam,
                    },
                },
            ],
            { new: true }
        );
        console.info(
            `[SAVEDREAMTEAM] User ${userID} has saved Dream Team`
        );
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(userResult),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to save dream team " + e,
            }),
        };
    }
}
