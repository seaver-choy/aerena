import { defineFunction, secret } from "@aws-amplify/backend";

export const mintFunction = defineFunction({
    name: "mint",
    entry: "./handler.ts",
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
        TOKEN_COUNTER_ID: secret("TOKEN_COUNTER_ID"),
    },
});
