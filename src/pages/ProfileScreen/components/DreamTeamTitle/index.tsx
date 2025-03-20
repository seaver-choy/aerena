import { useState } from "react";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { DreamTeam, TeamProfile, Token } from "../../../../helpers/interfaces";
import { TeamModal } from "../../modals/TeamModal";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";

interface DreamTeamTitleProps {
    dreamTeam: DreamTeam;
    handleDreamTeam: (teamProfile: TeamProfile, tokens: Token[]) => void;
}

export const DreamTeamTitle = ({
    dreamTeam,
    handleDreamTeam,
}: DreamTeamTitleProps) => {
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

    const displayTeamModal = () => {
        setShowTeamModal(true);
    };

    const closeTeamModal = () => {
        setShowTeamModal(false);
    };

    return (
        <div className="absolute top-0 flex h-[20vw] w-full justify-center px-[4vw] pt-[6vw]">
            <div className="flex h-full w-[50%] items-center pl-[4vw]">
                <motion.p
                    className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                    {...slideRightTextAnimation}
                >
                    {dreamTeam.teamProfile != null &&
                    dreamTeam.teamProfile.key != undefined
                        ? dreamTeam.teamProfile.key
                        : "My Dream Team"}
                </motion.p>
            </div>
            <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                <motion.button
                    className="relative flex h-[7vw] items-center justify-center"
                    onClick={displayTeamModal}
                    {...appearTextAnimation}
                >
                    <div className="absolute flex">
                        <p className="font-russoone text-[2.8vw] font-normal tracking-wide text-white">
                            Team
                        </p>
                    </div>
                    <img className="h-[100%]" src={FunctionButton}></img>
                </motion.button>
                {showTeamModal && (
                    <TeamModal
                        dreamTeam={dreamTeam}
                        onSelect={handleDreamTeam}
                        onClose={closeTeamModal}
                    />
                )}
            </div>
            <img className="absolute bottom-0 w-full" src={GoldLine}></img>
        </div>
    );
};
