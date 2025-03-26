import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsLeaderboardSonner from "../../../../assets/sonner/rankings-leaderboard.svg";
import StatsBackground from "../../../../assets/background/stats.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import Sample from "../../../../assets/card/sample.svg";

export const RankLeaderboard = () => {
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLeaderboard(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-[4vw] h-[138.1vw]">
            {showLeaderboard ? (
                <div className="relative flex justify-center">
                    <img
                        className="h-full w-full"
                        src={RankingsLeaderBoardBackground}
                    />
                    <div className="absolute top-[13vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...appearCardAnimation}
                            >
                                <img className="h-full w-full" src={Sample} />
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
                                            ASSISTS
                                        </p>
                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                            0.00
                                        </motion.pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...appearCardAnimation}
                            >
                                <img className="h-full w-full" src={Sample} />
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
                                            ASSISTS
                                        </p>
                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                            0.00
                                        </motion.pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...appearCardAnimation}
                            >
                                <img className="h-full w-full" src={Sample} />
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
                                            ASSISTS
                                        </p>
                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                            0.00
                                        </motion.pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...appearCardAnimation}
                            >
                                <img className="h-full w-full" src={Sample} />
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
                                            ASSISTS
                                        </p>
                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                            0.00
                                        </motion.pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...appearCardAnimation}
                            >
                                <img className="h-full w-full" src={Sample} />
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
                                            ASSISTS
                                        </p>
                                        <motion.pre className="-mt-[1vw] font-russoone text-[4.2vw] font-normal text-white">
                                            0.00
                                        </motion.pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div
                        className="absolute bottom-[12vw] mt-[2vw] flex justify-center"
                        {...appearTextAnimation}
                    >
                        <button className="relative flex h-[7vw] justify-center">
                            <img className="h-full" src={GoldButton} />
                            <div className="absolute flex h-full w-full items-center justify-center">
                                <p className="font-russoone text-[2.8vw] font-normal text-white">
                                    View All
                                </p>
                            </div>
                        </button>
                    </motion.div>
                </div>
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
    );
};
