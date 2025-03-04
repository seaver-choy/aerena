import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import {
    userSchema,
    questSchema,
} from "../../schema";
import axios from "axios";

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

type Referral = {
    userID: number;
    username: string;
    _id: string;
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
    } else if (event.path.includes("updatequestfield")) {
        return updateQuestField(event);
    } else if (event.path.includes("login")) {
        return login(event);
    } else if (event.path.includes("templineup")) {
        return updateTempLineup(event);
    } else if (event.path.includes("joinbasic")) {
        return subtractBP(event);
    } else if (event.path.includes("savedreamteam")) {
        return saveDreamTeam(event);
    } else if (event.path.includes("checkreferralcode")) {
        return checkReferralCode(event);
    } else if (event.path.includes("addnewreferral")) {
        return addNewReferral(event);
    } else if (event.path.includes("paypacks")) {
        return payPacks(event);
    } else if (event.path.includes("equipskin")) {
        return equipSkin(event);
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

function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AER';
    for (let i = code.length; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function createUser(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("User");

        const payload = JSON.parse(JSON.parse(event.body!));
        const checkUser = await userModel.findOne({
            userID: payload.userID,
        });
        if (!checkUser) {
            
            let referralCode = "AER";
            let isUnique = false;
            
            while (!isUnique) {
                referralCode = generateCode(8);
                const existingCode = await userModel.findOne({
                    referralCode: referralCode
                });
                if (!existingCode) {
                    isUnique = true;
                }
            }
            
            const questModel = conn!.model("Quest");
            const questResult = await questModel.find({});
            const questIdsWithStatus = questResult.map(quest => ({
                questId: quest.questId,
                isClaimed: false
              }));

            const userData = {
                username: payload.username,
                userID: payload.userID,
                tokens: [],
                friends: [],
                quests: questIdsWithStatus,
                inventory: null,
                seasonalLogins: 1,
                points: 20000, //TODO: temporary hardcoded to give 20k BP to new users for Aerena free tournament
                referralCode: referralCode,
            };
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
        const result = await questModel.find({}).sort({questId: 1});
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
    const value = quest.value;
    if(!quest.isRepeating)
        switch(value){
            case null:
                if(user[quest.taskName] != null) {
                    claim = true;
                } else {
                    claim = false;
                }
                break;
            case true:
                if(user[quest.taskName]) {
                    claim = true;
                } else {
                    claim = false;
                }
                break;
            default:
                if(user[quest.taskName] >= quest.value) {
                    claim = true;
                } else {
                    claim = false;
                }
                break;
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

async function updateQuestField(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userID;
    const fieldName = payload.fieldName;
    try {
        if (userID === "0") throw new Error("Invalid user ID");
        const userResult = await userModel.findOneAndUpdate(
            { userID },
            [
                {
                    $set: {
                        [fieldName]: true,
                    },
                },
            ],
            { new: true }
        );
        console.info(
            `[${fieldName.toUpperCase()}] User ${userID} has updated ${fieldName}`
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
                message: `Failed to update ${fieldName} ` + e,
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

async function updateTempLineup(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");

    /*
        Payload includes the temporary lineup and the userID
    */
    const payload = JSON.parse(event.body!);

    const userID = payload.userID;

    const type = payload.type;

    const index = payload.index;

    if (type === "basic") {
        try {
            const updateResult = await userModel.findOneAndUpdate(
                { userID },
                {
                    $set: {
                        [`basicTempLineup.${index}.lineup`]: payload.tempLineup,
                        [`basicTempLineup.${index}.teague`]: payload.league,
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

async function checkReferralCode(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");
    try {
        const referralCode = event.queryStringParameters?.referralCode;
        const userResult = await userModel.findOne({ referralCode });
        if (!userResult) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: "DNE" }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "EXISTS",
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "DNE",
            }),
        };
    }
}

async function addNewReferral(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("User");

        const payload = JSON.parse(JSON.parse(event.body!));
        const userID = payload.userId;
        const referralCode = payload.referralCode;
        const referrer = await userModel.findOne({referralCode: referralCode});
        if(referrer) {
            const currentDate = new Date();
            const referee = await userModel.findOne({userID: userID});
            const index = referee.friends.findIndex(
                (obj: Referral) => obj.userID === referrer.userID
            );
            let updatedReferee;
            if(index === -1) {
                updatedReferee = await userModel.findOneAndUpdate(
                    {
                        userID: userID,
                    },
                    {
                        $push: {
                            friends: {
                                userID: referrer.userID,
                                username: referrer.username,
                                isReferred: false,
                                addedDate: currentDate,
                            },
                        },
                        $set: {
                            referredBy: {
                                userID: referrer.userID,
                                referralCode: referralCode,
                                referralDate: currentDate,
                            }
                        }
                    },
                    {
                        new: true,
                    }
                );
            }
            else {
                updatedReferee = await userModel.findOneAndUpdate(
                    {
                        userID: userID,
                    },
                    {
                        $set: {
                            referredBy: {
                                userID: referrer.userID,
                                referralCode: referralCode,
                                referralDate: currentDate,
                            }
                        }
                    },
                    {
                        new: true,
                    }
                );
            }
            const index2 = referrer.friends.findIndex(
                (obj: Referral) => obj.userID === updatedReferee.userID
            );
            let updatedReferrer;
            
            if(index2 === -1) {
                updatedReferrer = await userModel.findOneAndUpdate(
                    {
                        referralCode: referralCode,
                    },
                    {
                        $push: {
                            friends: {
                                userID: referee.userID,
                                username: referee.username,
                                isReferred: true,
                                addedDate: currentDate,
                            },
                        },
                        $inc: {
                            referralCount: 1,
                            points: 10000,
                            weeklyReferralCount: 1,
                        },
                        $set: {
                            pointsUpdatedAt: currentDate,
                        },
                    },
                    {
                        new: true,
                    }
                );
            }
            else {
                updatedReferrer = await userModel.findOneAndUpdate(
                    {
                        referralCode: referralCode,
                    },
                    {
                        $inc: {
                            referralCount: 1,
                            points: 10000,
                            weeklyReferralCount: 1,
                        },
                        $set: {
                            [`friends.${index2}.isReferred`]: true,
                            pointsUpdatedAt: currentDate,
                        },
                    },
                    {
                        new: true,
                    }
                );
            }

            console.info(
                `[REFERRAL] User ${updatedReferee.username} is referred by ${updatedReferrer.username}`
            );
            
            const response = await axios.post(process.env.BOT_WEBHOOK_URL!, {
                update_id: 1,
                message: {
                    chat: {
                        id: updatedReferrer.userID,
                    },
                    text: "/notifyreferral " + updatedReferrer.userID + " " + updatedReferee.username,
                },
            });

            if(!response)
                console.error(`[ERROR][REFERRAL] Error in notifying ${updatedReferrer.username} about referring ${updatedReferee.username}`);
            else
                console.info(`[REFERRAL] Success in notifying ${updatedReferrer.username} about referring ${updatedReferee.username}`);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(updatedReferee),
            };
        } else {
            console.error(
                `[ERROR][REFERRAL] User with referral code ${referralCode} does not exists`
            );
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ message: `User with referral code ${referralCode} does not exists` }),
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
                message: "Failed to add referral relation to users: " + e,
            }),
        };
    }
}

async function payPacks(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");

    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userId;
    const packInfo = payload.packInfo;
    const count = payload.count;
    const amount = packInfo.bpCost * count;
    const userResult = await userModel.findOne({
        userID: userID,
    });
    
    if (!userResult) {
        console.error(`[ERROR] User ${userID} not found`);
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
        if (userResult.points < amount) {
            console.error(
                `[ERROR] User ${userID} does not have ${amount} points to purchase pack, only has ${userResult.points}`
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
        
        const userUpdate = await userModel.findOneAndUpdate(
            { userID: userID },
            {
                $set: {
                    pointsUpdatedAt: new Date(),
                },
                $inc: { points: -amount },
            },
            { new: true }
        );

        console.info(`[USER][PACKS] User ${userID} has paid ${amount} BP for ${count} ${payload.packId} pack${count > 1 ? "s" : ""}`);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(userUpdate),
        };
    } catch (err) {
        await userModel.findOneAndReplace(
            { userID: userID },
            userResult
        );
        
        console.error(
            `[ERROR][USER][PACKS] ${userID} has encountered an error \n ${err}`
        );

        console.info(
            `User ${userID} initial state \n ${JSON.stringify(userResult)}`
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

async function equipSkin(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("User");

    const payload = JSON.parse(JSON.parse(event.body!));
    const userID = payload.userId;
    const oldIndex = payload.oldIndex;
    const newIndex = payload.newIndex;

    const userResult = await userModel.findOne({
        userID: userID,
    });
    
    if (!userResult) {
        console.error(`[ERROR] User ${userID} not found`);
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
        const updateQuery: Record<string, boolean> = {};
    
        if (oldIndex >= 0) {
            updateQuery[`skins.${oldIndex}.isEquipped`] = false;
        }
        
        if (newIndex >= 0) {
            updateQuery[`skins.${newIndex}.isEquipped`] = true;
        }

        const userUpdate = await userModel.findOneAndUpdate(
            { userID: userID },
            { $set: updateQuery },
            { new: true }
        );

        console.info(`[USER][SKIN] User ${userID} equipped ${newIndex == -1 ? 'Default Skin' : 'skins[' + newIndex + ']'} for ${userUpdate.skins[oldIndex == -1 ? newIndex : oldIndex].player}`);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(userUpdate),
        };
    } catch (err) {
        await userModel.findOneAndReplace(
            { userID: userID },
            userResult
        );
        
        console.error(
            `[ERROR][USER][SKIN] ${userID} has encountered an error \n ${err}`
        );

        console.info(
            `User ${userID} initial state \n ${JSON.stringify(userResult)}`
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