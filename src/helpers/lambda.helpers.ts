import { get, post } from "aws-amplify/api";

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
}

export const login = async (tonWalletString: string) => {
    try {
        const restOperation = post({
                    apiName: "aerenaApi",
                    path: `user`,
                    options: {
                        body: JSON.stringify({
                            tonWalletString: tonWalletString
                        })
                    }
                });
    
        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
        } catch (e) {
            console.log(e);
        }
}

export const mint = async (tonWalletString: string) => {
    try {
        const restOperation = post({
                    apiName: "aerenaApi",
                    path: `mint`,
                    options: {
                        body: JSON.stringify({
                            tonWalletString: tonWalletString
                        })
                    }
                });
    
        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
        } catch (e) {
            console.log(e);
        }
}