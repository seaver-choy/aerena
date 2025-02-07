export interface Token {
    tokenId: string;
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    amount?: string;
    packId: string;
    mintedAt: Date;
    star: number;
    statMultiplier: number;
    numAthletesNeededToUpgrade: number;
}

export interface UpgradeToken extends Token {
    isSelected: boolean;
}

export interface Friend {
    userID: number;
    username: string;
    isReferred: boolean;
}

export interface Quest {
    questId: number;
    isClaimed: boolean;
}

export interface Athlete {
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

export interface Tournament {
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
    prizeCurrency: string,
    joinCost: number,
}

export interface TournamentLineup {
    position: string;
    athlete: Token | null;
}

export interface BattlePass {
    level: number;
    basicReward: number;
    premReward: number;
    basicClaimed: false;
    premClaimed: false;
}

export interface PackInfo {
    packId: string;
    competitionType: string;
    packType: string;
    leagueType: string;
    isActive: boolean;
}

export interface InventoryItem {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
}

export interface Referral {
    userID: number;
    username: string;
    referralDate: Date;
}

export interface TeamColor {
    main: string;
    light: string;
    dark: string;
    accent: string;
    details: string;
    wave: string;
}
