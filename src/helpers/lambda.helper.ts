import { get, put, post } from "aws-amplify/api";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { PackInfo } from "./interfaces";

export const submitLineup = async (
    tournamentId,
    userID,
    username,
    userLineup,
    initDataRaw
) => {
    try {
        const submitLineup = {
            userID: userID,
            username: username,
            lineup: userLineup,
            score: 0,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `tournaments/${tournamentId}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(submitLineup),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();

        return JSON.parse(response);
    } catch (e) {
        console.log(`POST call failed ${e}`);
    }
};

export const mintApiPoints = async (
    userId,
    packInfo: PackInfo,
    cost: number,
    numPacks: number,
    paymentType: string,
    initDataRaw: string
) => {
    try {
        const newMint = {
            userID: userId,
            packType: packInfo.packType,
            league: packInfo.leagueType,
            type: packInfo.competitionType,
            packId: packInfo.packId,
            cost: cost,
            numPacks: numPacks,
            paymentType: paymentType,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `mint`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(newMint),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log("PUT call success, minted");
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`PUT call failed ${e}`);
    }
};

export const getTournament = async (tournamentId, initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/${tournamentId}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`GET tournament ${tournamentId} success`);
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET tournament ${tournamentId} failed`);
    }
};

export const getOngoingTournaments = async (
    type: string,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/ongoing?type=${type.toLowerCase()}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`GET ongoing tournaments success`);
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET ongoing tournaments failed`);
    }
};

export const getPreviousTournaments = async (
    type: string,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/previous?type=${type.toLowerCase()}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`GET previous tournaments success`);
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET previous tournaments failed`);
    }
};

export const getUpcomingTournaments = async (
    type: string,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/upcoming?type=${type.toLowerCase()}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`GET upcoming tournaments success`);
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET upcoming tournaments failed`);
    }
};

export const getPortfolioApi = async (userId, position) => {
    try {
        const { initDataRaw } = retrieveLaunchParams();

        const queryParams = {
            userId: userId,
            position: position,
        };

        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;

        const response = await body.json();
        console.log(`GET portfolio`);
        console.log(response);
    } catch (e) {
        console.log(`GET portfolio failed ${e}`);
    }
};

export const updateUserPacks = async (userId, packType) => {
    try {
        const { initDataRaw } = retrieveLaunchParams();

        const queryParams = {
            userId: userId,
            packType: packType,
            initData: encodeURIComponent(initDataRaw),
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "packs",
            options: {
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;

        const response = await body.json();
        console.log(`Successful update on user packs`);
        console.log(response);
    } catch (e) {
        console.log(`Update user packs failed ${e}`);
    }
};

export const getFriends = async (userId, initDataRaw) => {
    try {
        const queryParams = {
            userId: userId,
        };

        const restOperation = get({
            apiName: "playibleApi",
            path: "friends",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(`GET request success for friends`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET friends failed`);
        return {};
    }
};

// export const updateReferrals = async (username, referral) => {
//     try {
//         const { initDataRaw } = retrieveLaunchParams();

//         const queryParams = {
//             username: username,
//             initData: encodeURIComponent(initDataRaw),
//         };

//         const restOperation = put({
//             apiName: "playibleApi",
//             path: "referrals",
//             options: {
//                 queryParams: queryParams,
//                 body: JSON.stringify(referral),
//             },
//         });

//         const { body } = await restOperation.response;

//         const response = await body.json();
//         console.log(`Success update of referrals for ${username}`);
//         console.log(response);
//     } catch (e) {
//         console.log(`Update referral failed for ${username}`);
//     }
// };

export const createUser = async (
    userId,
    username,
    isReferred,
    referredBy,
    initDataRaw
) => {
    try {
        const newUser = {
            userID: userId,
            username: username,
            isReferred: isReferred,
            referredBy: referredBy,
        };
        const restOperation = post({
            apiName: "playibleApi",
            path: "user",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(newUser),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`Succesful creation of new user ${userId}`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Create user ${userId} failed ${e}`);
    }
};

export const levelUp = async (level, userId, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            level: level,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/levelup",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const refillMana = async (userId, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/refill",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const claimQuest = async (userId, questId, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            questId: questId,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/quests",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getTasks = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "user/tasks",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        //console.log(JSON.parse(response.toLocaleString()));
        console.log(`Successful GET of tasks`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Encountered error during GET of tasks ${e}`);
    }
};

export const getQuests = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "user/quests",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();

        const quests = JSON.parse(response);
        console.log(quests);
        return quests;
    } catch (e) {
        console.log(`Encountered error during GET of quests ${e}`);
    }
};

export const checkUsernameExists = async (username, initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `user/checkUsername?username=${username}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });
        const response = await restOperation.response;

        const data = await response.body.text();
        console.log(JSON.parse(data));
        return JSON.parse(data);
    } catch (e) {
        console.log(`Check Username failed ${e}`);
        const data = { message: "DUPLICATE" };
        return data;
    }
};

export const claimTask = async (userId, level, taskName, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            level: level,
            taskName,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/claimTask",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const joinTgChannel = async (userId, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/joinTgChannel",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};
export const getCashPackInfo = async () => {
    try {
        const { initDataRaw } = retrieveLaunchParams();

        const queryParams = {
            initData: encodeURIComponent(initDataRaw),
        };

        const restOperation = get({
            apiName: "playibleApi",
            path: "counters",
            options: {
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const login = async (userID, initDataRaw) => {
    try {
        console.log(userID);
        const payload = {
            userID: userID,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/login",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const claimReward = async (userID, bpLevel, isPremium, initDataRaw) => {
    try {
        const payload = {
            userID: userID,
            bpLevel: bpLevel,
            isPremium: isPremium,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/battlepass",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

// export const getAthleteAllStats = async (playerName, league) => {
//     try {
//         const { initDataRaw } = retrieveLaunchParams();
//         const queryParams = {
//             initData: encodeURIComponent(initDataRaw),
//         };

//         const restOperation = get({
//             apiName: "playibleApi",
//             path: `stats/${encodeURIComponent(playerName)}/${league}/all`,
//             options: {
//                 queryParams: queryParams,
//             },
//         });

//         const { body } = await restOperation.response;
//         const response = await body.text();
//         console.log(response);
//         return JSON.parse(response);
//     } catch (e) {
//         console.log(e);
//     }
// };

export const getAthleteStats = async (
    playerName,
    league,
    week,
    initDataRaw
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `stats/${encodeURIComponent(playerName)}/${league}/${week}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getPackInfos = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "packinfos/all",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        // console.log(JSON.parse(response.toLocaleString()));
        console.log(`Successful GET of packinfos`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Encountered error during GET of packinfos ${e}`);
    }
};

export const getLeagues = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "mltournaments/leagues",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        // console.log(JSON.parse(response.toLocaleString()));
        console.log(`Successful GET of leagues`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Encountered error during GET of leagues ${e}`);
    }
};

export const getAthletes = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "mint",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log("GET athletes success");
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET athletes fail ${e}`);
    }
};

export const getAthletePositionFilter = async (
    position: string,
    league: string,
    initDataRaw: string
) => {
    try {
        const queryParams = {
            position: position,
            league,
        };
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        console.log("GET athletes position filtered success");
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET athletes position filtered fail ${e}`);
    }
};
export const upgradeAthlete = async (
    userID,
    baseToken,
    baseIndex,
    feedTokens,
    initDataRaw
) => {
    try {
        const payload = {
            userID: userID,
            baseToken: baseToken,
            baseIndex: baseIndex,
            feedTokens,
        };
        const restOperation = put({
            apiName: "playibleApi",
            path: "upgrade",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();

        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getLeaderboard = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "leaderboard",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(`GET request success for leaderboard`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET leaderboard failed`);
        return {};
    }
};

export const getCurrentLeaderboardInfo = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "leaderboard/lbinfo",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(`GET request success for leaderboard info`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET leaderboard info failed`);
        return {};
    }
};

export const getInvoiceLinkForPremiumTournament = async (
    userId,
    transactionType,
    tournamentId,
    amount,
    initDataRaw
) => {
    try {
        const newUser = {
            userId: userId,
            transactionType: transactionType,
            tournamentId: tournamentId,
            amount: amount,
        };
        const restOperation = post({
            apiName: "playibleApi",
            path: "telegramstars/invoice",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(newUser),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`Invoice for user ${userId}`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Invoice for user ${userId} failed ${e}`);
    }
};

export const saveStarsTransaction = async (
    userId,
    updateId,
    // transactionId,
    transactionInfo,
    transactionType,
    amount,
    initDataRaw
) => {
    try {
        const newUser = {
            userId: userId,
            updateId: updateId,
            // transactionId: transactionId,
            transactionInfo: transactionInfo,
            transactionType: transactionType,
            amount: amount,
        };
        const restOperation = post({
            apiName: "playibleApi",
            path: "telegramstars",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(newUser),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(`Stars transaction for user ${userId}`);
        return JSON.parse(response);
    } catch (e) {
        console.log(`Stars transaction for user ${userId} failed ${e}`);
    }
};

export const getAthletePaginated = async (
    pageOffset: number,
    limit: number,
    searchString: string,
    position: string,
    initDataRaw: string
) => {
    try {
        const queryParams = {
            pageOffset: pageOffset.toString(),
            limit: limit.toString(),
            searchString: searchString,
            position: position,
        };
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;

        const response = await body.json();
        console.log("GET Paginated");
        console.log(response);

        return JSON.parse(JSON.stringify(response));
    } catch (e) {
        console.log(`GET Paginated Request Failed`);
    }
};

export const getLineupPaginated = async (
    pageOffset: number,
    limit: number,
    tournamentId: number,
    initDataRaw: string
) => {
    try {
        const queryParams = {
            tournamentId: tournamentId.toString(),
            pageOffset: pageOffset.toString(),
            limit: limit.toString(),
        };
        const restOperation = get({
            apiName: "playibleApi",
            path: "tournaments/lineups",
            options: {
                queryParams: queryParams,
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);

        return JSON.parse(JSON.stringify(response));
    } catch (e) {
        console.log(`GET Tournament Lineup Pagination Request FAILED`);
    }
};

export const getLuckyPicks = async (league: string, initDataRaw: string) => {
    
    const queryParams = {
        league,
    };
    const restOperation = get({
        apiName: "playibleApi",
        path: "tournaments/randomize",
        options: {
            headers: {
                "X-Telegram-Auth": `tma ${initDataRaw}`,
            },
            queryParams: queryParams,
        },
    });

    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response);
    return JSON.parse(JSON.stringify(response));
};

export const updateTempLineup = async (
    userID: number,
    action: string,
    type: string,
    league: string,
    initDataRaw: string
) => {
    try {
        const payload = {
            userID: userID,
            action: action,
            type: type,
            league: league,
        };
        const restOperation = put({
            apiName: "playibleApi",
            path: "user/templineup",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();

        return JSON.parse(response);
    } catch (e) {
        console.log(`Update Temp Lineup Failed with action ${action}`);
        console.log(e);
    }
};

export const joinFree = async (userId, bpCost, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            bpCost: bpCost,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/joinfree",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(payload),
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};
