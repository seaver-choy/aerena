import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { athleteSchema, userSchema } from '../../schema';

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
            conn.model("Users", userSchema);
        }
        switch (event.httpMethod) {
            case "POST":
                return await mintPlayers(event);
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
    } catch (e) {
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(`${e}`),
        };
    }
};

async function mintPlayers(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");
    const userModel = conn!.model("Users");
    const allResult = await athleteModel.find({}); //get all players in MPL

    if (!allResult) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("No players found"),
        };
    }

    const payload = JSON.parse(JSON.parse(event.body!));
    console.log(payload);

    //get the initial state of the user, in case an error happens
    const userResult = await userModel.findOne({
        tonWalletString: payload.tonWalletString,
    });

    console.log(userResult);

    if(userResult) {
        const mintedAthletes = []
        if(userResult.athlete || userResult.athletes.length === 0) {
            userResult.athlete = []
        } 

        const uniqueNumbers = getUniqueRandomNumbers(5, 0, allResult.length - 1);

        for(let i = 0; i < 5; i++) {
            let mintedAthlete = allResult[uniqueNumbers[i]]
            mintedAthletes.push(mintedAthlete)
        }

        const updatedResult = await userModel.findOneAndUpdate({
            tonWalletString: payload.tonWalletString,
        }, {
            "$push": { athletes: { "$each": mintedAthletes } }
        });

        console.log(mintedAthletes);

        return {
            statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({mintedAthletes: mintedAthletes}),
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("User not found"),
        }
    }
}

function getUniqueRandomNumbers(count:number, min:number, max:number) {
    if (count > (max - min + 1)) {
      throw new Error('Cannot generate more unique numbers than the range allows.');
    }
  
    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from<number>(numbers);
  }
  