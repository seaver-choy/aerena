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

export interface DreamTeamInfo {
    position: string;
    stocksLeft: number;
    canClaimAthlete: boolean;
    dreamOrderNum: string;
}

export interface CashPackInfo {
    value: number;
    stocksLeft: number;
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
export interface TaskStatus {
    level: number;
    tasks: Task[];
}

export interface Task {
    taskName: string;
    isClaimable: boolean;
    isDone: boolean;
}

export interface TaskDisplay {
    taskName: string;
    value: number | boolean;
    description: string;
    isClaimable: boolean;
    isDone: boolean;
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
    dreamTeam: boolean;
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
export interface LeagueCompetition {
    competitionType: string;
    leagueType: string;
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

export interface LeaderboardData {
    username: string;
    weeklyReferralCount: number;
    referrals: Referral[];
}

export interface LeaderboardInfo {
    leaderboardId: number;
    leaderboardStartDate: string;
    leaderboardEndDate: string;
}

export interface TeamColor {
    main: string;
    light: string;
    dark: string;
    accent: string;
    details: string;
    wave: string;
}
