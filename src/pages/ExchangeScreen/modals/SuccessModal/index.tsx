import { useEffect } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Skin } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";

import LargeModal from "../../../../assets/modal/large.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface SuccessModalProps {
    athleteChoice: Skin;
    onClose: () => void;
}

export const SuccessModal = ({ athleteChoice, onClose }: SuccessModalProps) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        athleteChoice != null && (
            <div className="fixed inset-0 z-40">
                <div className="relative flex h-full w-full items-center justify-center">
                    <div className="h-full w-full bg-graydark opacity-95" />
                    <motion.div
                        className="absolute z-40 h-[115vw] w-[80vw]"
                        {...appearModalAnimation}
                    >
                        <img className="h-full w-full" src={LargeModal} />
                    </motion.div>
                    <div className="absolute z-50 flex h-[99vw] w-[66vw] flex-col justify-center">
                        <div className="relative flex h-[11vw] flex-col items-center gap-[2vw]">
                            <motion.div {...appearTextAnimation}>
                                <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                                    Congratulations!
                                </p>
                            </motion.div>
                        </div>
                        <div className="mb-[4vw] flex h-[76.5vw] flex-col items-center justify-center gap-[4vw]">
                            <motion.div
                                className="h-[46vw] w-[35vw]"
                                {...appearAnimation}
                            >
                                <AthleteCard
                                    color={athleteChoice.teamData.colors}
                                    ign={athleteChoice.player}
                                    opacity={{
                                        wave: athleteChoice.teamData.colors
                                            .wave,
                                    }}
                                    role={athleteChoice.position[0]}
                                    type={"basic"}
                                    league={athleteChoice.league}
                                    id={0}
                                />
                            </motion.div>
                            <motion.div
                                className="px-[8vw]"
                                {...appearTextAnimation}
                            >
                                <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                    You have unlocked the {athleteChoice.player}{" "}
                                    Skin! Equip it now in your Collection.
                                </p>
                            </motion.div>
                        </div>
                        <div className="flex h-[7.5vw] justify-center">
                            <div className="flex h-full w-full">
                                <motion.button
                                    className="relative flex h-full w-full justify-center"
                                    onClick={onClose}
                                    {...appearTextAnimation}
                                >
                                    <img className="h-full" src={GoldButton} />
                                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                        <p className="-mt-[0.4vw] font-russoone text-[3.2vw] font-normal text-white">
                                            Okay
                                        </p>
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
