import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { userSchema } from "../../schema";

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
    }

    switch (event.httpMethod) {
        case "GET":
            return getFriends(event);
        case "PUT":
            return updateFriends(event);
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
};

async function getFriends(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("Users");
    const userID = event.queryStringParameters?.userId;
    const result = await userModel.findOne(
        {
            userID,
        },
        {
            friends: 1,
            _id: 0,
        }
    );
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

    const friendIDs = result.friends.map(
        (friend: { userID: number; username: string; isReferred: boolean }) =>
            friend.userID
    );

    const friendLevels: Record<string, number> = {};

    let levelsResult = [];
    try {
        // Perform a single query to fetch levels for all friends
        levelsResult = await userModel.find(
            { userID: { $in: friendIDs } },
            { userID: 1, level: 1 }
        );

        // Map levels to the friendLevels object
        levelsResult.forEach((user) => {
            friendLevels[user.userID] = user.level || 0;
        });
    } catch (error) {
        console.error(`Error fetching levels for friends:`, error);
        Object.values(friendLevels).forEach(() => {});
    }

    // Map users to add level information
    const updatedFriends = result.friends.map(
        (friend: {
            userID: number;
            username: string;
            isReferred: boolean;
        }) => ({
            userID: friend.userID,
            username: friend.username,
            isReferred: friend.isReferred,
            level: friendLevels[friend.userID],
        })
    );

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(updatedFriends),
    };
}

async function updateFriends(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("Users");
    const username = event.queryStringParameters?.username;

    const newReferral = JSON.parse(JSON.parse(event.body!));

    if (username === newReferral.username) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "User cannot refer itself" }),
        };
    } else {
        try {
            const referralCheck = await userModel.findOne({
                $and: [{ username }, { "friends.userID": newReferral.userID }],
            });

            if (referralCheck) {
                console.error(
                    `[ERROR][FRIEND] User ${newReferral.userID} is already referred by ${username}`
                );
                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        message: "User is already referred by the referrer",
                    }),
                };
            }

            const update = await userModel.findOneAndUpdate(
                { username },
                {
                    $push: { friends: newReferral },
                    $inc: {
                        referralCount: 1,
                        points: 5000,
                        weeklyReferralCount: 1,
                    },
                    $set: {
                        pointsUpdatedAt: new Date(),
                    },
                },
                { new: true }
            );

            console.info(
                `[FRIEND] User ${username} has successfully referred ${newReferral.userID}`
            );
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(update),
            };
        } catch (e) {
            console.error(
                `[ERROR][REFERRAL] An error occured during the referral process for ${username} (referrer) and ${newReferral.userID}`
            );
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    message: "An error occured during the referral process",
                    error: e,
                }),
            };
        }
    }
}
