import { motion } from "motion/react";
import {
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";

export const DreamTeamTitle = () => {
    return (
        <div className="absolute top-0 flex h-[20vw] w-full justify-center px-[4vw] pt-[6vw]">
            <div className="flex h-full w-[50%] items-center pl-[4vw]">
                <motion.p
                    className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                    {...slideRightTextAnimation}
                >
                    My Dream Team
                </motion.p>
            </div>
            <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                <motion.button
                    className="relative flex h-[7vw] items-center justify-center"
                    {...appearTextAnimation}
                >
                    <div className="absolute flex">
                        <p className="font-russoone text-[2.4vw] font-normal tracking-wide text-white">
                            Team
                        </p>
                    </div>
                    <img className="h-[100%]" src={FunctionButton}></img>
                </motion.button>
            </div>
            <img className="absolute bottom-0 w-full" src={GoldLine}></img>
        </div>
    );
};
