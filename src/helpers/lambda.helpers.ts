import { get, post, put } from "aws-amplify/api";

export const getAthletes = async () => {
    try {
        const restOperation = get({
            apiName: "aerenaApi",
            path: `athletes`,
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getUserAthletesApi = async (tonWalletString: string) => {
    try {
        const restOperation = get({
            apiName: "aerenaApi",
            path: `user`,
            options: {
                queryParams: {
                    tonWalletString,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response).athletes;
    } catch (e) {
        console.log(e);
    }
};

export const login = async (tonWalletString: string) => {
    try {
        const restOperation = post({
            apiName: "aerenaApi",
            path: `user`,
            options: {
                body: JSON.stringify({
                    tonWalletString: tonWalletString,
                }),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const mint = async (tonWalletString: string) => {
    try {
        const restOperation = post({
            apiName: "aerenaApi",
            path: `mint`,
            options: {
                body: JSON.stringify({
                    tonWalletString: tonWalletString,
                }),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const submitLineup = async (
    tournamentId,
    tonWalletString,
    userLineup
) => {
    try {
        const submitLineup = {
            tonWalletString: tonWalletString,
            lineup: userLineup,
            score: 0,
        };

        const restOperation = put({
            apiName: "aerenaApi",
            path: `tournaments/${tournamentId}`,
            options: {
                body: JSON.stringify(submitLineup),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();

        return JSON.parse(response);
    } catch (e) {
        console.log("PUT call error");
        console.log(e);
    }
};
