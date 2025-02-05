import { defineFunction, secret } from "@aws-amplify/backend";

export const authorizerFunction = defineFunction({
    name: "authorizer",
    entry: "./handler.ts",
    environment: {
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
