import { MatchInfo, Team } from "../../../../helpers/interfaces";
import { GameStats } from "../GameStats";

interface GameDetailsProps {
    team: Team;
    teamStats: MatchInfo;
    league: string;
}

export const GameDetails = ({ team, teamStats, league }: GameDetailsProps) => {
    return (
        <div>
            <GameStats team={team} teamStats={teamStats} league={league} />
        </div>
    );
};
