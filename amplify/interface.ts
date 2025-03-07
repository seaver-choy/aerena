import mongoose from "mongoose";
export interface InventoryItem {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
}

export interface Token {
    tokenId: string;
    athleteId: number,
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    athleteScore: number;
    league: string;
    skin?: {
        skinId: string;
        teamData: {
            colors: {
                main: string;
                light: string;
                dark: string;
                wings: string;
                accent: string;
                details: string;
                wave: string;
            },
        },
    }
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

export interface Skin {
    skinId: string;
    athleteId: number;
    player: string;
    position: string[];
    league: string;
    type: string;
    teamData: {
        colors: {
            main: string;
            light: string;
            dark: string;
            accent: string;
            details: string;
            wave: string;
        };
    };
    isEquipped: boolean;
    packId: string;
    costType: string;
    savedAt: Date;
}

export interface Athlete {
    athleteId: number;
    player: string;
    team: string;
    position: [string];
    league: string;
    type: string;
}

export interface InventoryItem {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
}

export interface Quest {
    questId: number;
    isClaimed: boolean;
}
