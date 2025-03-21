import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
} from "../../../helpers/animation";
import { getBaseTeamColor } from "../../../helpers/athletes";
import { TeamCard } from "../../../components/TeamCard";

import StatsBackground from "../../../assets/background/stats.svg";

export const GameSummary = () => {
    const color = {
        main: getBaseTeamColor().main,
        light: getBaseTeamColor().light,
        dark: getBaseTeamColor().dark,
        wings: getBaseTeamColor().wings,
        accent: getBaseTeamColor().accent,
        details: getBaseTeamColor().details,
        wave: getBaseTeamColor().wave,
    };

    return (
        <div className="y mx-[4vw] mt-[8vw] flex w-full flex-row">
            <div className="flex w-[46vw] flex-col items-center gap-[4vw] px-[2vw]">
                <motion.div
                    className="h-[14vw] w-[36vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <TeamCard color={color} team={"ANRCHY"} />
                </motion.div>
                <motion.div className="-mt-[3vw]" {...appearTextAnimation}>
                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                        VICTORY
                    </p>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                KILLS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                DEATHS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                ASSISTS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="flex w-[46vw] flex-col items-center gap-[4vw] px-[2vw]">
                <motion.div
                    className="h-[14vw] w-[36vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <TeamCard color={color} team={"ANRCHY"} />
                </motion.div>
                <motion.div className="-mt-[3vw]" {...appearTextAnimation}>
                    <p className="font-russoone text-[4vw] font-normal text-gray opacity-50 will-change-transform backface-hidden">
                        DEFEAT
                    </p>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                KILLS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                DEATHS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="h-[16.5vw] w-[30vw] overflow-hidden"
                    {...appearAnimation}
                >
                    <div className="relative flex h-full w-full">
                        <img
                            className="h-full w-full will-change-transform backface-hidden"
                            src={StatsBackground}
                        />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                ASSISTS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5.5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
