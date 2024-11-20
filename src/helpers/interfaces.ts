export interface Token {
    player: string;
    displayName: string;
    team: string;
    position: string[];
    img: string;
    mintedAt: Date;
    star: number;
    statMultiplier: number;
}

export interface TournamentLineup {
    position: string;
    athlete: Token | null;
}
