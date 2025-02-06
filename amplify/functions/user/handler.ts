import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import {
    userSchema,
    levelStatsSchema,
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
        conn.model("LevelStats", levelStatsSchema);
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
    } else if (event.path.includes("tasks")) {
        switch (event.httpMethod) {
            case "GET":
                return getTasks();
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
    } else if (event.path.includes("levelup")) {
        return levelUp(event);
    } else if (event.path.includes("refill")) {
        return refillMana(event);
    } else if (event.path.includes("checkUsername")) {
        return checkUserNameExists(event);
    } else if (event.path.includes("claimTask")) {
        return claimTask(event);
    } else if (event.path.includes("joinTgChannel")) {
        return joinTgChannel(event);
    } else if (event.path.includes("login")) {
        return login(event);
    } else if (event.path.includes("battlepass")) {
        return claimBattlepassReward(event);
    } else if (event.path.includes("templineup")) {
        return updateTempLineup(event);
    }  else if (event.path.includes("joinfree")) {
        return subtractBP(event);
    } else {
        switch (event.httpMethod) {
            case "GET":
                return getUser(event);
            case "POST":
                return createUser(event);
            case "PUT":
                return updateUser(event);
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
        let userResult = await userModel.findOne({ userID });
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

        //to update taskStatus before returning data
        const levelModel = conn!.model("LevelStats");

        const levelModelResult = await levelModel
            .find(
                {},
                {
                    level: 1,
                    tasks: 1,
                }
            )
            .sort({ level: 1 });

        const taskStatus = userResult.taskStatus;

        for (let i = 0; i < taskStatus.length; i++) {
            const tasks = taskStatus[i].tasks;
            for (let j = 0; j < tasks.length; j++) {
                const task = tasks[j];
                if (!task.isDone) {
                    if (
                        userResult[task.taskName] >=
                        levelModelResult[i].tasks[j].value
                    )
                        task.isClaimable = true;
                    else task.isClaimable = false;
                }
            }
        }

        userResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        taskStatus: taskStatus,
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

async function updateUser(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userID;
        const tapCounter = parseInt(payload.tapCounter);
        if (userID === "0") throw new Error("Invalid user ID");
        const updateResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        points: {
                            $cond: [
                                {
                                    $and: [
                                        { $gt: ["$currentMana", 0] },
                                        { $gte: ["$currentMana", tapCounter] },
                                    ],
                                },
                                {
                                    $add: [
                                        "$points",
                                        {
                                            $multiply: [
                                                tapCounter,
                                                "$pointMultiplier",
                                            ],
                                        },
                                    ],
                                },
                                "$points",
                            ],
                        },
                        currentMana: {
                            $cond: [
                                {
                                    $and: [
                                        { $gt: ["$currentMana", 0] },
                                        { $gte: ["$currentMana", tapCounter] },
                                    ],
                                },
                                {
                                    $subtract: ["$currentMana", tapCounter],
                                },
                                "$currentMana",
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

async function createUser(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("User");
        const levelStatsModel = conn!.model("LevelStats");

        const payload = JSON.parse(JSON.parse(event.body!));
        const checkUser = await userModel.findOne({
            userID: payload.userID,
        });
        if (!checkUser) {
            const allLevelStats = await levelStatsModel
                .find()
                .sort({ level: 1 })
                .limit(9); // Get all level stats up to level 9 only
            const taskStatus = allLevelStats.map((stat) => ({
                level: stat.level,
                tasks: stat.tasks.map((task: { taskName: string }) => ({
                    taskName: task.taskName,
                    isClaimable: false,
                    isDone: false,
                })),
            }));

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

            //for bp initialization
            // const bpModel = conn!.model("Battlepass");
            // const bpResult = await bpModel.findOne({ season: 1 });
            // const bpLevels = bpResult.levels;

            const userData = {
                username: payload.username,
                userID: payload.userID,
                level: allLevelStats[0].level,
                pointMultiplier: allLevelStats[0].pointMultiplier,
                maxMana: allLevelStats[0].maxMana,
                currentMana: allLevelStats[0].maxMana,
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
                taskStatus: taskStatus,
                inventory: inventory,
                // battlepass: bpLevels,
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

async function getTasks() {
    const levelModel = conn!.model("LevelStats");
    try {
        const result = await levelModel
            .find(
                {},
                {
                    level: 1,
                    tasks: 1,
                }
            )
            .sort({ level: 1 });

        if (!result) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "No tasks found" }),
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
                message: `Failed to get tasks list: ${e}`,
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

async function levelUp(event: APIGatewayProxyEvent) {
    console.log("inside levelup");
    const userModel = conn!.model("User");
    const levelStatsModel = conn!.model("LevelStats");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    const level = payload.level;

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
    if (user.level !== level) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: "User level and task level are not equal",
            }),
        };
    }
    //checking of task requirements
    const levelUpStats = await levelStatsModel.findOne({
        level: level,
    });
    let levelingUp = false;
    for (const task of levelUpStats.tasks) {
        if (user[task.taskName] >= task.value) {
            levelingUp = true;
        } else {
            levelingUp = false;
            break;
        }
    }
    if (levelingUp) {
        try {
            const nextLevel = await levelStatsModel.findOne({
                level: user.level + 1,
            });
            const result = await userModel.findOneAndUpdate(
                {
                    userID,
                },
                [
                    {
                        $set: {
                            level: nextLevel.level,
                            pointMultiplier: nextLevel.pointMultiplier,
                            maxMana: nextLevel.maxMana,
                            currentMana: {
                                $add: [
                                    "$currentMana",
                                    parseInt(nextLevel.maxMana) -
                                        parseInt(user.maxMana),
                                ],
                            },
                        },
                    },
                ],
                {
                    new: true,
                }
            );
            console.info(
                `[LEVELUP] User ${userID} has leveled up to level ${nextLevel.level}`
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
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: `Error occured during level up of ${userID}`,
                    error: e,
                }),
            };
        }
    } else {
        console.error(
            `[ERROR][LEVELUP] User ${userID} does not meet the requirements to level up to level ${level + 1}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: `${userID} does not meet the requirements to level up`,
            }),
        };
    }
}

async function refillMana(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    try {
        if (userID === "0") throw new Error("Invalid user ID");
        const userResult = await userModel.findOne({ userID });

        if (userResult.dailyRefill && userResult.paidManaClaim) {
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                [
                    {
                        $set: {
                            currentMana: {
                                $add: ["$currentMana", "$maxMana"],
                            },
                            dailyRefill: false,
                            paidManaClaim: false,
                            totalManaRefills: {
                                $add: ["$totalManaRefills", 1],
                            },
                        },
                    },
                ],
                { new: true }
            );

            console.info(`[REFILLMANA] User ${userID} has refilled mana`);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ userUpdate: updateResult }),
            };
        } //might have to change
        else {
            console.info(
                `[REFILLMANA] User ${userID} has already refilled mana`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ userUpdate: userResult }),
            };
        }
    } catch (e) {
        console.error(
            `[ERROR][REFILLMANA] User ${userID} could not refill mana`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "Failed to refill mana: " + e,
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

async function claimTask(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    try {
        const userID = payload.userID;
        const level = payload.level;
        const taskName = payload.taskName;
        if (userID === "0") throw new Error("Invalid user ID");

        // Retrieve the user document
        const user = await userModel.findOne({ userID });

        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" }),
            };
        }

        const levelIndex = user.taskStatus.findIndex(
            (status: { level: number }) => status.level === level
        );
        const taskIndex = user.taskStatus[levelIndex].tasks.findIndex(
            (task: { taskName: string }) => task.taskName === taskName
        );

        const updateResult = await userModel.findOneAndUpdate(
            { userID },
            {
                $set: {
                    [`taskStatus.${levelIndex}.tasks.${taskIndex}.isClaimable`]:
                        true,
                    [`taskStatus.${levelIndex}.tasks.${taskIndex}.isDone`]:
                        true,
                },
            },
            { new: true }
        );
        console.info(`[CLAIMTASK] User ${userID} has claimed task ${taskName}`);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(updateResult),
        };
    } catch (e) {
        console.error(
            `[ERROR][CLAIMTASK] User ${payload.userID} failed to claim task: ${e}`
        );
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
                    //TODO: add pack to user inventory instead of adding to paidBoosterClaimCounter
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
                        points: {
                            $cond: [
                                {
                                    $and: [
                                        { $gt: ["$currentMana", 0] },
                                        { $gte: ["$currentMana", bpCost] },
                                    ],
                                },
                                {
                                    $subtract: [
                                        "$points", bpCost
                                    ],
                                },
                                "$points",
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
