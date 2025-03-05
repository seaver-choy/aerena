import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    appearModalAnimation,
} from "../../../../helpers/animation";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import WhiteButton from "../../../../assets/button/white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import StarsIcon from "../../../../assets/icon/tg-star-gold.svg";
import AddIcon from "../../../../assets/icon/add.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import { PackInfo } from "../../../../helpers/interfaces";

interface PurchaseModalProps {
    packInfo: PackInfo;
    costType: string;
    onCancel: () => void;
    onConfirm: (boosterQuantity: number) => void;
}

export const PurchaseModal = ({ packInfo, costType, onCancel, onConfirm }: PurchaseModalProps) => {
    const packCost = costType === 'star' ? packInfo.starCost : packInfo.bpCost;
    const [boosterQuantity, setBoosterQuantity] = useState<number>(1);
    const maxQuantity = 2;

    const handleIncrement = () => {
        if (boosterQuantity < maxQuantity) setBoosterQuantity(boosterQuantity + 1);
    };

    const handleDecrement = () => {
        if (boosterQuantity > 1) {
            setBoosterQuantity(boosterQuantity - 1);
        }
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
                <motion.div
                    className="absolute z-40 h-[82.5vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={SmallModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col justify-center">
                    <div className="mb-[4vw] h-[55vw] px-[4vw]">
                        <motion.div
                            className="flex h-full flex-col items-center justify-center"
                            {...appearTextAnimation}
                        >
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                Claim your Basic Pack.
                            </p>
                            <div className="my-[1.5vw] flex justify-center gap-[2vw]">
                                <img
                                    className="mt-[2.8vw] h-[7.2vw]"
                                    src={costType === 'star' ? StarsIcon : BattlePointsIcon}
                                />
                                <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[9vw] text-transparent">
                                    {(
                                        packCost * boosterQuantity
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="mt-[6vw] flex flex-row items-center gap-[2vw]">
                                <img
                                    className={`h-[8vw] ${boosterQuantity > 1 ? "" : "opacity-50"}`}
                                    src={MinusIcon}
                                    onClick={handleDecrement}
                                />
                                <div className="flex h-[8vw] w-[15vw] rounded-[2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark p-[0.5vw]">
                                    <div className="flex h-full w-full items-center justify-center rounded-[1.5vw] bg-light">
                                        <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-extrabold text-transparent">
                                            {boosterQuantity}
                                        </p>
                                    </div>
                                </div>
                                <img
                                    className={`h-[8vw] ${boosterQuantity < maxQuantity ? "" : "opacity-50"}`}
                                    src={AddIcon}
                                    onClick={handleIncrement}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={onCancel}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={WhiteButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.8vw] font-normal text-transparent">
                                        Cancel
                                    </p>
                                </div>
                            </motion.button>
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={() => {onConfirm(boosterQuantity)}}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Purchase
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
