import { useEffect, useState } from "react";

import Dust from "../../../../assets/others/dust-gold.svg";
import Glow from "../../../../assets/others/glow-radial.svg";
import Sample from "../../../../assets/card/sample.svg";
import Basic from "../../../../assets/pack/basic.svg";
import BackCard from "../../../../assets/card/back-card.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface AnimationModalProps {
    onEnd: () => void;
}

export const AnimationModal = ({ onEnd }: AnimationModalProps) => {
    const [startOpenPack, setStartOpenPack] = useState(false);
    const [showOpenPack, setShowOpenPack] = useState(true);
    const [showBackCard, setShowBackCard] = useState(false);
    const [hideTapText, setHideTapText] = useState(false);
    const [showCardReceive, setShowCardReceive] = useState(false);
    const [showAthleteCard, setShowAthleteCard] = useState(false);

    const startPackAnimation = () => {
        setStartOpenPack(!startOpenPack);
    };

    const handleCardClick = () => {
        setShowCardReceive(true);
        setHideTapText(true);
    };

    const handleContinue = () => {
        onEnd();
    };

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

                {/* Background animations (DustGold, GlowRadial) */}
                {showOpenPack && (
                    <div className="absolute z-40 flex h-full w-full justify-center">
                        <img
                            className={`${startOpenPack ? "animate-dust fill-mode-forwards" : "hidden"} h-[200vw]`}
                            src={Dust}
                            alt="Dust"
                        />
                    </div>
                )}
                {(showBackCard || showAthleteCard) && (
                    <div className="absolute z-40 flex h-full w-full justify-center">
                        <img
                            className="h-[200vw] animate-sparkle"
                            src={Dust}
                            alt="Sparkle"
                        />
                    </div>
                )}
                {showOpenPack && (
                    <div className="absolute z-40 flex h-full w-full items-center">
                        <img
                            className={`${startOpenPack ? "animate-glow fill-mode-forwards" : "hidden"} w-full`}
                            src={Glow}
                            alt="Glow"
                        />
                    </div>
                )}
                {(showBackCard || showAthleteCard) && (
                    <div className="absolute z-40 flex h-full w-full items-center">
                        <img
                            className="w-full animate-static"
                            src={Glow}
                            alt="Glow Static"
                        />
                    </div>
                )}

                <div className="absolute z-50 flex h-[115vw] w-[80vw] flex-col justify-center">
                    {/* Pack Image */}
                    {showOpenPack && (
                        <div
                            className={`${startOpenPack ? "animate-open fill-mode-forwards" : ""} mb-[4vw] flex h-[101vw] animate-appear items-center justify-center`}
                            onAnimationEnd={() => {
                                if (startOpenPack) {
                                    setTimeout(() => {
                                        setShowOpenPack(false);
                                        setStartOpenPack(false);
                                        setShowBackCard(true);
                                    }, 1000);
                                }
                            }}
                        >
                            <img className="h-[80vw]" src={Basic} alt="Pack" />
                        </div>
                    )}

                    {/* Back Card */}
                    {showBackCard && (
                        <div
                            className={`${showBackCard ? "animate-back" : ""} ${showCardReceive ? "animate-flip backface-hidden" : ""} mb-[4vw] flex h-[101vw] items-center justify-center`}
                            onAnimationEnd={() => {
                                if (showCardReceive) {
                                    setTimeout(() => {
                                        setShowCardReceive(false);
                                        setShowBackCard(false);
                                        setShowAthleteCard(true);
                                        setHideTapText(false);
                                    }, 0);
                                }
                            }}
                        >
                            <img
                                className="h-[80vw]"
                                src={BackCard}
                                alt="Back Card"
                                onClick={handleCardClick}
                            />
                        </div>
                    )}

                    {/* Athlete Card */}
                    {showAthleteCard && (
                        <div
                            className={`${showAthleteCard ? "animate-athlete backface-hidden" : ""} mb-[4vw] flex h-[101vw] items-center justify-center`}
                        >
                            <img
                                className="h-[80vw]"
                                src={Sample}
                                alt="Athlete"
                            />
                        </div>
                    )}

                    {/* Buttons and Text */}
                    {showOpenPack && (
                        <div className="flex h-[10vw] justify-center">
                            <button
                                className={`${startOpenPack ? "animate-disappear" : ""} relative flex h-full w-full animate-appear justify-center`}
                                onClick={startPackAnimation}
                            >
                                <img
                                    className="h-full"
                                    src={GoldButton}
                                    alt="Open Pack"
                                />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Open Pack
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}
                    {showBackCard && (
                        <div
                            className={`${hideTapText ? "animate-disappear" : ""} flex h-[10vw] justify-center`}
                        >
                            <p className="animate-text font-russoone text-[4vw] font-normal text-white">
                                Tap the Card to reveal the Athlete.
                            </p>
                        </div>
                    )}
                    {showAthleteCard && (
                        <div className="flex h-[10vw] justify-center">
                            <button
                                className={`${showAthleteCard ? "animate-appear fill-mode-forwards" : ""} relative flex h-full w-full justify-center`}
                                onClick={handleContinue}
                            >
                                <img
                                    className="h-full"
                                    src={GoldButton}
                                    alt="Continue"
                                />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                                        Continue
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// import { useEffect, useState } from "react";

// import Dust from "../../../../assets/others/dust-gold.svg";
// import Glow from "../../../../assets/others/glow-radial.svg";
// import Sample from "../../../../assets/card/sample.svg";
// import Basic from "../../../../assets/pack/basic.svg";
// import BackCard from "../../../../assets/card/back-card.svg";
// import GoldButton from "../../../../assets/button/gold.svg";

// interface AnimationModalProps {
//     onEnd: () => void;
// }

// export const AnimationModal = ({ onEnd }: AnimationModalProps) => {
//     const [animationStage, setAnimationStage] = useState(0); // 0: Open Pack, 1: Back Card, 2: Athlete Card

//     useEffect(() => {
//         document.body.style.overflow = "hidden";
//         return () => {
//             document.body.style.overflow = "auto";
//         };
//     }, []);

//     const handleButtonClick = () => {
//         if (animationStage === 0) {
//             setAnimationStage(1);
//         } else if (animationStage === 1) {
//             setAnimationStage(2);
//         } else if (animationStage === 2) {
//             onEnd();
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-40">
//             <div className="relative flex h-full w-full items-center justify-center">
//                 <div className="h-full w-full bg-graydark opacity-95" />

//                 {/* Background Animations */}
//                 {animationStage < 2 && ( // Show background animations only for Open Pack and Back Card
//                     <>
//                         <div className="absolute z-40 flex h-full w-full justify-center">
//                             <img
//                                 className={`${animationStage === 0 ? "animate-dust fill-mode-forwards" : "animate-sparkle"} h-[200vw]`}
//                                 src={Dust}
//                                 alt="Dust"
//                             />
//                         </div>
//                         <div className="absolute z-40 flex h-full w-full items-center">
//                             <img
//                                 className={`${animationStage === 0 ? "animate-glow fill-mode-forwards" : "animate-static"} w-full`}
//                                 src={Glow}
//                                 alt="Glow"
//                             />
//                         </div>
//                     </>
//                 )}

//                 <div className="absolute z-50 flex h-[115vw] w-[80vw] flex-col justify-center">
//                     {/* Content based on animation stage */}
//                     {animationStage === 0 && (
//                         <div className="mb-[4vw] flex h-[101vw] animate-appear items-center justify-center">
//                             <img className="h-[80vw]" src={Basic} alt="Pack" />
//                         </div>
//                     )}
//                     {animationStage === 1 && (
//                         <div className="mb-[4vw] flex h-[101vw] animate-appear items-center justify-center">
//                             <img
//                                 className="h-[80vw]"
//                                 src={BackCard}
//                                 alt="Back Card"
//                                 onClick={handleButtonClick}
//                             />
//                         </div>
//                     )}
//                     {animationStage === 2 && (
//                         <div className="mb-[4vw] flex h-[101vw] animate-appear items-center justify-center">
//                             <img className="h-[80vw]" src={Sample} alt="Athlete" />
//                         </div>
//                     )}

//                     {/* Button and Text based on animation stage */}
//                     <div className="flex h-[10vw] justify-center">
//                         <button
//                             className="relative flex h-full w-full animate-appear justify-center"
//                             onClick={handleButtonClick}
//                         >
//                             <img className="h-full" src={GoldButton} alt={animationStage === 0 ? "Open Pack" : animationStage === 1 ? "Tap" : "Continue"} />
//                             <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
//                                 <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
//                                     {animationStage === 0 ? "Open Pack" : animationStage === 1 ? "Tap the Card" : "Continue"}
//                                 </p>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
