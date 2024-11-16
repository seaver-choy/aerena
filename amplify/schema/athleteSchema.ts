import mongoose from "mongoose";

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
        dreamTeam: Boolean,
        img: String,
        numSeasonsPlayed: Number,
    },
    {
        collection: "athletes",
    }
);