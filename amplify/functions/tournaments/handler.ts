import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { tournamentSchema, userSchema } from "../../schema";

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

        conn.model("Tournaments", tournamentSchema);
        conn.model("User", userSchema);
    }

    switch (event.httpMethod) {
        case "PUT":
            return submitLineupToTournament(event);
        default:
            return {
                statusCode: 405,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("METHOD does not exist"),
            };
    }
};

async function submitLineupToTournament(event: APIGatewayProxyEvent) {
    const tournamentModel = conn!.model("Tournaments");
    const userModel = conn!.model("User");

    if (event.pathParameters && event.pathParameters.proxy !== null) {
        const payload = JSON.parse(JSON.parse(event.body!));
        const tournamentId = parseInt(event.pathParameters.proxy!);

        const user = await userModel.findOne({
            tonWalletString: payload.tonWalletString,
        });

        if (!user) {
            console.error("User not found ");
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("User not found"),
            };
        }

        const tournamentInitial = await tournamentModel.findOne({
            tournamentId: tournamentId,
        });

        if (!tournamentInitial) {
            console.error("Tournament not found");
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify("Tournament not found"),
            };
        }

        try {
            const tournament = await tournamentModel.findOneAndUpdate(
                { tournamentId: tournamentId },
                { $push: { usersJoined: payload } },
                { new: true }
            );
            console.info(
                `User has successfully joined tournament ${tournamentId}`
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(tournament),
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(error),
            };
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("Bad request"),
        };
    }
}
