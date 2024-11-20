import mongoose from "mongoose";
import { tokenSchema } from "./tokenSchema";
export const tournamentSchema = new mongoose.Schema(
    {
        tournamentId: Number,
        tournamentStartSubmissionDate: Date,
        tournamentEndSubmissionDate: Date,
        positions: [String],
        usersJoined: [
            {
                userID: Number,
                tonWalletString: String,
                lineup: [tokenSchema],
                score: Number,
            },
        ],
    },
    {
        collection: "tournaments",
    }
);
