import { defineFunction, secret } from "@aws-amplify/backend";

export const schedulerFunction = defineFunction({
    name: "scheduler",
    entry: "./handler.ts",
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
