import { defineFunction, secret } from "@aws-amplify/backend";

export const statsFunction = defineFunction({
    name: "stats",
    entry: "./handler.ts",
    timeoutSeconds: 60,
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
