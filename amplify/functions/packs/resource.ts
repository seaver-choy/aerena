import { defineFunction } from "@aws-amplify/backend";

export const packsFunction = defineFunction({
    name: "packs",
    entry: "./handler.ts",
    environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        BOT_TOKEN: process.env.BOT_TOKEN || "",
    },
});
