import mongoose from "mongoose";
export interface InventoryItem {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
}

export interface Token {
    tokenId: string;
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    amount?: string;
    packId: string;
}

export interface AthleteDocument extends mongoose.Document, AthleteData {}
interface AthleteData {
    player: string;
    displayName: string;
    team: string;
    totalKills: number;
    avgKills: number;
    totalDeaths: number;
    avgDeaths: number;
    totalAssists: number;
    avgAssists: number;
    killParticipation: number;
    position: [string];
    img: string;
    numSeasonsPlayed: number;
    league: string;
    type: string;
}

export interface TournamentDocument extends mongoose.Document, TournamentData {}
interface TournamentData {
    tournamentId: number;
    tournamentName: string;
    tournamentStartSubmissionDate: Date;
    tournamentEndSubmissionDate: Date;
    positions: string[];
    league: string;
    type: string;
    prizePool: number;
    usersJoined: [
        {
            username: string;
            lineup: Token[];
            score: number;
        },
    ];
}
