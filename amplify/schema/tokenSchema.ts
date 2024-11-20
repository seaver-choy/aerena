import mongoose from "mongoose";

export const tokenSchema = new mongoose.Schema({
    tokenId: String,
    player: String,
    displayName: String,
    team: String,
    position: [String],
    img: String,
    star: Number,
    statMultiplier: Number,
});
