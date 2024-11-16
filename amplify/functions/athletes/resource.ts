import { defineFunction, secret } from "@aws-amplify/backend";

export const athletesFunction = defineFunction({
  name: "stats",
  entry: "./handler.ts",
  environment: {
    MONGODB_URI: secret("MONGODB_URI"),
  },
});
