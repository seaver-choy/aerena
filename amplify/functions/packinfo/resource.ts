import { defineFunction, secret } from "@aws-amplify/backend";

export const packInfoFunction = defineFunction({
    name: "packInfo",
    entry: "./handler.ts",
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
