import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { userSchema } from "../../schema";
import { InventoryItem } from "../../interface";
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

        const scheduleSchema = new mongoose.Schema({
            id: String,
            lastRechargeDate: Date,
        });
        conn.model("User", userSchema);
        conn.model("AdminSettings", scheduleSchema);
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

            const isMonday = dateToCheck.getDay() === 1 ? true : false;

            if (updateResult) {
                let result = null;
                if (isMonday) {
                    result = await userModel.updateMany(
                        {},
                        [
                            {
                                $set: {
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
                                    isNewDay: true,
                                },
                            },
                        ],
                        { new: true }
                    );
                }
                console.log("[SCHEDULER] Day reset done successfully");
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
