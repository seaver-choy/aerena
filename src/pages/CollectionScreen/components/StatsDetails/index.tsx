import { motion } from "motion/react";

import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import PH15Sticker from "../../../../assets/sticker/ph15.svg";

import StatsBackground from "../../../../assets/background/stats.svg";

export const StatsDetails = () => {
    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {/* <button onClick={onBack}>back</button> */}
            <div className="flex w-full justify-center px-[3vw]">
                <button className="flex w-[8%] items-center justify-end">
                    <img className="h-[6vw]" src={LeftIcon} />
                </button>
                <div className="flex w-[84%] flex-col items-center justify-center gap-[2vw]">
                    <img className="h-[12vw]" src={PH15Sticker} />
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        ONIC PH
                    </p>
                </div>
                <button className="flex w-[8%] items-center justify-end">
                    <img className="h-[6vw]" src={RightIcon} />
                </button>
            </div>
            <div className="mx-[3vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button className="items-center justify-center bg-graydark px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-white">
                        ALL
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 1
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 2
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 3
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 4
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 5
                    </p>
                </button>
            </div>
            <div className="mx-[3vw] mt-[4vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        SEASON AVERAGES
                    </p>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                KPG
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                DPG
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                APG
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                WIN RATE
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                MVP RATE
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                PPG
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[3vw] mt-[4vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        SEASON TOTALS
                    </p>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                KILLS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                DEATHS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                ASSISTS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                WINS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                MVP
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                    <div className="relative flex w-[27vw]">
                        <img className="h-full" src={StatsBackground} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden">
                                POINTS
                            </p>
                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                0.00
                            </motion.pre>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[3vw] mb-[4vw] mt-[8vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        LEGEND
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        KPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Kills Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        DPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Deaths Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        APG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Assits Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        WIN RATE:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Total Wins over Total Games Played
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        MVP RATE:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Total MVPs over Total Games Played
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        PPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Points Per Game
                    </p>
                </div>
            </div>
        </div>
    );
};
