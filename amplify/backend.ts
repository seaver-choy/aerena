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
//import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { userFunction } from "./functions/user/resource";
import { tournamentsFunction } from "./functions/tournaments/resource";
import { mintFunction } from "./functions/mint/resource";
import { portfolioFunction } from "./functions/portfolio/resource";
import { packsFunction } from "./functions/packs/resource";
import { schedulerFunction } from "./functions/scheduler/resource";
import { friendsFunction } from "./functions/friends/resource";
import { countersFunction } from "./functions/counters/resource";
import { statsFunction } from "./functions/stats/resource";
import { upgradeFunction } from "./functions/upgrade/resource";
import { packInfoFunction } from "./functions/packinfo/resource";
import { leaderboardFunction } from "./functions/leaderboard/resource";
import { telegramstarsFunction } from "./functions/telegramstars/resource";
import { mlTournamentFunction } from './functions/mltournaments/resource';
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
    packsFunction,
    schedulerFunction,
    friendsFunction,
    countersFunction,
    statsFunction,
    upgradeFunction,
    packInfoFunction,
    leaderboardFunction,
    telegramstarsFunction,
    mlTournamentFunction,
});

const __dirname = path.dirname("../.env");
dotenv.config({ path: __dirname });
const apiStack = backend.createStack("api-stack");
console.log("test");
console.log(process.env.ENVIRONMENT);
let api: RestApi;
// const testAuthorizerFunction = backend.authorizerFunction.resources
//     .lambda as aws_lambda.Function;

// const authorizerFunc = aws_lambda.Function.fromFunctionArn(
//     apiStack,
//     "authorizer",
//     backend.authorizerFunction.resources.lambda.functionArn
// );
// authorizerFunc.addPermission("AllowAPIGateway", {
//     principal: new aws_iam.ServicePrincipal("apigateway.amazonaws.com"),
// });

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

const packsIntegration = new LambdaIntegration(
    backend.packsFunction.resources.lambda
);

const schedulerIntegration = new LambdaIntegration(
    backend.schedulerFunction.resources.lambda
);
const friendsIntegration = new LambdaIntegration(
    backend.friendsFunction.resources.lambda
);

const countersIntegration = new LambdaIntegration(
    backend.countersFunction.resources.lambda
);

const statsIntegration = new LambdaIntegration(
    backend.statsFunction.resources.lambda
);

const packInfoIntegration = new LambdaIntegration(
    backend.packInfoFunction.resources.lambda
);

const upgradeIntegration = new LambdaIntegration(
    backend.upgradeFunction.resources.lambda
);

const leaderboardIntegration = new LambdaIntegration(
    backend.leaderboardFunction.resources.lambda
);

const telegramstarsIntegration = new LambdaIntegration(
    backend.telegramstarsFunction.resources.lambda
);

const mlTournamentIntegration = new LambdaIntegration(
    backend.mlTournamentFunction.resources.lambda
);
//addResource section

const userPath = api.root.addResource("user", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const taskPath = userPath.addResource("task", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const tournamentsPath = api.root.addResource("tournaments", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const mintPath = api.root.addResource("mint", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const portfolioPath = api.root.addResource("portfolio", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const packsPath = api.root.addResource("packs", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const schedulerPath = api.root.addResource("recharge", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const friendsPath = api.root.addResource("friends", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const levelUpPath = userPath.addResource("levelup", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const refillManaPath = userPath.addResource("refill", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const claimTaskPath = userPath.addResource("claimTask", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const joinTgChannelPath = userPath.addResource("joinTgChannel", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const loginPath = userPath.addResource("login", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    //     // authorizationType: AuthorizationType.CUSTOM,
    //     // authorizer: telegramAuthorizer,
    // },
});

const battlePassPath = userPath.addResource("battlepass", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: { authorizationType: AuthorizationType.NONE },
});

const countersPath = api.root.addResource("counters", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const statsPath = api.root.addResource("stats", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const packInfoPath = api.root.addResource("packinfos", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});
const upgradePath = api.root.addResource("upgrade", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const leaderboardPath = api.root.addResource("leaderboard", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const lbInfoPath = userPath.addResource("lbinfo", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const telegramstarsPath = api.root.addResource("telegramstars", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const invoicelinkPath = api.root.addResource("invoice", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const mlTournamentPath = api.root.addResource("mltournaments", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});

const leaguePath = api.root.addResource("leagues", {
    // defaultMethodOptions: {
    //     authorizer: telegramAuthorizer,
    //     authorizationType: AuthorizationType.CUSTOM,
    // },
    // defaultMethodOptions: {
    //     authorizationType: AuthorizationType.NONE,
    // },
});


//addMethod section
userPath.addMethod("GET", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
userPath.addMethod("POST", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
userPath.addMethod("DELETE", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
userPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

taskPath.addMethod("GET", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

levelUpPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
refillManaPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
claimTaskPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
joinTgChannelPath.addMethod("PUT", userIntegration, {
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
mintPath.addMethod("PUT", mintIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

portfolioPath.addMethod("GET", portfolioIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

packsPath.addMethod("PUT", packsIntegration, {
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

countersPath.addMethod("GET", countersIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

loginPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

battlePassPath.addMethod("PUT", userIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
packInfoPath.addMethod("GET", packInfoIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

upgradePath.addMethod("PUT", upgradeIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

leaderboardPath.addMethod("GET", leaderboardIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});
lbInfoPath.addMethod("GET", leaderboardIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

telegramstarsPath.addMethod("POST", telegramstarsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

invoicelinkPath.addMethod("POST", telegramstarsIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

mlTournamentPath.addMethod("POST", mlTournamentIntegration, {
    requestParameters: { "method.request.header.X-Telegram-Auth": true },
});

leaguePath.addMethod("GET", mlTournamentIntegration, {
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

packInfoPath.addProxy({
    anyMethod: true,
    defaultIntegration: packInfoIntegration,
});

leaderboardPath.addProxy({
    anyMethod: true,
    defaultIntegration: leaderboardIntegration,
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
