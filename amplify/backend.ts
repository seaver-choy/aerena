import { defineBackend } from '@aws-amplify/backend';
import { Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  RestApi
} from "aws-cdk-lib/aws-apigateway";
import { athletesFunction } from './functions/athletes/resource';
import { packsFunction } from './functions/packs/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  packsFunction,
  athletesFunction
});

const apiStack = backend.createStack("api-stack");

const api = new RestApi(apiStack, "AerenaApi", {
  restApiName: "aerenaApi",
  deploy: true,
  deployOptions: {
      stageName: "dev",
  },
  defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
      allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
      allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
  }
});

const athleteIntegration = new LambdaIntegration(
  backend.athletesFunction.resources.lambda
);

const athletePath = api.root.addResource("athletes", {
    defaultMethodOptions: {
        authorizationType: AuthorizationType.NONE,
    },
});

athletePath.addMethod('GET', athleteIntegration)


//final addOutput
backend.addOutput({
  custom: {
      API: {
          [api.restApiName]: {
              endpoint: api.url,
              region: Stack.of(api).region,
              apiName: api.restApiName,
          },
      },
  },
});