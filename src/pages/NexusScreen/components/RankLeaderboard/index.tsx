import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsLeaderboardSonner from "../../../../assets/sonner/rankings-leaderboard.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import { RankingInfo } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";
import { StatsDisplay } from "../../../../components/StatsDisplay";

interface RankLeaderboardProps {
    rankingsTab: string;
    rankingStats: RankingInfo[];
    statType: string;
    showLeaderboard: boolean;
}
export const RankLeaderboard = ({
    rankingsTab = null,
    rankingStats = null,
    statType = null,
    showLeaderboard = false,
}: RankLeaderboardProps) => {
    const processText = (rankingStat: RankingInfo) => {
        switch (rankingsTab) {
            case "Kills":
                return rankingStat.kills;
            case "Assists":
                return rankingStat.assists;
            case "KDA":
                return rankingStat.kda;
            case "MVP":
                return rankingStat.mvpCount;
            case "Points":
                return rankingStat.points;
            default:
                return 0.0;
        }
    };

    return (
        rankingStats != null && (
            <div className="mt-[4vw] h-[138.1vw]">
                {showLeaderboard ? (
                    rankingStats != null && (
                        <div className="relative flex justify-center">
                            <img
                                className="h-full w-full"
                                src={RankingsLeaderBoardBackground}
                            />
                            <div className="absolute top-[13vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
                                {rankingStats.map((rankingStat, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center"
                                    >
                                        <motion.div
                                            className="relative flex h-[36.4vw] w-[28vw]"
                                            {...appearCardAnimation}
                                        >
                                            <AthleteCard
                                                color={
                                                    rankingStat.teamInfo.colors
                                                }
                                                ign={rankingStat.player}
                                                opacity={{
                                                    wave: rankingStat.teamInfo
                                                        .colors.wave,
                                                }}
                                                role={
                                                    rankingStat.teamInfo
                                                        .position[0]
                                                }
                                                type={"basic"}
                                                league={rankingStat.league}
                                            />
                                        </motion.div>
                                        <StatsDisplay
                                            text={rankingsTab.toUpperCase()}
                                            value={processText(rankingStat)}
                                            fromRankings={true}
                                            isTotal={
                                                statType == "Total" ||
                                                (rankingsTab != "KDA" &&
                                                    statType == "Max")
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                className="absolute bottom-[12vw] mt-[2vw] flex justify-center"
                                {...appearTextAnimation}
                            >
                                <button
                                    className="relative flex h-[7vw] justify-center"
                                    disabled
                                >
                                    <img className="h-full" src={GoldButton} />
                                    <div className="absolute flex h-full w-full items-center justify-center">
                                        <p className="font-russoone text-[2.8vw] font-normal text-white opacity-50">
                                            View All
                                        </p>
                                    </div>
                                </button>
                            </motion.div>
                        </div>
                    )
                ) : (
                    <div className="h-[138.1vw] bg-loading">
                        <motion.div className="relative" {...pulseAnimation}>
                            <img
                                className="h-full w-full"
                                src={RankingsLeaderboardSonner}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        )
    );
};
