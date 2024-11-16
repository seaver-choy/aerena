import { get } from "aws-amplify/api";

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