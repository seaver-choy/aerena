import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { leaderboardSchema, userSchema } from "../../schema";

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
        conn.model("Users", userSchema);
        conn.model("Leaderboard", leaderboardSchema);
    }
    if (event.path.includes("lbinfo")) {
        return getCurrentLeaderboardInfo();
    } else {
        switch (event.httpMethod) {
            case "GET":
                return getLeaderboard();
            default:
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify("Method does not exist"),
                };
        }
    }
};

async function getLeaderboard() {
    const userModel = conn!.model("Users");
    const result = await userModel
        .find({}, { weeklyReferralCount: 1, username: 1, friends: 1 })
        .sort({ weeklyReferralCount: -1 });
    if (!result) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "User not found" }),
        };
    }

    const filteredResult = result.filter(
        (user) => user.weeklyReferralCount > 0
    );
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(
            filteredResult.map((user) => ({
                weeklyReferralCount: user.weeklyReferralCount,
                username: user.username,
                referrals: user.friends.filter(
                    (friend: {
                        userID: number;
                        username: string;
                        isReferred: boolean;
                        referralDate: Date;
                    }) => friend.isReferred
                ),
            }))
        ),
    };
}

async function getCurrentLeaderboardInfo() {
    const leaderboardModel = conn!.model("Leaderboard");
    const result = await leaderboardModel.find().sort({ leaderboardId: -1 });
    if (!result) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "User not found" }),
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(result[0]),
    };
}
