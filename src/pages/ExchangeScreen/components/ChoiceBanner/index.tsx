import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { PurchaseModal } from "../../modals/PurchaseModal";

import ChoicePackSonner from "../../../../assets/sonner/pack-choice.svg";
import ChoicePackBackground from "../../../../assets/background/pack-choice.svg";
import PH15ChoicePack from "../../../../assets/pack/choice-ph15.svg";
import PH15Sticker from "../../../../assets/sticker/ph15.svg";
import AerenaTextLogo from "../../../../assets/logo/aerena-text.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import BlackButton from "../../../../assets/button/black.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";

export const ChoiceBanner = () => {
    const [showChoicePack, setShowChoicePack] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);

    const displayPurchaseModal = () => {
        setShowPurchaseModal(true);
    };

    const closePurchaseModal = () => {
        setShowPurchaseModal(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChoicePack(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-[6vw]">
            {showChoicePack ? (
                <div className="relative h-[74.8vw]">
                    <img className="h-full w-full" src={ChoicePackBackground} />
                    <motion.div
                        className="absolute -left-[6vw] top-[7vw] h-[64vw] -rotate-[5deg]"
                        initial={{ opacity: 1, scale: 0.8, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: -5 }}
                        transition={{
                            scale: {
                                duration: 0.5,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            },
                        }}
                    >
                        <img className="h-full" src={PH15ChoicePack} />
                    </motion.div>
                    <motion.div
                        className="absolute right-[3vw] top-[2vw] h-[15vw] w-[15vw]"
                        {...appearAnimation}
                    >
                        <img className="h-full w-full" src={PH15Sticker} />
                    </motion.div>
                    <div className="absolute right-[4vw] top-[10vw] flex w-[50vw] flex-col">
                        <motion.div
                            className="h-[5vw] w-full"
                            {...slideRightTextAnimation}
                        >
                            <img className="h-full" src={AerenaTextLogo} />
                        </motion.div>
                        <div className="mt-[1vw] flex w-full">
                            <motion.p
                                className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent"
                                {...slideRightTextAnimation}
                            >
                                Choice Pack
                            </motion.p>
                        </div>
                        <div className="flex w-full">
                            <motion.p
                                className="font-montserrat text-[3.5vw] text-graydark"
                                {...slideRightTextAnimation}
                            >
                                Choose a skin with the Choice Pack. One pick,
                                two possibilities.
                            </motion.p>
                        </div>
                    </div>
                    <div className="absolute bottom-[6vw] right-[10vw] flex flex-col gap-[2vw]">
                        <motion.button
                            className="relative h-[10vw] w-[42vw]"
                            onClick={displayPurchaseModal}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                <img
                                    className="h-[3.5vw]"
                                    src={TGStarIcon}
                                ></img>
                                <p className="mt-[0.4vw] font-russoone text-[4.2vw] text-white">
                                    30
                                </p>
                            </div>
                            <img className="h-full w-full" src={GoldButton} />
                        </motion.button>
                        <motion.button
                            className="relative h-[10vw] w-[42vw]"
                            onClick={displayPurchaseModal}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                <img
                                    className="h-[3.5vw]"
                                    src={BattlePointsIcon}
                                ></img>
                                <p className="font-russoone text-[3.5vw] text-white">
                                    200,000
                                </p>
                            </div>
                            <img className="h-full w-full" src={BlackButton} />
                        </motion.button>
                        {showPurchaseModal && (
                            <PurchaseModal
                                onCancel={closePurchaseModal}
                                onConfirm={closePurchaseModal}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-[74.8vw]">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full" src={ChoicePackSonner} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
