import { MatchInfo, Team } from "../../../../helpers/interfaces";
import { GameStats } from "../GameStats";

interface GameDetailsProps {
    team: Team;
    teamStats: MatchInfo;
}

export const GameDetails = ({ team, teamStats }: GameDetailsProps) => {
    return (
        <div>
            <GameStats team={team} teamStats={teamStats} />
        </div>
    );
};
