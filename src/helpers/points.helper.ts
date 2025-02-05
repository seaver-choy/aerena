import { get, put } from "aws-amplify/api";
export const updateUserPoints = async (
    userID: number,
    points: number,
    tapCounter: number,
    initDataRaw: string
) => {
    try {
        const payload = {
            userID: userID,
            points: points,
            tapCounter: tapCounter,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const response = await restOperation.response;

        const data = await response.body.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log(`Error updating user points:`, error);
        throw error;
    }
};

export const getUserData = async (userID: number, initDataRaw: string) => {
    try {
        console.log(userID);
        const restOperation = get({
            apiName: "playibleApi",
            path: `user?user_id=${userID}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const response = await restOperation.response;

        const data = await response.body.text();
        //console.log(data);

        return JSON.parse(data);
    } catch (error) {
        console.log(`getUserData call failed:`, error);
        throw error;
    }
};
