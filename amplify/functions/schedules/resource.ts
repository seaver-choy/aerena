import { defineFunction, secret } from "@aws-amplify/backend";

export const schedulesFunction = defineFunction({
    name: "schedules",
    entry: "./handler.ts",
    timeoutSeconds: 60,
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
