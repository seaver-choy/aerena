import type { APIGatewayProxyHandler } from "aws-lambda";
import { validate } from "@telegram-apps/init-data-node";

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const secretToken = process.env.BOT_TOKEN!;
    const dataCheckString = event.queryStringParameters!.initData ?? "";
    const stringDecoded = decodeURIComponent(dataCheckString);
    console.log(stringDecoded);

    try {
        validate(stringDecoded, secretToken);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify("Hello"),
        };
    } catch (e) {
        console.log(e);
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

// function CheckValidityFunction (data_check_string: string) {

// }
