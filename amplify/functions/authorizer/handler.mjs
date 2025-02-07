import { validate } from "@telegram-apps/init-data-node";

export const handler = async (event) => {
    const secret = JSON.parse(process.env.BOT_TOKEN);
    console.log(secret);
    const initDataRaw = event.headers["x-telegram-auth"].split("tma ")[1] ?? "";
    console.log(initDataRaw);
    const decodedString = decodeURIComponent(initDataRaw);
    console.log(`Decoded ${decodedString}`);
    try {
        validate(decodedString, secret.BOT_TOKEN);
        //if no errors, Success
        return generatePolicy("Allow");
    } catch (e) {
        console.error(`Error on authorization \n ${e}`);

        return generatePolicy("Deny");
    }
};

function generatePolicy(effect) {
    return {
        principalId: "user",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "*",
                },
            ],
        },
    };
}
