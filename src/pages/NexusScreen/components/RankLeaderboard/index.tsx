import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsItemBackground from "../../../../assets/background/rankings-item.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import Sample from "../../../../assets/card/sample.svg";

export const RankLeaderboard = () => {
    return (
        <div className="relative mt-[6vw] flex h-[96.3vw] justify-center">
            <img
                className="h-full w-full"
                src={RankingsLeaderBoardBackground}
            />
            <motion.div className="absolute top-[12vw] flex flex-col justify-center">
                <p className="text-center font-russoone text-[7vw] text-white">
                    ASSISTS
                </p>
                <p className="-mt-[2vw] text-center font-russoone text-[4vw] text-white">
                    IN A GAME
                </p>
            </motion.div>
            <div className="absolute top-[29vw] flex flex-col gap-[2vw]">
                <div className="my-[2vw] flex h-[50vw] gap-[4vw] px-[2vw]">
                    <div>
                        <motion.div
                            className="h-[41.6vw] w-[32vw] overflow-hidden"
                            {...appearCardAnimation}
                        >
                            <img className="h-full" src={Sample} />
                        </motion.div>
                    </div>
                    <div className="flex w-[50vw] flex-col gap-[1vw]">
                        <motion.div
                            className="relative flex h-[7vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3vw] text-white">
                                        1
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        SPIDER MILEZ
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        00.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[7vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3vw] text-white">
                                        2
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        MP THE KING
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        00.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[7vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3vw] text-white">
                                        3
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        KENNYZYSKIEE
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        100
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[7vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3vw] text-white">
                                        4
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        AERONNSHIKII
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        0.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[7vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3vw] text-white">
                                        5
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        SUPER FRINCE
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        0.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[3vw] flex justify-center"
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
                </div>
            </div>
        </div>
    );
};
