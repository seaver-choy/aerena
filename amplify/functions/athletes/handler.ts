import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { athleteSchema } from "../../schema/athleteSchema";

let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!conn) {
            conn = await mongoose
                .createConnection(uri, {
                    serverSelectionTimeoutMS: 5000,
                    dbName: "aerena_prod",
                })
                .asPromise();

            conn.model("Athletes", athleteSchema);
        }

        if (event.httpMethod === "GET") {
            const eventProxy = event.pathParameters?.proxy;
            const params = eventProxy?.split("/");

            console.log(params)
            const athletes = await conn.model<any>("Athletes").find({});

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(athletes),
            };

        } else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Method not found for this path"),
            };
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify("Authentication error"),
        };
    }
};
