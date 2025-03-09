import { useEffect } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    appearModalAnimation,
} from "../../../../helpers/animation";

import DreamTeamBackground from "../../../../assets/background/dream-team.svg";
import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import SampleCard from "../../../../assets/card/sample.svg";

interface DreamTeamModalProps {
    onClose: () => void;
}

export const DreamTeamModal = ({ onClose }: DreamTeamModalProps) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                <div className="absolute flex h-[96vw] w-[80vw] flex-col gap-[6vw]">
                    <motion.div
                        className="relative flex h-[80vw] w-[80vw] justify-center"
                        {...appearModalAnimation}
                    >
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <div className="mt-[2vw] h-[75vw]">
                                <img
                                    className="h-full"
                                    src={LineupBackground}
                                />
                            </div>
                        </div>
                        <motion.div
                            className="absolute top-[10.5vw] overflow-hidden"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                ONIC PH
                            </p>
                        </motion.div>
                        <div className="absolute top-[18.5vw] flex h-[47vw] w-[56vw] flex-row flex-wrap items-center justify-center gap-[1vw]">
                            <motion.div
                                className="h-[23vw] w-[18vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={SampleCard}
                                />
                            </motion.div>
                            <motion.div
                                className="h-[23vw] w-[18vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={SampleCard}
                                />
                            </motion.div>
                            <motion.div
                                className="h-[23vw] w-[18vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={SampleCard}
                                />
                            </motion.div>
                            <motion.div
                                className="h-[23vw] w-[18vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={SampleCard}
                                />
                            </motion.div>
                            <motion.div
                                className="h-[23vw] w-[18vw] overflow-hidden"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={SampleCard}
                                />
                            </motion.div>
                        </div>
                        <div className="absolute bottom-[2.6vw] flex h-[10vw] w-[33vw]">
                            <div className="relative w-full items-center justify-center">
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <p className="pt-[0.2vw] font-russoone text-[1.8vw] text-white">
                                        Aerena Esports Fantasy
                                    </p>
                                </div>
                                <img
                                    className="h-full w-full"
                                    src={LineupButton}
                                />
                            </div>
                        </div>
                        <img
                            className="h-full w-full"
                            src={DreamTeamBackground}
                        />
                    </motion.div>
                    <div className="flex h-[10vw] w-[80vw] justify-center">
                        <motion.button
                            className="h-[10vw] w-[10vw]"
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full" src={CloseIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
