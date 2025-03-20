import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";
import { FunctionSection } from "../../../../components/FunctionSection";
import { TitleSection } from "../../../../components/TitleSection";
import { MatchBanner } from "../MatchBanner";

export const Schedule = () => {
    return (
        <div>
            <FunctionSection
                title="Filter Options"
                showRegionButton={true}
                showLeagueButton={true}
            />
            <div className="mx-[6vw] mt-[4vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none]">
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
                <button className="items-center justify-center px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-gold"
                        {...appearTextAnimation}
                    >
                        WEEK 5
                    </motion.p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <motion.p
                        className="text-nowrap font-russoone text-[3.5vw] text-gold"
                        {...appearTextAnimation}
                    >
                        WEEK 6
                    </motion.p>
                </button>
            </div>
            <TitleSection title="Day 1" />
            <MatchBanner />
            <MatchBanner />
            <TitleSection title="Day 2" />
            <MatchBanner />
            <MatchBanner />
            <MatchBanner />
            <TitleSection title="Day 3" />
            <MatchBanner />
            <MatchBanner />
        </div>
    );
};
