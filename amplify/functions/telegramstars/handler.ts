import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import axios from "axios";
import {
    starsTransactionSchema,
    tournamentSchema,
    userSchema,
} from "../../schema";

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
        conn.model("Tournaments", tournamentSchema);
        conn.model("StarsTransaction", starsTransactionSchema);
    }
    if (event.path.includes("invoice")) {
        return await getNewInvoice(event);
    } else {
        switch (event.httpMethod) {
            case "POST":
                return await saveTelegramStarsTransaction(event);
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

async function getNewInvoice(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("Users");

        const content = JSON.parse(JSON.parse(event.body!));

        //get the initial state of the user, in case an error happens
        const userResult = await userModel.findOne({
            userID: content.userId,
        });
        if (!userResult) {
            console.error(`[ERROR] User ${content.userId} not found`);
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ message: "No user found" }),
            };
        }

        const starsTransactionModel = conn!.model("StarsTransaction");
        const latestTransaction = await starsTransactionModel
            .findOne({
                userId: content.userId,
            })
            .sort({ updateId: -1 });

        let updateId = 1;
        if (!latestTransaction)
            console.log(
                `[INFO] No transactions found for user ${content.userId}`
            );
        else updateId = latestTransaction.updateId + 1;
        let title,
            description,
            payload,
            prices = [{ label: "Total", amount: 0 }],
            transactionInfo;
        let responseData = {};
        switch (content.transactionType) {
            case "premium_tournament": {
                const tournamentModel = conn!.model("Tournaments");
                const tournamentResult = await tournamentModel.findOne({
                    tournamentId: parseInt(content.tournamentId),
                });
                if (!tournamentResult) {
                    console.error(
                        `[ERROR][TOURNAMENT] Tournament ${content.tournamentId} not found in database.`
                    );
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        body: JSON.stringify({
                            message: "Tournament not found",
                        }),
                    };
                }
                title = tournamentResult.tournamentName;
                description =
                    "Premium Tournament Lineup Submission";
                transactionInfo =
                    "premium_tournament_" +
                    tournamentResult.tournamentId +
                    "_" +
                    updateId;
                payload = JSON.stringify({ transactionInfo: transactionInfo });
                prices = [{ label: "Total", amount: content.amount }];
                responseData = {
                    userId: content.userId,
                    transactionInfo: transactionInfo,
                    transactionType: "premium_tournament",
                    amount: content.amount,
                };
                break;
            }
            case "exchange_packs": {
                {
                    const packInfo = content.packInfo;
                    const league = packInfo.league;
                    const packType = packInfo.packType;
                    const transactionType = league.toUpperCase() + " " + packType.charAt(0).toUpperCase() + packType.slice(1);
                    const count = content.count;
                    const amount = packInfo.starCost * count;
                    title = count + " " + transactionType + " Pack" + (count > 1 ? "s" : "");
                    description = "Buying " + transactionType + " Pack";
                    payload = JSON.stringify({ transactionInfo: "exchange_packs_" + packInfo.packId + "_" + updateId });
    
                    prices = [{ label: 'Total', amount: amount}];
                    responseData = {
                        userId: content.userId,
                        transactionInfo: "exchange_packs_" + packInfo.packId + "_" + updateId,
                        transactionType: "exchange_packs",
                        amount: amount};
                    break;
                }
            }
        }
        const response = await axios.post(process.env.BOT_WEBHOOK_URL!, {
            update_id: updateId,
            message: {
                chat: {
                    id: content.userId,
                    title: title,
                    description: description,
                    payload: payload,
                    prices: prices,
                },
                text: "/pay " + prices[0].amount,
            },
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                ...responseData,
                ...response.data,
                updateId: updateId,
            }),
            //   body: JSON.stringify({data: {title: title, description: description, payload: payload, prices: prices}})
        };
    } catch (err) {
        console.log(`[ERROR][TELEGRAMSTARS] ${err}`);
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

async function saveTelegramStarsTransaction(event: APIGatewayProxyEvent) {
    try {
        const userModel = conn!.model("Users");

        const content = JSON.parse(JSON.parse(event.body!));

        //get the initial state of the user, in case an error happens
        const userResult = await userModel.findOne({
            userID: content.userId,
        });
        if (!userResult) {
            console.error(
                `[ERROR][TELEGRAMSTARS] User ${content.userID} not found`
            );
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ message: "No user found" }),
            };
        }

        const starsTransactionModel = conn!.model("StarsTransaction");
        const transaction = new starsTransactionModel({
            userId: content.userId,
            updateId: content.updateId,
            // transactionId: content.transactionId,
            transactionInfo: content.transactionInfo,
            transactionType: content.transactionType,
            amount: parseInt(content.amount),
            date: new Date(),
        });
        await transaction.save();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: transaction.transactionId + " transaction saved",
            }),
        };
    } catch (err) {
        console.log(`[ERROR][TELEGRAMSTARS] ${err}`);
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
