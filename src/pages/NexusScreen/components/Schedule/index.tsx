import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";
import { Filter } from "../../../../components/Filter";
import { MatchBanner } from "../MatchBanner";

export const Schedule = () => {
    return (
        <div>
            <Filter />
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
