import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Slider } from "../../../../components/Slider";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import StatsBackground from "../../../../assets/background/stats.svg";
import FunctionModalButton from "../../../../assets/button/function-modal.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface AthleteModalProps {
    onClose: () => void;
}

export const AthleteModal = ({ onClose }: AthleteModalProps) => {
    const navigate = useNavigate();
    const count = useMotionValue(0);
    const stats = useTransform(() => count.get().toFixed(2));

    const handleViewPlayerProfile = () => {
        navigate(`/athlete`);
    };

    useEffect(() => {
        const controls = animate(count, 10, { duration: 2 });
        return () => controls.stop();
    });

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
                    <div className="relative flex h-[11vw] flex-col items-center">
                        <motion.div {...appearTextAnimation}>
                            <p className="font-montserrat text-[3vw] font-extrabold text-golddark">
                                ONIC PH
                            </p>
                        </motion.div>
                        <motion.div
                            className="-mt-[1.5vw]"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] text-transparent">
                                SUPER FRINCE
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
                    <div className="mb-[2vw] flex h-[11.5vw] gap-[2vw]">
                        <motion.div
                            className="relative flex h-full w-[20.67vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={StatsBackground}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                                    KILLS
                                </p>
                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                    {stats}
                                </motion.pre>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-full w-[20.67vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={StatsBackground}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                                    DEATHS
                                </p>
                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                    {stats}
                                </motion.pre>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-full w-[20.67vw]"
                            {...appearTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={StatsBackground}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                                    ASSISTS
                                </p>
                                <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                                    {stats}
                                </motion.pre>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mb-[1vw] flex h-[6vw] justify-center">
                        <motion.button
                            className="relative flex h-[6vw] items-center justify-center"
                            onClick={handleViewPlayerProfile}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex">
                                <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
                                    View Player Profile
                                </p>
                            </div>
                            <img
                                className="h-[100%]"
                                src={FunctionModalButton}
                            ></img>
                        </motion.button>
                    </div>
                    <div className="mb-[5vw] flex h-[55vw] flex-col items-center">
                        <motion.div {...appearAnimation}>
                            <Slider />
                        </motion.div>
                        <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                            Basic Skin
                        </p>
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
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
