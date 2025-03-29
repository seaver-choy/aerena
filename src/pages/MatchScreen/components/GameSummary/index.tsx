import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { TeamCard } from "../../../../components/TeamCard";

import GameSummaryBackground from "../../../../assets/background/game-summary.svg";
import GameSummarySonner from "../../../../assets/sonner/game-summary.svg";
import { MatchInfo, ScheduleInfo, Team } from "../../../../helpers/interfaces";
import { StatsDisplay } from "../../../../components/StatsDisplay";

interface GameSummaryProps {
    team1: Team;
    team2: Team;
    team1Stats: MatchInfo;
    team2Stats: MatchInfo;
    schedule: ScheduleInfo;
}

export const GameSummary = ({
    team1 = null,
    team2 = null,
    team1Stats = null,
    team2Stats = null,
    schedule = null,
}: GameSummaryProps) => {
    const [showGameSummary, setShowGameSummary] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGameSummary(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        team1Stats != null &&
        team2Stats != null && (
            <div className="mt-[6vw]">
                {showGameSummary ? (
                    <div className="relative flex h-[115vw]">
                        <img
                            className="h-full w-full"
                            src={GameSummaryBackground}
                        />
                        <div className="absolute left-[4vw] flex h-full w-[46vw] flex-col items-center pt-[14vw]">
                            <motion.div
                                className="h-[14vw] w-[36vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <TeamCard
                                    color={team1.colors}
                                    team={schedule.team1}
                                />
                            </motion.div>
                            <motion.div
                                className="mt-[2vw]"
                                {...appearTextAnimation}
                            >
                                {schedule.score1 == schedule.boType - 1 ? (
                                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                        VICTORY
                                    </p>
                                ) : (
                                    <p className="font-russoone text-[4vw] font-normal text-white opacity-50 will-change-transform backface-hidden">
                                        DEFEAT
                                    </p>
                                )}
                            </motion.div>
                            <StatsDisplay
                                text="KILLS"
                                value={team1Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.kills || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                            <StatsDisplay
                                text="DEATHS"
                                value={team1Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.deaths || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                            <StatsDisplay
                                text="ASSISTS"
                                value={team1Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.assists || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                        </div>
                        <div className="absolute right-[4vw] flex h-full w-[46vw] flex-col items-center pt-[14vw]">
                            <motion.div
                                className="h-[14vw] w-[36vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <TeamCard
                                    color={team2.colors}
                                    team={schedule.team2}
                                />
                            </motion.div>
                            <motion.div
                                className="mt-[2vw]"
                                {...appearTextAnimation}
                            >
                                {schedule.score2 == schedule.boType - 1 ? (
                                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                        VICTORY
                                    </p>
                                ) : (
                                    <p className="font-russoone text-[4vw] font-normal text-white opacity-50 will-change-transform backface-hidden">
                                        DEFEAT
                                    </p>
                                )}
                            </motion.div>
                            <StatsDisplay
                                text="KILLS"
                                value={team2Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.kills || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                            <StatsDisplay
                                text="DEATHS"
                                value={team2Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.deaths || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                            <StatsDisplay
                                text="ASSISTS"
                                value={team2Stats.players.reduce(
                                    (sum, player) =>
                                        sum + (player.stats?.assists || 0),
                                    0
                                )}
                                fromMatchScreen={true}
                                isTotal={true}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="h-[115vw] bg-loading">
                        <motion.div className="relative" {...pulseAnimation}>
                            <img
                                className="h-full w-full"
                                src={GameSummarySonner}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        )
    );
};
