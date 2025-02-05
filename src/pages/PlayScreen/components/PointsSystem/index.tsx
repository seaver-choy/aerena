import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";

import PointsSystemBackground from "../../../../assets/background/points-system.svg";
import PointsSystemOneBackground from "../../../../assets/background/points-system-one.svg";
import PointsSystemTwoBackground from "../../../../assets/background/points-system-two.svg";
import PointsSystemThreeBackground from "../../../../assets/background/points-system-three.svg";
import PointsSystemFourBackground from "../../../../assets/background/points-system-four.svg";
import PointsSystemFiveBackground from "../../../../assets/background/points-system-five.svg";

export const PointsSystem = () => {
    return (
        <div>
            <div className="mt-[8vw] h-[41.3vw]">
                <div className="relative flex items-center justify-center">
                    <img
                        className="h-full w-full"
                        src={PointsSystemBackground}
                    />
                    <div className="absolute flex h-[25vw] w-[70vw] flex-col items-center justify-center">
                        <motion.p
                            className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[10vw] font-bold text-transparent"
                            {...appearTextAnimation}
                        >
                            POINTS
                        </motion.p>
                        <motion.p
                            className="-mt-[5vw] font-russoone text-[9.5vw] font-bold text-white"
                            {...appearTextAnimation}
                        >
                            SYSTEM
                        </motion.p>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] h-[38.7vw] bg-graydark">
                <div className="relative">
                    <img
                        className="h-full w-full"
                        src={PointsSystemOneBackground}
                    />
                    <div className="absolute bottom-[3.1vw] left-[3.3vw] flex h-[12.6vw] gap-[2vw]">
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    KILL
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2.2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +2 POINTS
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    DEATH
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2.2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    -1 POINT
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    ASSIST
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2.2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +1 POINT
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] h-[39vw] bg-graydark">
                <div className="relative">
                    <img
                        className="h-full w-full"
                        src={PointsSystemTwoBackground}
                    />
                    <div className="absolute bottom-[4.2vw] left-[3.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                {...appearTextAnimation}
                            >
                                GAME MVP
                            </motion.p>
                        </div>
                    </div>
                    <div className="absolute bottom-[4.2vw] left-[22.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mr-[0.5vw] mt-[0.2vw] font-russoone text-[2.2vw] text-white"
                                {...appearTextAnimation}
                            >
                                +3 POINTS
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] h-[39vw] bg-graydark">
                <div className="relative">
                    <img
                        className="h-full w-full"
                        src={PointsSystemThreeBackground}
                    />
                    <div className="absolute bottom-[4.2vw] left-[3.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                {...appearTextAnimation}
                            >
                                WINNER
                            </motion.p>
                        </div>
                    </div>
                    <div className="absolute bottom-[4.2vw] left-[22.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mr-[0.5vw] mt-[0.2vw] font-russoone text-[2.2vw] text-white"
                                {...appearTextAnimation}
                            >
                                +2 POINTS
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] h-[39vw] bg-graydark">
                <div className="relative">
                    <img
                        className="h-full w-full"
                        src={PointsSystemFourBackground}
                    />
                    <div className="absolute bottom-[4.2vw] left-[3.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                {...appearTextAnimation}
                            >
                                CARD SKIN
                            </motion.p>
                        </div>
                    </div>
                    <div className="absolute bottom-[4.2vw] left-[22.3vw] h-[6.5vw] w-[19vw]">
                        <div className="flex h-full items-center justify-center">
                            <motion.p
                                className="mr-[0.5vw] mt-[0.2vw] font-russoone text-[2.2vw] text-white"
                                {...appearTextAnimation}
                            >
                                +1 POINT
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] h-[39vw] bg-graydark">
                <div className="relative">
                    <img
                        className="h-full w-full"
                        src={PointsSystemFiveBackground}
                    />
                    <div className="absolute right-[5.4vw] top-[6.1vw] flex h-[12.6vw] gap-[1.5vw]">
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    10 KILLS
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +20 POINTS
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    1 DEATH
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    -1 POINT
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.2vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    8 ASSISTS
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +8 POINTS
                                </motion.p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-[5.4vw] top-[20.2vw] flex h-[12.6vw] gap-[1.5vw]">
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.2vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    GAME MVP
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +3 POINTS
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    WINNER
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +2 POINTS
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex h-full w-[16.4vw] flex-col">
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.2vw] text-transparent"
                                    {...appearTextAnimation}
                                >
                                    CARD SKIN
                                </motion.p>
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <motion.p
                                    className="font-russoone text-[2vw] text-white"
                                    {...appearTextAnimation}
                                >
                                    +1 POINT
                                </motion.p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-[4vw] left-[3.5vw] h-[8vw] w-[35vw]">
                        <motion.p
                            className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] text-transparent"
                            {...appearTextAnimation}
                        >
                            33 POINTS
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
};
