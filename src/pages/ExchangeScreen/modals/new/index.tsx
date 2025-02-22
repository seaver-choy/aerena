import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    burstLargeAnimation,
    burstSmallAnimation,
    disappearAnimation,
    jiggleAnimation,
} from "../../../../helpers/animation";

import Dust from "../../../../assets/others/dust-gold.svg";
import Glow from "../../../../assets/others/glow-radial.svg";
import Sample from "../../../../assets/card/sample.svg";
import Basic from "../../../../assets/pack/basic.svg";
import BackCard from "../../../../assets/card/back-card.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface NewModalProps {
    onEnd: () => void;
}

export const NewModal = ({ onEnd }: NewModalProps) => {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleButtonClick = () => {
        if (animationStage === 0) {
            setAnimationStage(1);
        } else if (animationStage === 1) {
            setAnimationStage(2);
        } else if (animationStage === 2) {
            setAnimationStage(3);
        } else if (animationStage === 3) {
            onEnd();
        }
    };

    const handlePackOpening = () => {
        setAnimationStage(2);
    };

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                {animationStage >= 1 && (
                    <div className="absolute z-40 flex h-full w-full items-center justify-center">
                        <motion.div {...burstSmallAnimation}>
                            <img className="h-[200vw]" src={Dust} alt="Dust" />
                        </motion.div>
                    </div>
                )}
                {animationStage >= 1 && (
                    <div className="absolute z-40 flex h-full w-full items-center justify-center">
                        <motion.div {...burstLargeAnimation}>
                            <img className="h-[400vw]" src={Glow} alt="Dust" />
                        </motion.div>
                    </div>
                )}
                <div className="absolute z-50 flex h-[115vw] w-[80vw] flex-col justify-center">
                    {animationStage === 0 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-[80vw]" src={Basic} alt="Pack" />
                        </motion.div>
                    )}
                    {animationStage === 1 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center"
                            {...jiggleAnimation}
                            onAnimationComplete={handlePackOpening}
                        >
                            <img className="h-[80vw]" src={Basic} alt="Pack" />
                        </motion.div>
                    )}
                    {animationStage === 2 && (
                        <div className="mb-[4vw] flex h-[101vw] animate-appear items-center justify-center">
                            <img
                                className="h-[80vw]"
                                src={BackCard}
                                alt="Back Card"
                                onClick={handleButtonClick}
                            />
                        </div>
                    )}
                    {animationStage === 3 && (
                        <div className="mb-[4vw] flex h-[101vw] animate-appear items-center justify-center">
                            <img
                                className="h-[80vw]"
                                src={Sample}
                                alt="Athlete"
                            />
                        </div>
                    )}
                    <div className="flex h-[10vw] items-center justify-center">
                        {animationStage === 0 && (
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleButtonClick}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Open Pack
                                    </p>
                                </div>
                            </motion.button>
                        )}
                        {animationStage === 1 && (
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                {...disappearAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Open Pack
                                    </p>
                                </div>
                            </motion.button>
                        )}
                        {animationStage === 2 && (
                            <motion.div {...appearTextAnimation}>
                                <p className="font-russoone text-[4vw] font-normal text-white">
                                    Tap the Card to reveal the Athlete.
                                </p>
                            </motion.div>
                        )}
                        {animationStage === 3 && (
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleButtonClick}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Continue
                                    </p>
                                </div>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
