import { useEffect } from "react";
import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";
import { PackInfo } from "../../../../helpers/interfaces";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import WhiteButton from "../../../../assets/button/white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import StarsIcon from "../../../../assets/icon/tg-star-gold.svg";

interface ConfirmModalProps {
    packInfo: PackInfo;
    costType: string;
    boosterQuantity: number;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({
    packInfo,
    costType,
    boosterQuantity,
    onCancel,
    onConfirm,
}: ConfirmModalProps) => {
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
                <div className="absolute z-40 h-[82.5vw] w-[80vw]">
                    <img className="h-full w-full" src={SmallModal} />
                </div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col justify-center">
                    <div className="mb-[4vw] flex h-[55vw] flex-col items-center justify-center px-[4vw]">
                        <motion.div {...appearTextAnimation}>
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                You are about to purchase {boosterQuantity}{" "}
                                Basic Packs for
                            </p>
                            <div className="my-[1.5vw] flex justify-center gap-[2vw]">
                                <img
                                    className="mt-[2.5vw] h-[7.2vw]"
                                    src={
                                        costType === "star"
                                            ? StarsIcon
                                            : BattlePointsIcon
                                    }
                                />
                                <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[9vw] text-transparent">
                                    {(costType === "star"
                                        ? packInfo.starCost * boosterQuantity
                                        : packInfo.bpCost * boosterQuantity
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                Do you wish to continue?
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={onCancel}
                            >
                                <img className="h-full" src={WhiteButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.8vw] font-normal text-transparent">
                                        Cancel
                                    </p>
                                </div>
                            </button>
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={onConfirm}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Confirm
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
