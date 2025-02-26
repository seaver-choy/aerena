import { useEffect } from "react";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    appearModalAnimation,
} from "../../../../helpers/animation";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import WhiteButton from "../../../../assets/button/white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-gold.svg";

interface ConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    tournamentType?: string;
    joinCost?: number;
}

export const ConfirmModal = ({
    onClose,
    onConfirm,
    loading,
    tournamentType = null,
    joinCost = 0,
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
                <motion.div
                    className="absolute z-40 h-[82.5vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={SmallModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col justify-center">
                    <div className="mb-[4vw] flex h-[55vw] flex-col items-center justify-center px-[4vw]">
                        <motion.div {...appearTextAnimation}>
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                You will join this tournament using your
                                selected lineup.
                            </p>
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                Entry to the tournament costs
                            </p>
                            {tournamentType === "basic" ? (
                                <div className="my-[1.5vw] flex justify-center gap-[2vw]">
                                    <img
                                        className="mt-[2.5vw] h-[7.2vw]"
                                        src={BattlePointsIcon}
                                    />
                                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[9vw] text-transparent">
                                        {joinCost}
                                    </p>
                                </div>
                            ) : (
                                <div className="my-[2vw] flex justify-center gap-[2vw]">
                                    <img
                                        className="mt-[2.5vw] h-[7.2vw]"
                                        src={TGStarIcon}
                                    />
                                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[9vw] text-transparent">
                                        {joinCost}
                                    </p>
                                </div>
                            )}
                            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
                                Do you wish to continue?
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={onClose}
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
                                onClick={onConfirm}
                                disabled={loading}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Confirm
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
