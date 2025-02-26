export interface Token {
    athleteId: number;
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    athleteScore: number;
    league: string;
}

export interface UpgradeToken extends Token {
    isSelected: boolean;
}

export interface Friend {
    userID: number;
    username: string;
    isReferred: boolean;
    addedDate: Date;
}

export interface Quest {
    questId: number;
    isClaimed: boolean;
}

export interface Athlete {
    athleteId: number;
    player: string;
    displayName: string;
    team: string;
    teamName: string;
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
export interface SameAthlete extends Athlete {
    teamData: {
        colors: TeamColor;
    };
    tournamentData: {
        endDate: Date;
    };
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
            lineupName: string;
            score: number;
        },
    ];
    prizeCurrency: string;
    joinCost: number;
    resultsTallied: boolean;
}

export interface TournamentLineup {
    position: string;
    athlete: Token | null;
}

export interface InventoryItem {
    key: string;
    type: string;
    isClaimed?: boolean;
    stock?: number;
}

export interface Team {
    teamId: number;
    name: string;
    key: string;
    colors: TeamColor;
    league: string;
    type: string;
    players: Token[];
}
export interface TeamColor {
    main: string;
    light: string;
    dark: string;
    wings: string;
    accent: string;
    details: string;
    wave: string;
}

export interface UsersJoined {
    username: string;
    lineup: Token[];
    lineupName: string;
    score: number;
}
export interface Ranking {
    score: number;
    users: UsersJoined[];
}

export interface Stats {
    player: string;
    team: string;
    kills: number;
    deaths: number;
    assists: number;
    isMVP: boolean;
    teamWon: boolean;
    game: number;
    day: number;
    match_id: string;
    league: string;
    competitionType: string;
}
export interface AverageStats {
    league?: string;
    averageKills: number;
    averageDeaths: number;
    averageAssists: number;
    averagePoints: number;
}

export interface AthleteProfile {
    athleteId: number;
    name: string;
    ign: string;
    country: string;
    birthday: string;
    alternateIgns: string[];
    latestTournament?: {
        code: string;
        endDate: Date;
    };
    latestPosition: string;
}

export interface TeamProfile {
    teamId: number;
    name: string;
    key: string;
    baseTeamColors: TeamColor;
    altName: string;
    country: string;
}

export interface DreamTeam {
    teamProfile: TeamProfile;
    lineup: Token[];
}
export interface Referrer {
    userID: number;
    referralCode: string;
    referralDate: Date;
}

export interface PackInfo {
    packId: string;
    packType: string;
    league: string;
    type: string;
    bpCost: number;
    starCost: number;
    isActive: boolean;
}