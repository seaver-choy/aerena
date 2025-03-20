import { motion } from "motion/react";
import {
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { MatchBanner } from "../MatchBanner";

import FunctionButton from "../../../../assets/button/function.svg";

export const Schedule = () => {
    return (
        <div>
            <div className="mt-[4vw] flex h-[15vw] w-full px-[6vw]">
                <div className="flex h-full w-[50%] items-center pl-[2vw]">
                    <motion.p
                        className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                        {...slideRightTextAnimation}
                    >
                        Filter Options
                    </motion.p>
                </div>
                <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                    <motion.button
                        className="relative flex h-[7vw] items-center justify-center"
                        {...appearTextAnimation}
                    >
                        <div className="absolute flex">
                            <p className="font-russoone text-[2.4vw] font-normal tracking-wide text-white">
                                Region
                            </p>
                        </div>
                        <img className="h-[100%]" src={FunctionButton}></img>
                    </motion.button>
                    <motion.button
                        className="relative flex h-[7vw] items-center justify-center"
                        {...appearTextAnimation}
                    >
                        <div className="absolute flex">
                            <p className="font-russoone text-[2.4vw] font-normal tracking-wide text-white">
                                League
                            </p>
                        </div>
                        <img className="h-[100%]" src={FunctionButton}></img>
                    </motion.button>
                </div>
            </div>
            <div className="mx-[6vw] mt-[2vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none]">
                <button className="items-center justify-center bg-graydark px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-white"
                        {...appearTextAnimation}
                    >
                        WEEK 1
                    </motion.p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-gold"
                        {...appearTextAnimation}
                    >
                        WEEK 2
                    </motion.p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-gold"
                        {...appearTextAnimation}
                    >
                        WEEK 3
                    </motion.p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-gold"
                        {...appearTextAnimation}
                    >
                        WEEK 4
                    </motion.p>
                </button>
            </div>
            <MatchBanner />
            <MatchBanner />
            <MatchBanner />
        </div>
    );
};
