import { useEffect } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import GoldButton from "../../../../assets/button/gold.svg";

import RoamIcon from "../../../../assets/icon/roam.svg";
import Sample from "../../../../assets/card/sample.svg";

interface AthleteSelectModalProps {
    onClose: () => void;
}

export const AthleteSelectModal = ({ onClose }: AthleteSelectModalProps) => {
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
                                Select Player
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
                    <div className="mb-[4vw] flex h-[6.5vw]">
                        <motion.div
                            className="flex w-[100%] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-full" src={RoamIcon} />
                        </motion.div>
                    </div>
                    <motion.div
                        className="mx-[2vw] mb-[4vw] h-[10vw] rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                        {...appearTextAnimation}
                    >
                        <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[4vw]">
                            <input
                                className="flex w-full bg-transparent font-russoone text-[3.5vw] font-normal text-white focus:outline-none"
                                type="text"
                                placeholder="Search..."
                                maxLength={12}
                            ></input>
                        </div>
                    </motion.div>
                    <div className="mb-[4vw] flex h-[52vw] flex-row flex-wrap content-start gap-[0.75vw] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <motion.div
                            className="relative flex h-[27.95vw] w-[21.5vw]"
                            {...appearCardAnimation}
                        >
                            <img className="h-full w-full" src={Sample} />
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
