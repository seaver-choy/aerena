import { defineFunction, secret } from "@aws-amplify/backend";

export const userFunction = defineFunction({
  name: "user",
  entry: "./handler.ts",
  environment: {
    MONGODB_URI: secret("MONGODB_URI"),
  },
});
