import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import GameStatsSonner from "../../../../assets/sonner/stats-game.svg";
import StatsBackground from "../../../../assets/background/stats.svg";
import { MatchInfo, Team } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";
import { StatsDisplay } from "../../../../components/StatsDisplay";
interface GameStatsProps {
    team: Team;
    teamStats: MatchInfo;
}
export const GameStats = ({
    team = null,
    teamStats = null,
}: GameStatsProps) => {
    const [showGameStats, setShowGameStats] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGameStats(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        team != null &&
        teamStats != null && (
            <div className="y mx-[4vw] mt-[6vw] flex flex-col gap-[4vw]">
                {teamStats.players.map((player, index) =>
                    showGameStats ? (
                        <div key={index} className="flex flex-col gap-[2vw]">
                            <div className="flex h-[47.42vw] gap-[4vw] px-[2vw]">
                                <div>
                                    <motion.div
                                        className="h-[41.6vw] w-[32vw] overflow-hidden"
                                        {...appearCardAnimation}
                                    >
                                        <AthleteCard
                                            color={team.colors}
                                            ign={player.stats.player}
                                            opacity={{
                                                wave: team.colors.wave,
                                            }}
                                            role={player.position}
                                            type={"basic"}
                                            league={player.stats.league}
                                        />
                                    </motion.div>
                                </div>
                                <div className="flex h-[47.42vw] w-full flex-col gap-[2vw]">
                                    <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                                        <div className="flex gap-[2vw]">
                                            <StatsDisplay
                                                text="KILLS"
                                                value={player.stats.kills}
                                                fromGameTeamStats={true}
                                            />
                                            <StatsDisplay
                                                text="ASSISTS"
                                                value={player.stats.assists}
                                                fromGameTeamStats={true}
                                            />
                                        </div>
                                        <div className="flex gap-[2vw]">
                                            <StatsDisplay
                                                text="DEATHS"
                                                value={player.stats.deaths}
                                                fromGameTeamStats={true}
                                            />
                                            <StatsDisplay
                                                text="KP %"
                                                value={
                                                    player.stats
                                                        .killParticipation
                                                }
                                                fromGameTeamStats={true}
                                            />
                                        </div>
                                        <div className="flex gap-[2vw]">
                                            <StatsDisplay
                                                text="KDA"
                                                value={player.stats.kda}
                                                fromGameTeamStats={true}
                                            />
                                            <StatsDisplay
                                                text="POINTS"
                                                value={player.stats.points}
                                                fromGameTeamStats={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[47.42vw] bg-loading">
                            <motion.div
                                className="relative"
                                {...pulseAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={GameStatsSonner}
                                />
                            </motion.div>
                        </div>
                    )
                )}
            </div>
        )
    );
};
