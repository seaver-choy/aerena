import { useEffect } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Slider } from "../../../../components/Slider";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import PhilippinesSticker from "../../../../assets/sticker/philippines.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface TeamModalProps {
    onClose: () => void;
}

export const TeamModal = ({ onClose }: TeamModalProps) => {
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
                    className="absolute z-40 h-[115vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={LargeModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[99vw] w-[66vw] flex-col justify-center">
                    <div className="relative flex h-[11vw] flex-col items-center gap-[2vw]">
                        <motion.div {...appearTextAnimation}>
                            <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                                Select Team
                            </p>
                        </motion.div>
                        <motion.button
                            className="absolute right-0 top-0 h-[5vw] w-[5vw]"
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full w-full" src={CloseIcon} />
                        </motion.button>
                    </div>
                    <div className="mb-[4vw] mt-[4vw] flex h-[10vw] items-center">
                        <motion.button
                            className="flex h-[5vw] w-[30%] justify-start"
                            {...appearAnimation}
                        >
                            <img className="ml-[4vw] h-full" src={LeftIcon} />
                        </motion.button>
                        <motion.div
                            className="flex h-full w-[40%] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-full" src={PhilippinesSticker} />
                        </motion.div>
                        <motion.button
                            className="flex h-[5vw] w-[30%] justify-end"
                            {...appearAnimation}
                        >
                            <img className="mr-[4vw] h-full" src={RightIcon} />
                        </motion.button>
                    </div>
                    <div className="mb-[4vw] flex h-[58.5vw]">
                        <motion.div {...appearAnimation}>
                            <Slider />
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
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Select
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
