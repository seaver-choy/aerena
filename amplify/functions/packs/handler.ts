import type { APIGatewayProxyHandler } from "aws-lambda";
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
                dbName: "aerena_prod",
            })
            .asPromise();

        conn.model("Users", userSchema);
    }
    return {
        statusCode: 500,
        body: JSON.stringify("API not ready"),
    };
};
