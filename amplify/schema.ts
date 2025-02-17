import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Schema } from "mongoose";

export const tokenSchema = new mongoose.Schema({
    athleteId: Number,
    player: String,
    displayName: String,
    team: String,
    position: [String],
    img: String,
    athleteScore: { type: Number, default: 0 },
    league: String,
});

export const athleteSchema = new mongoose.Schema(
    {
        player: String,
        displayName: String,
        team: String,
        totalKills: Number,
        avgKills: Number,
        totalDeaths: Number,
        avgDeaths: Number,
        totalAssists: Number,
        avgAssists: Number,
        kda: Number,
        killParticipation: Number,
        position: [String],
        img: String,
        numSeasonsPlayed: Number,
        league: String,
        type: String,
    },
    {
        collection: "athletes",
    }
);

export const teamSchema = new mongoose.Schema(
    {
        teamId: Number,
        name: String,
        key: String,
        colors: {
            main: String,
            light: String,
            dark: String,
            accent: String,
            details: String,
            wave: String,
        },
        league: String,
        type: String,
        players: [athleteSchema]
    },
    {
        collection: "teams",
    }
);

export const teamProfileSchema = new mongoose.Schema(
    {
        teamId: Number,
        name: String,
        key: String,
        baseTeamColors: {
            main: String,
            light: String,
            dark: String,
            accent: String,
            details: String,
            wave: String,
        },
        recentTournament: {
            code: String,
            endDate: Date,
        },
        country: String,
    },
    {
        collection: "teamprofiles",
    }
);


export const userSchema = new mongoose.Schema(
    {
        username: String,
        userID: Number,
        points: { type: Number, default: 0 },
        tokens: [
            {
                type: new mongoose.Schema({
                    tokenId: String,
                    player: String,
                    displayName: String,
                    team: String,
                    position: [String],
                    img: String,
                    packId: String,
                    mintedAt: { type: Date, default: new Date() },
                    star: { type: Number, default: 0 },
                    statMultiplier: { type: Number, default: 1 },
                    numAthletesNeededToUpgrade: { type: Number, default: 5 },
                }),
            },
        ],
        hasBoughtStarter: { type: Boolean, default: false },
        numBoosterBought: { type: Number, default: 0 },
        totalBoosterBought: { type: Number, default: 0 },
        friends: [
            {
                userID: Number,
                username: String,
                isReferred: { type: Boolean, default: false },
                referralDate: Date,
            },
        ],
        referralCount: { type: Number, default: 0 },
        joinedTournaments: { type: Number, default: 0 },
        hasWonTournament: { type: Boolean, default: false },
        // tonWalletConnected: { type: Boolean, default: false },
        joinedTgChannel: { type: Boolean, default: false },
        weeklyReferralCount: { type: Number, default: 0 },
        quests: [
            {
                questId: Number,
                isClaimed: Boolean,
            },
        ],
        pointsUpdatedAt: {
            type: Date,
            default: new Date(),
        },
        lastLoggedInAt: {
            type: Date,
            default: new Date(),
        },
        seasonalLogins: { type: Number, default: 0 },
        battlepass: [
            {
                level: Number,
                basicReward: Number,
                premReward: Schema.Types.Mixed,
                basicClaimed: { type: Boolean, default: false },
                premClaimed: { type: Boolean, default: false },
            },
        ],
        inventory: [
            {
                key: { type: String, required: true },
                type: { type: String, required: true },
                isClaimed: Boolean,
                stock: Number,
            },
        ],
        premiumMember: { type: Boolean, default: false },
        isNewDay: { type: Boolean, default: false },
        referralPurchases: { type: Number, default: 0 },
        oldPoints: { type: Number },
        oldTokens: [
            {
                type: new mongoose.Schema({
                    tokenId: String,
                    player: String,
                    displayName: String,
                    team: String,
                    position: [String],
                    img: String,
                    packId: String,
                }),
            },
        ],
        freeTempLineup: [
            {
                league: String,
                lineup: [tokenSchema],
            },
        ],
        premTempLineup: [
            {
                league: String,
                lineup: [tokenSchema],
            },
        ],
        dreamTeam: {
            type: {
                teamProfile: teamProfileSchema,
                lineup: [tokenSchema]
            },
            default: () => ({
                team: {},
                lineup: [],
            })
        },
        hasBeenReset: { type: Boolean },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

export const questSchema = new mongoose.Schema({
    questId: Number,
    tasks: [
        {
            taskName: String,
            value: mongoose.Schema.Types.Mixed,
            description: String,
            isWeekly: Boolean,
        },
    ],
    reward: Number,
});

export const tournamentSchema = new mongoose.Schema(
    {
        tournamentId: Number,
        tournamentName: String,
        tournamentStartSubmissionDate: Date,
        tournamentEndSubmissionDate: Date,
        positions: [String],
        league: String,
        type: String,
        prizePool: Number,
        prizeCurrency: String,
        joinCost: Number,
        usersJoined: [
            {
                userID: Number,
                username: String,
                lineup: [tokenSchema],
                score: Number,
            },
        ],
        resultsTallied: { type: Boolean, default: false },
    },
    {
        collection: "tournaments",
    }
);

tournamentSchema.plugin(paginate);

athleteSchema.plugin(paginate);

export const counterSchema = new mongoose.Schema(
    {
        tokenCounter: Number,
        cashPackInfo: [
            {
                value: Number,
                stocksLeft: Number,
            },
        ],
    },
    {
        collection: "counter",
    }
);

export const battlePassSchema = new mongoose.Schema(
    {
        season: Number,
        startDate: Date,
        endDate: Date,
        levels: [
            {
                level: { type: Number, required: true },
                basicReward: { type: Number, required: true },
                premReward: { type: Schema.Types.Mixed, required: true },
                //extraReward: { packTier: String }
            },
        ],
    },
    {
        collection: "battlepass",
    }
);

// old athleteStatsSchema
// export const athleteStatsSchema = new mongoose.Schema(
//     {
//         athleteId: Number,
//         player: String,
//         hero: String,
//         kill: Number,
//         death: Number,
//         assist: Number,
//         KDA: Number,
//         gold: Number,
//         hero_damage: Number,
//         damage_taken: Number,
//         tower_damage: Number,
//         game: Number,
//         match_id: String,
//         week: Number,
//         league: String,
//         type: String,
//     },
//     {
//         collection: "matchstats",
//     }
// );

export const athleteStatsSchema = new mongoose.Schema(
    {
        player: String,
        team: String,
        kills: Number,
        deaths: Number,
        assists: Number,
        isMVP: Boolean,
        teamWon: Boolean,
        game: Number,
        day: Number,
        match_id: String,
        league: String,
        competitionType: String,
    },
    {
        collection: "matchstats",
    }
);

export const packInfoSchema = new mongoose.Schema(
    {
        packId: String,
        competitionType: String,
        packType: String,
        leagueType: String,
        isActive: Boolean,
    },
    {
        collection: "packinfos",
    }
);

export const totalStatsSchema = new mongoose.Schema(
    {
        player: String,
        team: String,
        totalKills: Number,
        avgKills: Number,
        totalDeaths: Number,
        avgDeaths: Number,
        totalAssists: Number,
        avgAssists: Number,
        kda: Number,
        killParticipation: String,
    },
    {
        collection: "totalstats",
    }
);

export const starsTransactionSchema = new mongoose.Schema(
    {
        userId: { type: Number, required: true },
        updateId: { type: Number, required: true },
        // transactionId: { type: String, required: true},
        transactionInfo: { type: String, required: true },
        transactionType: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    {
        collection: "stars_transactions",
    }
);
export const colorSchema = new mongoose.Schema(
    {
        main: String,
        light: String,
        dark: String,
        wings: String,
        accent: String,
        details: String,
        wave: String,
    },
    {
        _id: false,
    }
);

export const mlTournamentSchema = new mongoose.Schema(
    {
        code: String,
        name: String,
        type: String,
        startDate: Date,
        endDate: Date,
        teams: [teamSchema],
    },
    {
        collection: "ml_tournaments",
    }
);
