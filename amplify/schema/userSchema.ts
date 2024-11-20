import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        tonWalletString: String,
        athletes: [
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
                }),
            },
        ],
    },
    {
        timestamps: true,
        collection: "users",
    }
);
