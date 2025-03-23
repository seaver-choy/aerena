import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../helpers/animation";
import { getBaseTeamColor } from "../../../helpers/athletes";
import { TeamCard } from "../../../components/TeamCard";

import GameSummaryBackground from "../../../assets/background/game-summary.svg";
import GameSummarySonner from "../../../assets/sonner/game-summary.svg";
import StatsBackground from "../../../assets/background/stats.svg";

export const GameSummary = () => {
    const [showGameSummary, setShowGameSummary] = useState<boolean>(false);

    const color = {
        main: getBaseTeamColor().main,
        light: getBaseTeamColor().light,
        dark: getBaseTeamColor().dark,
        wings: getBaseTeamColor().wings,
        accent: getBaseTeamColor().accent,
        details: getBaseTeamColor().details,
        wave: getBaseTeamColor().wave,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGameSummary(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
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
                            <TeamCard color={color} team={"ANRCHY"} />
                        </motion.div>
                        <motion.div
                            className="mt-[2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                VICTORY
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        KILLS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        DEATHS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        ASSISTS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute right-[4vw] flex h-full w-[46vw] flex-col items-center pt-[14vw]">
                        <motion.div
                            className="h-[14vw] w-[36vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <TeamCard color={color} team={"ANRCHY"} />
                        </motion.div>
                        <motion.div
                            className="mt-[2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="font-russoone text-[4vw] font-normal text-gray opacity-50 will-change-transform backface-hidden">
                                DEFEAT
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        KILLS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        DEATHS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[4.4vw] h-[17.5vw] w-[32vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <div className="relative flex h-full w-full">
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={StatsBackground}
                                />
                                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent will-change-transform backface-hidden">
                                        ASSISTS
                                    </p>
                                    <motion.pre className="-mt-[1.5vw] font-russoone text-[5.5vw] font-normal text-white">
                                        0.00
                                    </motion.pre>
                                </div>
                            </div>
                        </motion.div>
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
    );
};
