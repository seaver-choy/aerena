export interface Token {
    athleteId: number;
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
            };
        };
        league: string;
    };
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
            submittedAt: Date;
        },
    ];
    prizeCurrency: string;
    joinCost: number;
    resultsTallied: boolean;
}

//For Athlete FullDetails page
export interface TournamentDetails {
    weeks: string[]; //or days, depending on tournament
    playoffs: boolean;
    matchType: string;
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
    submittedAt: Date;
}
export interface Ranking {
    score: number;
    users: UsersJoined[];
}

export interface MatchStats {
    athleteId: number;
    player: string;
    team: string;
    kills: number;
    deaths: number;
    assists: number;
    isMVP: boolean;
    teamWon: boolean;
    points: number;
    kda: number;
    killParticipation: number;
    game: number;
    day: number;
    match_id: string;
    league: string;
    competitionType: string;
}
export interface AthleteStats {
    league?: string;
    averageKills: number;
    totalKills: number;
    averageDeaths: number;
    totalDeaths: number;
    averageAssists: number;
    totalAssists: number;
    averagePoints: number;
    totalPoints: number;
    winRate: number;
    totalWins: number;
    mvpRate: number;
    totalMvps: number;
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

export interface Skin {
    skinId: string;
    athleteId: number;
    player: string;
    position: [string];
    team: string;
    league: string;
    type: string;
    teamData: {
        colors: TeamColor;
    };
    isEquipped: boolean;
    packId: string;
    costType: string;
    savedAt: Date;
}

export interface ScheduleInfo {
    match_id: string;
    league: string;
    boType: number;
    matchDate: Date;
    matchNumber: number;
    matchWeekName: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    week: number;
    day: number;
    matchType: string;
    playoffs: boolean;
}

export interface ScheduleGroup {
    league: string;
    week: number;
    schedules: ScheduleInfo[];
}

export interface MatchInfo {
    team: string;
    game: number;
    players: [
        {
            position: string;
            stats: MatchStats;
        },
    ];
}

export interface RankingInfo {
    athleteId: number;
    player: string;
    team: string;
    league: string;
    avgKills: number;
    totalKills: number;
    maxKills: number;
    avgDeaths: number;
    totalDeaths: number;
    maxDeaths: number;
    avgAssists: number;
    totalAssists: number;
    maxAssists: number;
    avgKDA: number;
    maxKDA: number;
    mvpCount: number;
    avgPoints: number;
    totalPoints: number;
    maxPoints: number;
    teamInfo: {
        colors: TeamColor;
        position: string[];
    };
}
