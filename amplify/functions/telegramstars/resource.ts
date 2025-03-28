import { defineFunction, secret } from "@aws-amplify/backend";

export const telegramstarsFunction = defineFunction({
    name: "telegramstars",
    entry: "./handler.ts",
    timeoutSeconds: 60,
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
        BOT_WEBHOOK_URL: secret("BOT_WEBHOOK_URL"),
    },
});
