import { useState } from "react";
import { motion } from "motion/react";
import { appearCardAnimation } from "../../../../helpers/animation";
import { AthleteSelectModal } from "../../modals/AthleteSelectModal";

import RoamEmpty from "../../../../assets/card/roam-empty.svg";
import MidEmpty from "../../../../assets/card/mid-empty.svg";
import JungleEmpty from "../../../../assets/card/jungle-empty.svg";
import GoldEmpty from "../../../../assets/card/gold-empty.svg";
import EXPEmpty from "../../../../assets/card/exp-empty.svg";

export const DreamTeam = () => {
    const [showAthleteSelectModal, setShowAthleteSelectModal] =
        useState<boolean>(false);

    const displayAthleteSelectModal = () => {
        setShowAthleteSelectModal(true);
    };

    const closeAthleteSelectModal = () => {
        setShowAthleteSelectModal(false);
    };

    return (
        <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
            <motion.button
                className="relative flex h-[36.4vw] w-[28vw]"
                onClick={displayAthleteSelectModal}
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={RoamEmpty}></img>
            </motion.button>
            <motion.button
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={MidEmpty}></img>
            </motion.button>
            <motion.button
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={JungleEmpty}></img>
            </motion.button>
            <motion.button
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={GoldEmpty}></img>
            </motion.button>
            <motion.button
                className="relative flex h-[36.4vw] w-[28vw]"
                {...appearCardAnimation}
            >
                <img className="h-full w-full" src={EXPEmpty}></img>
            </motion.button>
            {showAthleteSelectModal && (
                <AthleteSelectModal onClose={closeAthleteSelectModal} />
            )}
        </div>
    );
};
