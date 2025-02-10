import { motion } from "motion/react";
import { appearCardAnimation } from "../../../../helpers/animation";

import RoamEmpty from "../../../../assets/card/roam-empty.svg";
import MidEmpty from "../../../../assets/card/mid-empty.svg";
import JungleEmpty from "../../../../assets/card/jungle-empty.svg";
import GoldEmpty from "../../../../assets/card/gold-empty.svg";
import EXPEmpty from "../../../../assets/card/exp-empty.svg";

export const DreamTeam = () => {
    return (
        <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
            <motion.div
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={RoamEmpty}></img>
            </motion.div>
            <motion.div
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={MidEmpty}></img>
            </motion.div>
            <motion.div
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={JungleEmpty}></img>
            </motion.div>
            <motion.div
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={GoldEmpty}></img>
            </motion.div>
            <motion.div
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={EXPEmpty}></img>
            </motion.div>
        </div>
    );
};
