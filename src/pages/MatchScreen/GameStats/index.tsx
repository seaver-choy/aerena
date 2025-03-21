import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    pulseAnimation,
} from "../../../helpers/animation";

import GameStatsSonner from "../../../assets/sonner/stats-game.svg";
import StatsBackground from "../../../assets/background/stats.svg";
import Sample from "../../../assets/card/sample.svg";

export const GameStats = () => {
    const [showGameStats, setShowGameStats] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGameStats(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="y mx-[4vw] mt-[6vw] flex flex-col gap-[4vw]">
            {showGameStats ? (
                <div className="flex flex-col gap-[2vw]">
                    <div className="flex h-[47.42vw] gap-[4vw] px-[2vw]">
                        <div>
                            <motion.div
                                className="h-[41.6vw] w-[32vw] overflow-hidden"
                                {...appearCardAnimation}
                            >
                                <img className="h-full" src={Sample} />
                            </motion.div>
                        </div>
                        <div className="flex h-[47.42vw] w-full flex-col gap-[2vw]">
                            <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                                <div className="flex gap-[2vw]">
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    KILLS
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    ASSISTS
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                                <div className="flex gap-[2vw]">
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    DEATHS
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    KP %
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                                <div className="flex gap-[2vw]">
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    KDA
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="h-[13.14vw] w-[24vw] overflow-hidden"
                                        {...appearAnimation}
                                    >
                                        <div className="relative flex h-full w-full">
                                            <img
                                                className="h-full w-full will-change-transform backface-hidden"
                                                src={StatsBackground}
                                            />
                                            <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                                    POINTS
                                                </p>
                                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                                    0.00
                                                </motion.pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[47.42vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full w-full" src={GameStatsSonner} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
