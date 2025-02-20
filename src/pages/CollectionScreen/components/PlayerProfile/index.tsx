import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import AthleteDetailsSonner from "../../../../assets/sonner/athlete-details.svg";
import AthleteDetailsBackground from "../../../../assets/background/athlete-details.svg";

export const PlayerProfile = () => {
    const [showAthleteDetails, setShowAthleteDetails] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAthleteDetails(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[2vw]">
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Player Name
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    Grant Duane Pillas
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Nationality
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    Philippines
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Born
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    March 26, 2005
                                    <span className="font-montagu">
                                        {" • "}
                                    </span>
                                    20 years old
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Status
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    Active
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Role
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    Gold Laner
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Alternate IGNs
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    KELRAAA
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Experience
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    7 Seasons
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
