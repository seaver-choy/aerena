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
import Back from "../../../../assets/card/back.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import WhiteButton from "../../../../assets/button/white.svg";
import { Skin } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";
import { useUsers } from "../../../../hooks/useUser";
import { getChoicePackImage } from "../../../../helpers/images";

interface AnimationModalProps {
    athleteChoices: Skin[];
    handleAthleteChoice: (athleteChoice: Skin) => void;
    league: string;
}

export const AnimationModal = ({
    athleteChoices,
    handleAthleteChoice,
    league,
}: AnimationModalProps) => {
    // 0: Initial, 1: Open Pack, 2: Back Card, 3: Athlete Card, 4: Card Selection, 5: Confirm Selection
    const user = useUsers();
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
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [ownedStatus, setOwnedStatus] = useState<boolean[]>([false, false]);
    const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

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
            setAnimationStage(5);
        } else if (animationStage === 5) {
            setDisabledButtons(true);
            handleAthleteChoice(athleteChoices[selectedIndex]);
        }
    };

    const handlePackOpening = () => {
        setAnimationStage(2);
    };
    
    const updateOwnedStatus = () => {
        const currentOwnedStatus = [false, false];
        currentOwnedStatus[0] = user.skins.findIndex(skin => skin.athleteId === athleteChoices[0].athleteId && skin.team === athleteChoices[0].team && skin.league === athleteChoices[0].league) != -1;
        currentOwnedStatus[1] = user.skins.findIndex(skin => skin.athleteId === athleteChoices[1].athleteId && skin.team === athleteChoices[1].team && skin.league === athleteChoices[1].league) != -1;
        setOwnedStatus(currentOwnedStatus);
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

    useEffect(() => {
        if (athleteChoices != null) {
            setAnimationStage(0);
            setAnimationDust(false);
            setAnimationGlow(false);
            setAnimationBack(false);
            setFlipBack(false);
            setFlipAthlete(false);
            setNumberOfTimes(1);
            setAnimationState("appear");
            setFirstState("default");
            setSecondState("default");
            setSelectedIndex(null);
            updateOwnedStatus();
            setDisabledButtons(false);
        }
    }, [athleteChoices]);

    return (
        athleteChoices != null && (
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
                                onAnimationComplete={() =>
                                    setAnimationDust(true)
                                }
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
                                onAnimationComplete={() =>
                                    setAnimationGlow(true)
                                }
                            >
                                <img className="h-[400vw]" src={Glow} />
                            </motion.div>
                        </div>
                    )}
                    <div className="absolute z-30 flex h-[115vw] w-[80vw] flex-col justify-center">
                        <div className="mb-[4vw] flex h-[101vw] items-center justify-center">
                            {/* Pack Contents */}
                            {animationStage === 0 && (
                                <motion.div
                                    className="h-[80vw]"
                                    {...appearAnimation}
                                >
                                    <img
                                        className="h-full"
                                        src={getChoicePackImage(league)}
                                    />
                                </motion.div>
                            )}
                            {animationStage === 1 && (
                                <motion.div
                                    className="h-[80vw]"
                                    {...jiggleAnimation}
                                    onAnimationComplete={handlePackOpening}
                                >
                                    <img
                                        className="h-full"
                                        src={getChoicePackImage(league)}
                                    />
                                </motion.div>
                            )}
                            {animationStage === 2 && (
                                <motion.div
                                    className="h-[80vw] w-[62vw] [transform-style:preserve-3d] backface-hidden"
                                    {...(flipBack
                                        ? flipBackAnimation
                                        : !animationBack
                                          ? appearAnimation
                                          : bobbleAnimation)}
                                    onAnimationComplete={() =>
                                        setAnimationBack(true)
                                    }
                                >
                                    <img
                                        className="h-full"
                                        src={Back}
                                        onClick={handleButtonClick}
                                    />
                                </motion.div>
                            )}
                            {animationStage === 3 && (
                                <div className="h-[80vw] w-[62vw]">
                                    <motion.div
                                        className="h-full w-full [transform-style:preserve-3d] backface-hidden"
                                        {...(flipAthlete
                                            ? flipLeftAnimation
                                            : bobbleAnimation)}
                                        onAnimationComplete={() =>
                                            setFlipAthlete(false)
                                        }
                                    >
                                        <AthleteCard
                                            color={
                                                athleteChoices[
                                                    numberOfTimes - 1
                                                ].teamData.colors
                                            }
                                            ign={
                                                athleteChoices[
                                                    numberOfTimes - 1
                                                ].player
                                            }
                                            opacity={{
                                                wave: athleteChoices[
                                                    numberOfTimes - 1
                                                ].teamData.colors.wave,
                                            }}
                                            role={
                                                athleteChoices[
                                                    numberOfTimes - 1
                                                ].position[0]
                                            }
                                            type={"basic"}
                                            league={
                                                athleteChoices[
                                                    numberOfTimes - 1
                                                ].league
                                            }
                                            owned={
                                                ownedStatus[numberOfTimes - 1]
                                            }
                                        />
                                    </motion.div>
                                </div>
                            )}
                            {animationStage === 4 && (
                                <div className="flex">
                                    <motion.div
                                        className="flex h-[50vw] w-[38vw] items-center justify-start overflow-hidden"
                                        onClick={() => {
                                            handleFirstSelection();
                                            setSelectedIndex(0);
                                        }}
                                        {...(animationState === "appear"
                                            ? appearAnimation
                                            : firstState === "scaleUp"
                                              ? scaleUpAnimation
                                              : scaleDownAnimation)}
                                    >
                                        <AthleteCard
                                            color={
                                                athleteChoices[0].teamData
                                                    .colors
                                            }
                                            ign={athleteChoices[0].player}
                                            opacity={{
                                                wave: athleteChoices[0].teamData
                                                    .colors.wave,
                                            }}
                                            role={athleteChoices[0].position[0]}
                                            type={"basic"}
                                            league={athleteChoices[0].league}
                                            owned={
                                                ownedStatus[0]
                                            }
                                            id={0}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="flex h-[50vw] w-[38vw] items-start justify-end overflow-hidden"
                                        onClick={() => {
                                            handleSecondSelection();
                                            setSelectedIndex(1);
                                        }}
                                        {...(animationState === "appear"
                                            ? appearAnimation
                                            : secondState === "scaleUp"
                                              ? scaleUpAnimation
                                              : scaleDownAnimation)}
                                    >
                                        <AthleteCard
                                            color={
                                                athleteChoices[1].teamData
                                                    .colors
                                            }
                                            ign={athleteChoices[1].player}
                                            opacity={{
                                                wave: athleteChoices[1].teamData
                                                    .colors.wave,
                                            }}
                                            role={athleteChoices[1].position[0]}
                                            type={"basic"}
                                            league={athleteChoices[1].league}
                                            owned={
                                                ownedStatus[1]
                                            }
                                            id={1}
                                        />
                                    </motion.div>
                                </div>
                            )}
                            {animationStage === 5 && (
                                <motion.div
                                    className="h-[80vw] w-[62vw]"
                                    {...appearAnimation}
                                >
                                    <AthleteCard
                                        color={
                                            athleteChoices[selectedIndex]
                                                .teamData.colors
                                        }
                                        ign={
                                            athleteChoices[selectedIndex].player
                                        }
                                        opacity={{
                                            wave: athleteChoices[selectedIndex]
                                                .teamData.colors.wave,
                                        }}
                                        role={
                                            athleteChoices[selectedIndex]
                                                .position[0]
                                        }
                                        type={"basic"}
                                        league={
                                            athleteChoices[selectedIndex].league
                                        }
                                        owned={
                                            ownedStatus[selectedIndex]
                                        }
                                        id={2}
                                    />
                                </motion.div>
                            )}
                        </div>
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
                            {animationStage === 4 &&
                                (selectedIndex == null ? (
                                    <motion.div
                                        className="flex h-[20vw] items-center px-[4vw] text-center"
                                        {...appearTextAnimation}
                                    >
                                        <p className="font-russoone text-[4vw] font-normal text-white">
                                            Tap the skin you wish to select.
                                            Only one can be chosen.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={handleButtonClick}
                                        {...appearTextAnimation}
                                    >
                                        <img
                                            className="h-full"
                                            src={GoldButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                                Select
                                            </p>
                                        </div>
                                    </motion.button>
                                ))}
                            {animationStage === 5 && (
                                <div className="flex flex-row gap-[4vw]">
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={() => setAnimationStage(4)}
                                        {...appearTextAnimation}
                                        disabled={disabledButtons}
                                    >
                                        <img
                                            className="h-full"
                                            src={WhiteButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                                Back
                                            </p>
                                        </div>
                                    </motion.button>
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={handleButtonClick}
                                        {...appearTextAnimation}
                                        disabled={disabledButtons}
                                    >
                                        <img
                                            className="h-full"
                                            src={GoldButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                                Confirm
                                            </p>
                                        </div>
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
