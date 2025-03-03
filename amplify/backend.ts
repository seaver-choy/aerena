import { defineBackend } from "@aws-amplify/backend";
import { Stack, aws_lambda, Duration, aws_secretsmanager } from "aws-cdk-lib";
import {
    AuthorizationType,
    Cors,
    LambdaIntegration,
    RequestAuthorizer,
    RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { auth } from "./auth/resource";
import { userFunction } from "./functions/user/resource";
import { tournamentsFunction } from "./functions/tournaments/resource";
import { mintFunction } from "./functions/mint/resource";
import { portfolioFunction } from "./functions/portfolio/resource";
import { schedulerFunction } from "./functions/scheduler/resource";
import { friendsFunction } from "./functions/friends/resource";
import { statsFunction } from "./functions/stats/resource";
import { upgradeFunction } from "./functions/upgrade/resource";
import { telegramstarsFunction } from "./functions/telegramstars/resource";
import { mlTournamentFunction } from './functions/mltournaments/resource';
import { packInfoFunction } from './functions/packinfo/resource';
import * as dotenv from "dotenv";
import * as path from "path";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth,
    userFunction,
    tournamentsFunction,
    mintFunction,
    portfolioFunction,
    schedulerFunction,
    friendsFunction,
    statsFunction,
    upgradeFunction,
    telegramstarsFunction,
    mlTournamentFunction,
    packInfoFunction,
});

const __dirname = path.dirname("../.env");
dotenv.config({ path: __dirname });
const apiStack = backend.createStack("api-stack");
console.log("test");
console.log(process.env.ENVIRONMENT);
let api: RestApi;

if (process.env.ENVIRONMENT === "prod") {
    const secretKey = aws_secretsmanager.Secret.fromSecretCompleteArn(
        apiStack,
        "tokenSecret",
        process.env.TOKEN_SECRET_ARN!
    );
    const func = new aws_lambda.Function(apiStack, "authorizeFunction", {
        runtime: aws_lambda.Runtime.NODEJS_18_X,
        handler: "handler.handler",
        timeout: Duration.seconds(29),
        code: aws_lambda.Code.fromAsset("amplify/functions/authorizer"),
        environment: {
            BOT_TOKEN: secretKey.secretValue.unsafeUnwrap().toString(),
        },
        layers: [
            aws_lambda.LayerVersion.fromLayerVersionArn(
                apiStack,
                "authorizerLayer",
                process.env.AUTHORIZER_LAYER_ARN!
            ),
        ],
    });

    const telegramAuthorizer = new RequestAuthorizer(
        apiStack,
        "telegramAuthorizer",
        {
            handler: func,
            identitySources: ["method.request.header.X-Telegram-Auth"],
        }
    );

    api = new RestApi(apiStack, "PlayibleApi", {
        restApiName: "playibleApi",
        deploy: true,
        deployOptions: {
            stageName: "prod",
        },
        defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
            allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
            allowHeaders: [...Cors.DEFAULT_HEADERS, "X-Telegram-Auth"], // Specify only the headers you need to allow
        },
        defaultMethodOptions: {
            authorizer: telegramAuthorizer,
            authorizationType: AuthorizationType.CUSTOM,
        },
    });
} else {
    api = new RestApi(apiStack, "PlayibleApi", {
        restApiName: "playibleApi",
        deploy: true,
        deployOptions: {
            stageName: "dev",
        },
        defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
            allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
            allowHeaders: [...Cors.DEFAULT_HEADERS, "X-Telegram-Auth"], // Specify only the headers you need to allow
        },
        defaultMethodOptions: {
            authorizationType: AuthorizationType.NONE,
        },
    });
}

//Authorizer section

//LambaIntegration section
const userIntegration = new LambdaIntegration(
    backend.userFunction.resources.lambda
);
const tournamentsIntegration = new LambdaIntegration(
    backend.tournamentsFunction.resources.lambda
);
const mintIntegration = new LambdaIntegration(
    backend.mintFunction.resources.lambda
);
const portfolioIntegration = new LambdaIntegration(
    backend.portfolioFunction.resources.lambda
);
const schedulerIntegration = new LambdaIntegration(
    backend.schedulerFunction.resources.lambda
);
const friendsIntegration = new LambdaIntegration(
    backend.friendsFunction.resources.lambda
);
const statsIntegration = new LambdaIntegration(
    backend.statsFunction.resources.lambda
);
const upgradeIntegration = new LambdaIntegration(
    backend.upgradeFunction.resources.lambda
);
const telegramstarsIntegration = new LambdaIntegration(
    backend.telegramstarsFunction.resources.lambda
);
const mlTournamentIntegration = new LambdaIntegration(
    backend.mlTournamentFunction.resources.lambda
);
const packInfoIntegration = new LambdaIntegration(
    backend.packInfoFunction.resources.lambda
);

//addResource section
const userPath = api.root.addResource("user", {});
const tournamentsPath = api.root.addResource("tournaments", {});
const mintPath = api.root.addResource("mint", {});
const portfolioPath = api.root.addResource("portfolio", {});
const schedulerPath = api.root.addResource("recharge", {});
const friendsPath = api.root.addResource("friends", {});
const loginPath = userPath.addResource("login", {});
const statsPath = api.root.addResource("stats", {});
const upgradePath = api.root.addResource("upgrade", {});
const telegramstarsPath = api.root.addResource("telegramstars", {});
const invoicelinkPath = api.root.addResource("invoice", {});
const mlTournamentPath = api.root.addResource("mltournaments", {});
const packInfoPath = api.root.addResource("packinfos", {});
const joinBasicPath = api.root.addResource("joinbasic", {});

//addMethod section
userPath.addMethod("GET", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
userPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
userPath.addMethod("POST", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

tournamentsPath.addMethod("GET", tournamentsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
tournamentsPath.addMethod("POST", tournamentsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
tournamentsPath.addMethod("DELETE", tournamentsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
tournamentsPath.addMethod("PUT", tournamentsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

mintPath.addMethod("GET", mintIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
mintPath.addMethod("POST", mintIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
mintPath.addMethod("PUT", mintIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

portfolioPath.addMethod("GET", portfolioIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

schedulerPath.addMethod("POST", schedulerIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

friendsPath.addMethod("GET", friendsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
friendsPath.addMethod("PUT", friendsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

loginPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

upgradePath.addMethod("PUT", upgradeIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

telegramstarsPath.addMethod("POST", telegramstarsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

invoicelinkPath.addMethod("POST", telegramstarsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

mlTournamentPath.addMethod("GET", mlTournamentIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
mlTournamentPath.addMethod("POST", mlTournamentIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

packInfoPath.addMethod("GET", packInfoIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

joinBasicPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

//addProxy section
userPath.addProxy({
    anyMethod: true,
    defaultIntegration: userIntegration,
});

tournamentsPath.addProxy({
    anyMethod: true,
    defaultIntegration: tournamentsIntegration,
});

portfolioPath.addProxy({
    anyMethod: true,
    defaultIntegration: portfolioIntegration,
});

const statsProxy = statsPath.addProxy({
    anyMethod: false,
    defaultIntegration: statsIntegration,
});

statsProxy.addMethod("GET", statsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
telegramstarsPath.addProxy({
    anyMethod: true,
    defaultIntegration: telegramstarsIntegration,
});

mlTournamentPath.addProxy({
    anyMethod: true,
    defaultIntegration: mlTournamentIntegration,
});

packInfoPath.addProxy({
    anyMethod: true,
    defaultIntegration: packInfoIntegration,
});

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
