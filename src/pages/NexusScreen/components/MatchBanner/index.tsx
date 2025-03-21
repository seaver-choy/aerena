import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { TeamCard } from "../../../../components/TeamCard";

import MatchBackground from "../../../../assets/background/match.svg";
import MatchSonner from "../../../../assets/sonner/match.svg";
import MatchButton from "../../../../assets/button/match.svg";
import WinLeft from "../../../../assets/others/win-left.svg";
import WinRight from "../../../../assets/others/win-right.svg";
import LoseLeft from "../../../../assets/others/lose-left.svg";
import LoseRight from "../../../../assets/others/lose-right.svg";

export const MatchBanner = () => {
    const navigate = useNavigate();
    const [showMatchBanner, setShowMatchBanner] = useState<boolean>(false);

    const color = {
        main: getBaseTeamColor().main,
        light: getBaseTeamColor().light,
        dark: getBaseTeamColor().dark,
        wings: getBaseTeamColor().wings,
        accent: getBaseTeamColor().accent,
        details: getBaseTeamColor().details,
        wave: getBaseTeamColor().wave,
    };

    const handleViewDetails = () => {
        navigate(`/match`);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMatchBanner(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-[4vw]">
            {showMatchBanner ? (
                <div className="relative flex h-[42vw] w-full justify-center bg-graydark">
                    <img className="h-full w-full" src={MatchBackground} />
                    <div className="absolute top-[4vw] flex flex-col items-center">
                        <motion.div {...appearTextAnimation}>
                            <p className="text-nowrap font-russoone text-[5vw] font-normal text-white">
                                Match 1
                            </p>
                        </motion.div>
                        <motion.div
                            className="-mt-[0.5vw]"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap font-russoone text-[2.8vw] font-normal text-white">
                                PH S15 Week 4
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap font-montserrat text-[2.8vw] font-normal text-white">
                                MAR 28, 2024
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[1.5vw] bg-graylight px-[1.5vw] py-[0.5vw]"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap font-montserrat text-[2.8vw] font-normal text-white">
                                5:00 PM
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute left-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                        {...appearAnimation}
                    >
                        <TeamCard color={color} team={"ANRCHY"} />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[12vw] left-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pl-[5vw]"
                        {...appearAnimation}
                    >
                        <img
                            className="h-full will-change-transform backface-hidden"
                            src={LoseLeft}
                        />
                        <img
                            className="-ml-[2vw] h-full will-change-transform backface-hidden"
                            src={WinLeft}
                        />
                        <img
                            className="-ml-[2vw] h-full will-change-transform backface-hidden"
                            src={WinLeft}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute right-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                        {...appearAnimation}
                    >
                        <TeamCard color={color} team={"ANRCHY"} />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[12vw] right-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pr-[5vw]"
                        {...appearAnimation}
                    >
                        <img
                            className="h-full will-change-transform backface-hidden"
                            src={WinRight}
                        />
                        <img
                            className="-ml-[2vw] h-full will-change-transform backface-hidden"
                            src={WinRight}
                        />
                        <img
                            className="-ml-[2vw] h-full will-change-transform backface-hidden"
                            src={LoseRight}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[3vw] flex"
                        {...appearTextAnimation}
                    >
                        <button
                            className="relative flex h-[7vw] justify-center"
                            onClick={handleViewDetails}
                        >
                            <img className="h-full" src={MatchButton} />
                            <div className="absolute flex h-full w-full items-center justify-center">
                                <p className="font-russoone text-[2.8vw] font-normal text-white">
                                    View Details
                                </p>
                            </div>
                        </button>
                    </motion.div>
                </div>
            ) : (
                <div className="h-[42vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full w-full" src={MatchSonner} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
