import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
} from "../../../helpers/animation";

import StatsBackground from "../../../assets/background/stats.svg";
import Sample from "../../../assets/card/sample.svg";

export const GameStats = () => {
    return (
        <div className="y mx-[4vw] mt-[6vw] flex flex-col gap-[4vw]">
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
                        {/* <div className="mt-[2vw] flex">
                            <div className="ml-[2vw] flex h-full w-[40%] items-center overflow-hidden">
                                <motion.div
                                    className="will-change-transform backface-hidden"
                                    {...appearAnimation}
                                >
                                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                                        ONIC PH
                                    </p>
                                </motion.div>
                            </div>
                            <div className="flex h-full w-[60%] justify-end">
                                <motion.button
                                    className="relative flex h-[7vw] justify-center"
                                    {...appearTextAnimation}
                                >
                                    <img className="h-full" src={GoldButton} />
                                    <div className="absolute flex h-full items-center">
                                        <p className="mt-[0.2vw] font-russoone text-[3vw] text-white">
                                            Full Stats
                                        </p>
                                    </div>
                                </motion.button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
