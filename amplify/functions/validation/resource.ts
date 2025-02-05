import { defineFunction, secret } from "@aws-amplify/backend";

export const validateFunction = defineFunction({
    name: "validate",
    entry: "./handler.ts",
    environment: {
        BOT_TOKEN: secret("BOT_TOKEN"),
    },
});
