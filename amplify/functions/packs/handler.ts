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
                dbName: "aerena",
            })
            .asPromise();

        conn.model("Users", userSchema);
    }
    return await updatePacks(event);
};

async function updatePacks(event: APIGatewayProxyEvent) {
    const userModel = conn!.model("Users");

    const packType = event.queryStringParameters!.packType!;
    const userId = parseInt(event.queryStringParameters!.userId!);
    switch (packType) {
        case "starter": {
            try {
                await userModel.findOneAndUpdate(
                    {
                        userID: userId,
                    },
                    {
                        hasBoughtStarterPack: true,
                    }
                );
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(
                        "Updated user starter pack availability"
                    ),
                };
            } catch (e) {
                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        message:
                            "No user found or error in updating starter pack",
                        error: e,
                    }),
                };
            }
        }
        case "mythic":
        case "epic":
        case "warrior": {
            try {
                await userModel.findOneAndUpdate(
                    {
                        userID: userId,
                    },
                    {
                        $inc: { numBoosterPackBought: 1 },
                    }
                );
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify(
                        `Updated booster pack amount for user ${userId}`
                    ),
                };
            } catch (e) {
                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        message:
                            "No user found or error in updating booster packs",
                        error: e,
                    }),
                };
            }
        }
    }
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify("No pack type found on request"),
    };
}
