import { get, put, post } from "aws-amplify/api";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { DreamTeam, PackInfo, Skin } from "./interfaces";

export const submitLineup = async (
    tournamentId,
    userID,
    username,
    userLineup,
    lineupName,
    initDataRaw
) => {
    try {
        const submitLineup = {
            userID: userID,
            username: username,
            lineup: userLineup,
            lineupName: lineupName,
            score: 0,
            submittedAt: new Date(),
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

// export const mintApiPoints = async (
//     userId,
//     packInfo: PackInfo,
//     cost: number,
//     numPacks: number,
//     paymentType: string,
//     initDataRaw: string
// ) => {
//     try {
//         const newMint = {
//             userID: userId,
//             packType: packInfo.packType,
//             league: packInfo.leagueType,
//             type: packInfo.competitionType,
//             packId: packInfo.packId,
//             cost: cost,
//             numPacks: numPacks,
//             paymentType: paymentType,
//         };

//         const restOperation = put({
//             apiName: "playibleApi",
//             path: `mint`,
//             options: {
//                 headers: {
//                     "X-Telegram-Auth": `tma ${initDataRaw}`,
//                 },
//                 body: JSON.stringify(newMint),
//             },
//         });
//         const { body } = await restOperation.response;

//         const response = await body.text();
//         return JSON.parse(response);
//     } catch (e) {
//         console.log(`PUT call failed ${e}`);
//     }
// };

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
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET ongoing tournaments failed`);
    }
};

export const getLatestPreviousTournament = async (
    type: string,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/latestprevious?type=${type.toLowerCase()}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET previous latest tournament failed`);
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
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET friends failed`);
        return {};
    }
};

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
        return JSON.parse(response);
    } catch (e) {
        console.log(`Create user ${userId} failed ${e}`);
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
        return response;
    } catch (e) {
        console.log(e);
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
        return JSON.parse(data);
    } catch (e) {
        console.log(`Check Username failed ${e}`);
        const data = { message: "DUPLICATE" };
        return data;
    }
};

export const updateQuestField = async (userId, fieldName, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            fieldName: fieldName,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/updatequestfield",
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

export const getTeamInfo = async (
    teamKey: string,
    league: string,
    type: string,
    initDataRaw: string
) => {
    try {
        const queryParams = {
            teamKey: teamKey,
            league: league,
            type: type,
        };
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio/teams",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        console.log(response);
        //console.log(JSON.parse(response));
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getAthleteProfile = async (
    athleteId: number,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio/profile",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: {
                    athleteId: athleteId.toString(),
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getAthleteLatestSeasonAverageStats = async (
    athleteId: number,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `stats/${athleteId}/latest`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getAthleteAllTimeAverageMoontonStats = async (
    athleteId: number,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `stats/${athleteId}/moonton`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getAthleteStats = async (athleteId, league, day, initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `stats/${athleteId}/${league}/${day}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getAthleteLeagueStats = async (
    athleteId: number,
    type: string,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `stats/league/${type}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: {
                    athleteId: athleteId.toString(),
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getSameAthletes = async (
    athleteId: number,
    initDataRaw: string
) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `portfolio/sameathletes`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: {
                    athleteId: athleteId.toString(),
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

// export const getPackInfos = async (initDataRaw) => {
//     try {
//         const restOperation = get({
//             apiName: "playibleApi",
//             path: "packinfos/all",
//             options: {
//                 headers: {
//                     "X-Telegram-Auth": `tma ${initDataRaw}`,
//                 },
//             },
//         });

//         const { body } = await restOperation.response;

//         const response = await body.text();
//         return JSON.parse(response);
//     } catch (e) {
//         console.log(`Encountered error during GET of packinfos ${e}`);
//     }
// };

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
        return JSON.parse(response);
    } catch (e) {
        console.log(`GET athletes fail ${e}`);
    }
};

export const getAthleteChoices = async (
    league,
    boosterQuantity,
    initDataRaw
) => {
    try {
        const payload = {
            league: league,
            boosterQuantity: boosterQuantity,
        };
        const restOperation = post({
            apiName: "playibleApi",
            path: "mint",
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
        console.log(`GET athlete choices fail ${e}`);
    }
};

export const getAthletePositionFilter = async (
    position: string,
    league: string = "",
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
    leagueTypes: string[],
    initDataRaw: string
) => {
    try {
        const queryParams = {
            pageOffset: pageOffset.toString(),
            limit: limit.toString(),
            searchString: searchString,
            leagueTypes: leagueTypes.toString(),
            position: position,
        };
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio/paginated",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: queryParams,
            },
        });

        const { body } = await restOperation.response;

        const response = await body.json();
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

export const joinBasic = async (userId, bpCost, initDataRaw) => {
    try {
        const payload = {
            userID: userId,
            bpCost: bpCost,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: "user/joinbasic",
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

export const getTournamentResults = async (tournamentId, initDataRaw) => {
    try {
        console.log(tournamentId);
        const restOperation = get({
            apiName: "playibleApi",
            path: `tournaments/results?tournamentId=${tournamentId}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};

export const getTeamProfiles = async (initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "mltournaments/teamprofiles",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });

        const { body } = await restOperation.response;

        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(`Encountered error during GET of leagues ${e}`);
    }
};

export const saveDreamTeam = async (
    userId,
    dreamTeam: DreamTeam,
    initDataRaw
) => {
    try {
        const data = {
            userId: userId,
            dreamTeam: dreamTeam,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `user/savedreamteam`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(data),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`saveDreamTeam call failed ${e}`);
    }
};

export const checkReferralCode = async (referralCode, initDataRaw) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: `user/checkreferralcode?referralCode=${referralCode}`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
            },
        });
        const response = await restOperation.response;

        const data = await response.body.text();
        return JSON.parse(data);
    } catch (e) {
        console.log(`Check Referral Code failed ${e}`);
        const data = { message: "DNE" };
        return data;
    }
};

export const addNewReferral = async (userId, referralCode, initDataRaw) => {
    try {
        const data = {
            userId: userId,
            referralCode: referralCode,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `user/addnewreferral`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(data),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`addNewReferral call failed ${e}`);
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

export const saveSkin = async (userId, skin: Skin, initDataRaw) => {
    try {
        const data = {
            userId: userId,
            skin: skin,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `mint`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(data),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`saveSkin call failed ${e}`);
    }
};

export const getInvoiceLinkForExchangePacks = async (
    userId,
    packInfo: PackInfo,
    count,
    initDataRaw
) => {
    try {
        const newUser = {
            userId: userId,
            transactionType: "exchange_packs",
            packInfo: packInfo,
            count: count,
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
        return JSON.parse(response);
    } catch (e) {
        console.log(`Invoice for user ${userId} failed ${e}`);
    }
};

export const payBPForExchangePacks = async (
    userId,
    packInfo: PackInfo,
    count,
    initDataRaw
) => {
    try {
        const data = {
            userId: userId,
            packInfo: packInfo,
            count: count,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `user/paypacks`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(data),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`payBPForExchangePacks call failed ${e}`);
    }
};

export const equipSkin = async (userId, oldIndex, newIndex, initDataRaw) => {
    try {
        const data = {
            userId: userId,
            oldIndex: oldIndex,
            newIndex: newIndex,
        };

        const restOperation = put({
            apiName: "playibleApi",
            path: `user/equipskin`,
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                body: JSON.stringify(data),
            },
        });
        const { body } = await restOperation.response;

        const response = await body.text();
        console.log(response);
        return JSON.parse(response);
    } catch (e) {
        console.log(`equipSkin call failed ${e}`);
    }
};

export const getAthlete = async (athleteId: number, initDataRaw: string) => {
    try {
        const restOperation = get({
            apiName: "playibleApi",
            path: "portfolio/athlete",
            options: {
                headers: {
                    "X-Telegram-Auth": `tma ${initDataRaw}`,
                },
                queryParams: {
                    athleteId: athleteId.toString(),
                },
            },
        });

        const { body } = await restOperation.response;
        const response = await body.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
};
