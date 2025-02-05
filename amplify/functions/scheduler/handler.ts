import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { leaderboardSchema, userSchema } from "../../schema";
import { InventoryItem } from "../../interface";
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

        const scheduleSchema = new mongoose.Schema({
            id: String,
            lastRechargeDate: Date,
        });
        conn.model("User", userSchema);
        conn.model("AdminSettings", scheduleSchema);
        conn.model("Leaderboard", leaderboardSchema);
    }
    return await rechargeSchedule();
};

async function rechargeSchedule() {
    try {
        const userModel = conn!.model("User");
        const adminSettingsModel = conn!.model("AdminSettings");

        const lastExecution = await adminSettingsModel.findOne({
            id: "dailyRecharge",
        });

        const dateToCheck = new Date();
        dateToCheck.setHours(dateToCheck.getHours() + 8);
        const currentDate = dateToCheck.toISOString().split("T")[0];
        //check if executed today
        if (lastExecution) {
            const storedDate = new Date(lastExecution.lastRechargeDate)
                .toISOString()
                .split("T")[0];
            if (storedDate === currentDate)
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({ message: `Already executed today` }),
                };
        }

        if (!lastExecution) {
            const newDocument = new adminSettingsModel({
                id: "dailyRecharge",
                lastRechargeDate: currentDate,
            });
            await newDocument.save();
            const result = await userModel.updateMany(
                {},
                [
                    {
                        $set: {
                            currentMana: {
                                $max: ["$currentMana", "$maxMana"],
                            },
                            dailyRefill: true,
                            isNewDay: true,
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
                body: JSON.stringify({
                    message: `Updated ${result.modifiedCount} documents on 1st recharge date`,
                }),
            };
        } else {
            const updateResult = await adminSettingsModel.updateOne(
                { id: "dailyRecharge" },
                {
                    $set: {
                        lastRechargeDate: currentDate,
                    },
                },
                { new: true }
            );

            /* If Monday, update data related to user and leaderboard */
            if (dateToCheck.getDay() === 1) {
                const leaderboardModel = conn!.model("Leaderboard");
                const previousLB = await leaderboardModel
                    .find()
                    .sort({ leaderboardId: -1 })
                    .limit(1);
                if (previousLB.length > 0) {
                    const userCounts = await userModel
                        .find(
                            {},
                            { username: 1, weeklyReferralCount: 1, friends: 1 }
                        )
                        .sort({ weeklyReferralCount: -1 });

                    /* for sorting the users based on weeklyReferralCount */
                    const filteredCounts = userCounts
                        .map((user) => ({
                            username: user.username,
                            weeklyReferralCount: user.weeklyReferralCount,
                            referrals: user.friends.filter(
                                (friend: {
                                    userID: number;
                                    username: string;
                                    isReferred: boolean;
                                    referralDate: Date;
                                }) => friend.isReferred
                            ),
                        }))
                        .filter((user) => user.weeklyReferralCount > 0);
                    const sortedCounts = filteredCounts.sort((a, b) => {
                        if (a.weeklyReferralCount !== b.weeklyReferralCount)
                            return (
                                b.weeklyReferralCount - a.weeklyReferralCount
                            );
                        // else if(a.weeklyReferralCount === 0 && b.weeklyReferralCount === 0)
                        //     return 0;
                        // else if(a.weeklyReferralCount === 0)
                        //     return 1;
                        // else if(b.weeklyReferralCount === 0)
                        //     return -1;
                        else {
                            const lastReferralA =
                                a.referrals[a.referrals.length - 1];
                            const lastReferralB =
                                b.referrals[b.referrals.length - 1];

                            if (
                                !lastReferralA.referralDate &&
                                !lastReferralB.referralDate
                            ) {
                                return 0;
                            } else if (!lastReferralA.referralDate) {
                                return 1;
                            } else if (!lastReferralB.referralDate) {
                                return -1;
                            } else {
                                return (
                                    lastReferralA.referralDate.getTime() -
                                    lastReferralB.referralDate.getTime()
                                );
                            }
                        }
                    });
                    /*manual set for giving packs to top 3, if applicable */
                    const packIds = [
                        "international-mythic-m6",
                        "international-epic-m6",
                        "international-warrior-m6",
                    ]; //TODO: should be dynamic in the future, probably
                    const maxUsers = Math.min(3, sortedCounts.length);
                    for (let i = 0; i < maxUsers; i++) {
                        const user = sortedCounts[i];
                        const userResult = await userModel.findOne({
                            username: user.username,
                        });

                        if (userResult) {
                            const inventoryIndex =
                                userResult.inventory.findIndex(
                                    (item: InventoryItem) =>
                                        item.key === packIds[i]
                                );

                            // Update the user's inventory
                            await userModel.findOneAndUpdate(
                                { username: user.username },
                                {
                                    $inc: {
                                        [`inventory.${inventoryIndex}.stock`]: 1,
                                    },
                                },
                                { new: true }
                            );
                            console.log(
                                `[SCHEDULER] User ${user.username} updated with 1 ${packIds[i]} pack`
                            );
                        } else {
                            console.log(
                                `[SCHEDULER] User ${user.username} not applicable (0 weekly referral)`
                            );
                        }
                    }

                    /* update leaderboard collection with a new one for the new week */
                    try {
                        await leaderboardModel.updateOne(
                            { leaderboardId: previousLB[0].leaderboardId },
                            {
                                $set: {
                                    counts: sortedCounts.map((count) => ({
                                        username: count.username,
                                        weeklyReferralCount:
                                            count.weeklyReferralCount,
                                    })),
                                },
                            }
                        );
                        console.log(
                            "[SCHEDULER] Leaderboard updated successfully"
                        );
                    } catch (error) {
                        console.error(
                            "[ERROR][SCHEDULER] Error updating leaderboard:",
                            error
                        );
                    }
                    const newLB = {
                        leaderboardId: previousLB[0].leaderboardId + 1,
                        leaderboardStartDate: previousLB[0].leaderboardEndDate,
                        leaderboardEndDate: new Date(
                            previousLB[0].leaderboardEndDate.getTime() +
                                7 * 24 * 60 * 60 * 1000
                        ),
                    };

                    try {
                        await leaderboardModel.create(newLB);
                        console.log(
                            "[SCHEDULER] New leaderboard created successfully"
                        );
                    } catch (error) {
                        console.error(
                            "[ERROR][SCHEDULER] Error creating new leaderboard:",
                            error
                        );
                    }
                } else {
                    console.log("[SCHEDULER] No previous leaderboard found");
                }
            }

            const isMonday = dateToCheck.getDay() === 1 ? true : false;

            if (updateResult) {
                let result = null;
                if (isMonday) {
                    result = await userModel.updateMany(
                        {},
                        [
                            {
                                $set: {
                                    currentMana: {
                                        $max: ["$currentMana", "$maxMana"],
                                    },
                                    dailyRefill: true,
                                    isNewDay: true,
                                    weeklyReferralCount: 0,
                                    quests: {
                                        $map: {
                                            input: "$quests",
                                            as: "quest",
                                            in: {
                                                $cond: [
                                                    {
                                                        $eq: [
                                                            "$$quest.questId",
                                                            3,
                                                        ],
                                                    },
                                                    {
                                                        $mergeObjects: [
                                                            "$$quest",
                                                            {
                                                                isClaimed:
                                                                    false,
                                                            },
                                                        ],
                                                    },
                                                    "$$quest",
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                        { new: true }
                    );
                    console.log(
                        "[SCHEDULER] Weekly referral count and quest reset done successfully"
                    );
                } else {
                    result = await userModel.updateMany(
                        {},
                        [
                            {
                                $set: {
                                    currentMana: {
                                        $max: ["$currentMana", "$maxMana"],
                                    },
                                    dailyRefill: true,
                                    isNewDay: true,
                                },
                            },
                        ],
                        { new: true }
                    );
                }
                console.log("[SCHEDULER] Mana recharge done successfully");
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify({
                        message: `Updated ${result.modifiedCount} documents on recent recharge date`,
                    }),
                };
            } else throw new Error("Nothing to update");
        }
    } catch (err) {
        console.log(`[ERROR][SCHEDULER] ${err}`);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: `Some unknown ${err}` }),
        };
    }
}
