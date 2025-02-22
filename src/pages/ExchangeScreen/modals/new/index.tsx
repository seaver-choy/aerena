import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    bobbleAnimation,
    burstLargeAnimation,
    burstSmallAnimation,
    disappearAnimation,
    flipBackAnimation,
    flipLeftAnimation,
    jiggleAnimation,
    radiateAnimation,
    scaleDownAnimation,
    scaleUpAnimation,
    sparkleAnimation,
} from "../../../../helpers/animation";

import Dust from "../../../../assets/others/dust-gold.svg";
import Glow from "../../../../assets/others/glow-radial.svg";
import Basic from "../../../../assets/pack/basic.svg";
import Back from "../../../../assets/card/back.svg";
import SampleOne from "../../../../assets/card/sample-one.svg";
import SampleTwo from "../../../../assets/card/sample-two.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface NewModalProps {
    onEnd: () => void;
}

export const NewModal = ({ onEnd }: NewModalProps) => {
    // 0: Initial, 1: Open Pack, 2: Back Card, 3: Athlete Card, 4: Card Selection
    const [animationStage, setAnimationStage] = useState(0);
    const [animationDust, setAnimationDust] = useState(false);
    const [animationGlow, setAnimationGlow] = useState(false);
    const [animationBack, setAnimationBack] = useState(false);
    const [flipBack, setFlipBack] = useState(false);
    const [flipAthlete, setFlipAthlete] = useState(false);
    const [numberOfTimes, setNumberOfTimes] = useState<number>(1);

    const [animationState, setAnimationState] = useState("appear");
    const [firstState, setFirstState] = useState("default");
    const [secondState, setSecondState] = useState("default");

    const handleButtonClick = () => {
        if (animationStage === 0) {
            setAnimationStage(1);
        } else if (animationStage === 1) {
            setAnimationStage(2);
        } else if (animationStage === 2) {
            setFlipBack(true);
            setAnimationBack(false);
            setTimeout(() => {
                setFlipBack(false);
                setAnimationStage(3);
                setFlipAthlete(true);
            }, 950);
        } else if (animationStage === 3) {
            if (numberOfTimes < 2) {
                setNumberOfTimes(numberOfTimes + 1);
                setAnimationStage(2);
            } else {
                setNumberOfTimes(1);
                setAnimationStage(4);
            }
        } else if (animationStage === 4) {
            onEnd();
        }
    };

    const handlePackOpening = () => {
        setAnimationStage(2);
    };

    const getAthleteCard = () => {
        if (numberOfTimes === 1) {
            return SampleOne;
        } else {
            return SampleTwo;
        }
    };

    const getButtonText = () => {
        if (numberOfTimes === 1 && animationStage === 3) {
            return "Next";
        } else {
            return "Continue";
        }
    };

    const handleFirstSelection = () => {
        setFirstState("scaleUp");
        setSecondState("scaleDown");
        setAnimationState("default");
    };

    const handleSecondSelection = () => {
        setFirstState("scaleDown");
        setSecondState("scaleUp");
        setAnimationState("default");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-20">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                {/* Background Animations */}
                {animationStage >= 1 && (
                    <div className="absolute z-20 flex h-full w-full items-center justify-center">
                        <motion.div
                            {...(!animationDust
                                ? burstSmallAnimation
                                : sparkleAnimation)}
                            onAnimationComplete={() => setAnimationDust(true)}
                        >
                            <img className="h-[200vw]" src={Dust} />
                        </motion.div>
                    </div>
                )}
                {animationStage >= 1 && (
                    <div className="absolute z-20 flex h-full w-full items-center justify-center">
                        <motion.div
                            {...(!animationGlow
                                ? burstLargeAnimation
                                : radiateAnimation)}
                            onAnimationComplete={() => setAnimationGlow(true)}
                        >
                            <img className="h-[400vw]" src={Glow} />
                        </motion.div>
                    </div>
                )}
                {/* Pack Contents */}
                <div className="absolute z-30 flex h-[115vw] w-[80vw] flex-col justify-center">
                    {animationStage === 0 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-[80vw]" src={Basic} />
                        </motion.div>
                    )}
                    {animationStage === 1 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center"
                            {...jiggleAnimation}
                            onAnimationComplete={handlePackOpening}
                        >
                            <img className="h-[80vw]" src={Basic} />
                        </motion.div>
                    )}
                    {animationStage === 2 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center backface-hidden"
                            {...(flipBack
                                ? flipBackAnimation
                                : !animationBack
                                  ? appearAnimation
                                  : bobbleAnimation)}
                            onAnimationComplete={() => setAnimationBack(true)}
                        >
                            <img
                                className="h-[80vw]"
                                src={Back}
                                onClick={handleButtonClick}
                            />
                        </motion.div>
                    )}
                    {animationStage === 3 && (
                        <motion.div
                            className="mb-[4vw] flex h-[101vw] items-center justify-center backface-hidden"
                            {...(flipAthlete
                                ? flipLeftAnimation
                                : bobbleAnimation)}
                            onAnimationComplete={() => setFlipAthlete(false)}
                        >
                            <img className="h-[80vw]" src={getAthleteCard()} />
                        </motion.div>
                    )}
                    {animationStage === 4 && (
                        <div className="relative mb-[4vw] flex h-[101vw] items-center justify-center backface-hidden">
                            <motion.div
                                className="flex h-[50vw] items-center justify-start"
                                {...(animationState === "appear"
                                    ? appearAnimation
                                    : animationState === "bobble"
                                      ? bobbleAnimation
                                      : firstState === "scaleUp"
                                        ? scaleUpAnimation
                                        : scaleDownAnimation)}
                                onClick={handleFirstSelection}
                                onAnimationComplete={() => {
                                    if (animationState === "appear") {
                                        setAnimationState("bobble");
                                    }
                                }}
                            >
                                <img className="h-full" src={SampleOne} />
                            </motion.div>
                            <motion.div
                                className="flex h-[50vw] items-start justify-end"
                                {...(animationState === "appear"
                                    ? appearAnimation
                                    : animationState === "bobble"
                                      ? bobbleAnimation
                                      : secondState === "scaleUp"
                                        ? scaleUpAnimation
                                        : scaleDownAnimation)}
                                onClick={handleSecondSelection}
                                onAnimationComplete={() => {
                                    if (animationState === "appear") {
                                        setAnimationState("bobble");
                                    }
                                }}
                            >
                                <img className="h-full" src={SampleTwo} />
                            </motion.div>
                        </div>
                    )}
                    {/* Button Functions */}
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
                                    Tap the Card to reveal the Skin.
                                </p>
                            </motion.div>
                        )}
                        {animationStage === 3 && (
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleButtonClick}
                                {...appearTextAnimation}
                                disabled={flipAthlete}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        {getButtonText()}
                                    </p>
                                </div>
                            </motion.button>
                        )}
                        {animationStage === 4 && (
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleButtonClick}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Select Skin
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
