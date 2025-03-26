import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsLeaderboardSonner from "../../../../assets/sonner/rankings-leaderboard.svg";
import StatsBackground from "../../../../assets/background/stats.svg";
import { RankingInfo } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";

interface RankLeaderboardProps {
    rankingsTab: string;
    rankingStats: RankingInfo[];
    statType: string;
}
export const RankLeaderboard = ({
    rankingsTab = null,
    rankingStats = null,
    statType = null,
}: RankLeaderboardProps) => {
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

    useEffect(() => {
        setShowLeaderboard(false);
        const timer = setTimeout(() => {
            setShowLeaderboard(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [rankingStats]);

    const processText = (rankingStat: RankingInfo) => {
        switch (rankingsTab) {
            case "Kills":
                if (statType == "Average")
                    return rankingStat.avgKills.toFixed(2);
                else if (statType == "Total") return rankingStat.totalKills;
                else if (statType == "Max") return rankingStat.maxKills;
                else return 0.0;
            case "Deaths":
                if (statType == "Average")
                    return rankingStat.avgDeaths.toFixed(2);
                else if (statType == "Total") return rankingStat.totalDeaths;
                else if (statType == "Max") return rankingStat.maxDeaths;
                else return 0.0;
            case "Assists":
                if (statType == "Average")
                    return rankingStat.avgAssists.toFixed(2);
                else if (statType == "Total") return rankingStat.totalAssists;
                else if (statType == "Max") return rankingStat.maxAssists;
                else return 0.0;
            case "KDA":
                if (statType == "Average") return rankingStat.avgKDA.toFixed(2);
                else if (statType == "Total") return rankingStat.totalKDA;
                else if (statType == "Max") return rankingStat.maxKDA;
                else return 0.0;
            case "MVP":
                return rankingStat.mvpCount;
            case "Points":
                if (statType == "Average")
                    return rankingStat.avgPoints.toFixed(2);
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
                                            <motion.div
                                                className="h-[11vw] w-[20vw] overflow-hidden"
                                                {...appearAnimation}
                                            >
                                                <div className="relative flex h-full w-full">
                                                    <img
                                                        className="h-full w-full will-change-transform backface-hidden"
                                                        src={StatsBackground}
                                                    />
                                                    <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                        <p className="mt-[1.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent will-change-transform backface-hidden">
                                                            {rankingsTab}
                                                        </p>
                                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                                            {processText(
                                                                rankingStat
                                                            )}
                                                        </motion.pre>
                                                    </div>
                                                </div>
                                            </motion.div>
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
