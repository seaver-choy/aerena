import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import mongoose, { Connection } from "mongoose";
import { athleteSchema, counterSchema, packInfoSchema, teamSchema, userSchema } from "../../schema";
import { Athlete, Skin } from "../../interface";
let conn: Connection | null = null;
const uri = process.env.MONGODB_URI!;

export const handler: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        if (!conn) {
            conn = await mongoose
                .createConnection(uri, {
                    serverSelectionTimeoutMS: 5000,
                    dbName: "aerena",
                })
                .asPromise();
            conn.model("Athletes", athleteSchema);
            conn.model("Users", userSchema);
            conn.model("Teams", teamSchema);
            conn.model("PackInfos", packInfoSchema);
            conn.model("Counter", counterSchema);
        }
        switch (event.httpMethod) {
            case "GET":
                return await getAthletes();
            case "POST":
                return await getAthleteChoices(event);
            case "PUT":
                return await saveSkin(event);
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
            body: JSON.stringify({
                message: "An error occured during the minting process",
                error: e,
            }),
        };
    }
};

async function saveSkin(event: APIGatewayProxyEvent) {
    const packInfoModel = conn!.model("PackInfos");
    const userModel = conn!.model("Users");
    const payload = JSON.parse(JSON.parse(event.body!));
    const skin = payload.skin;
    console.log(payload.userId);

    //get the initial state of the user, in case an error happens
    const userResult = await userModel.findOne({
        userID: payload.userId,
    });
    const counterModel = conn!.model("Counter");
    const counterResult = await counterModel.findById(
        process.env.TOKEN_COUNTER_ID!
    );
    if (!userResult) {
        console.error(`[ERROR] User ${payload.userId} not found`);
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "No user found" }),
        };
    }

    const packInfoResult = await packInfoModel.findOne({packId: skin.packId});

    try {
        const skinCounter = Number(counterResult.skinCounter);
        switch (packInfoResult.packType) {
            case "choice": {
                const newSkin = {
                    ...skin,
                    skinId: skinCounter + 1,
                    savedAt: new Date(),
                }
                
                const userUpdate = await userModel.findOneAndUpdate(
                    { userID: payload.userId },
                    {
                        $push: { skins: newSkin },
                    },
                    { new: true }
                );

                const newCounter = {
                    skinCounter: skinCounter + 1,
                };

                await counterModel.findByIdAndUpdate(
                    process.env.TOKEN_COUNTER_ID!,
                    newCounter
                );

                console.info(`[MINT][SKIN] User ${userResult.userId} has saved a new skin from ${packInfoResult.packId}:\n` + JSON.stringify(newSkin));

                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify(userUpdate),
                };
            }
            default: {
                console.error(
                    `[MINT] Pack type ${payload.packType} does not exist. Caller: ${payload.userId}`
                );
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        message: "Pack type does not exist",
                    }),
                };
            }
        }
    } catch (err) {
        await userModel.findOneAndReplace(
            { userID: payload.userId },
            userResult
        );
        await counterModel.findOneAndReplace(
            { id: process.env.TOKEN_COUNTER_ID! },
            counterResult
        );
        console.error(
            `[MINT] ${payload.userId} has encountered an error \n ${err}`
        );

        console.info(
            `User ${payload.userId} initial state \n ${JSON.stringify(userResult)}`
        );

        console.info(
            `Counter initial state \n ${JSON.stringify(counterResult)}`
        );
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: err }),
        };
    }
}

async function transformToSkin(athlete: Athlete) {
    const teamModel = conn!.model("Teams");
    const tournament = await teamModel.findOne({
        key: athlete.team,
        league: athlete.league
    }, {
        colors: {
            main: 1,
            light: 1,
            dark: 1,
            wings: 1,
            accent: 1,
            details: 1,
            wave: 1
        }
    });
    return {
        skinId: "0",
        athleteId: athlete.athleteId,
        player: athlete.player,
        position: athlete.position,
        team: athlete.team,
        league: athlete.league,
        type: athlete.type,
        teamData: {colors: tournament?.colors},
        isEquipped: false,
        packId: "",
        costType: "",
        savedAt: new Date(),
    };
};

//for getting mintable dream athletes (not user's dream athletes)
async function getAthletes() {
    const athleteModel = conn!.model("Athletes");

    const result = await athleteModel.find({});
    if (!result) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: "No dream team athletes available",
            }),
        };
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(result),
    };
}

async function getAthleteChoices(event: APIGatewayProxyEvent) {
    const athleteModel = conn!.model("Athletes");

    const payload = JSON.parse(JSON.parse(event.body!));
    const allResult = await athleteModel.find({league: payload.league});

    if (!allResult) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify("No athletes found"),
        };
    }
    const selectedPairs: Skin[][] = [];

    for (let i = 0; i < payload.boosterQuantity; i++) {
        const availableAthletes = [...allResult];
        
        const index1 = Math.floor(Math.random() * availableAthletes.length);
        const firstAthlete = availableAthletes.splice(index1, 1)[0];
        
        const index2 = Math.floor(Math.random() * availableAthletes.length);
        const secondAthlete = availableAthletes.splice(index2, 1)[0];
        
        const [skin1, skin2] = await Promise.all([
            transformToSkin(firstAthlete),
            transformToSkin(secondAthlete)
        ]);
        
        selectedPairs.push([skin1, skin2]);
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(selectedPairs),
    };
}
