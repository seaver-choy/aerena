import { defineFunction, secret } from "@aws-amplify/backend";

export const mintFunction = defineFunction({
    name: "mint",
    entry: "./handler.ts",
    environment: {
        MONGODB_URI: secret("MONGODB_URI"),
    },
});
