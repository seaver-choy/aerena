import type { APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { userSchema } from "../../schema";

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

            conn.model("Users", userSchema);
        }

        if (event.httpMethod === "POST") {

            const req = JSON.parse(JSON.parse(event.body!));
            console.log(event.body);
            let user = await conn.model<any>("Users").findOne({tonWalletString: req.tonWalletString})

            const userData = {
                tonWalletString: req.tonWalletString || "",
                athletes: []
            }

            if (!user) {
                // If user doesn't exist, create a new user
                user = await conn.model<any>("Users").create(userData);
                console.log('New user created:', user);
              } else {
                console.log('User already exists:', user);
              }

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Logged In"),
            };

        } else if( event.httpMethod == "GET") {

            const user = await conn.model<any>("Users").findOne({tonWalletString: event.queryStringParameters?.tonWalletString})

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(user),
            };
        }
        else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Method not found for this path"),
            };
        }
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify("Error"),
        };
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
