import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsLeaderboardSonner from "../../../../assets/sonner/rankings-leaderboard.svg";
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
                if (statType == "Average") return rankingStat.avgKills;
                else if (statType == "Total") return rankingStat.totalKills;
                else if (statType == "Max") return rankingStat.maxKills;
                else return 0.0;
            case "Assists":
                if (statType == "Average") return rankingStat.avgAssists;
                else if (statType == "Total") return rankingStat.totalAssists;
                else if (statType == "Max") return rankingStat.maxAssists;
                else return 0.0;
            case "KDA":
                if (statType == "Average") return rankingStat.avgKDA;
                else if (statType == "Max") return rankingStat.maxKDA;
                else return 0.0;
            case "MVP":
                return rankingStat.mvpCount;
            case "Points":
                if (statType == "Average") return rankingStat.avgPoints;
                else if (statType == "Total") return rankingStat.totalPoints;
                else if (statType == "Max") return rankingStat.maxPoints;
                else return 0.0;
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
                                {rankingStats
                                    .splice(0, 5)
                                    .map((rankingStat, index) => (
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
                                                        rankingStat.teamInfo
                                                            .colors
                                                    }
                                                    ign={rankingStat.player}
                                                    opacity={{
                                                        wave: rankingStat
                                                            .teamInfo.colors
                                                            .wave,
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
