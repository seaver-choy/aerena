import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { TeamCard } from "../../../../components/TeamCard";

import MatchBackground from "../../../../assets/background/match.svg";
import MatchButton from "../../../../assets/button/match.svg";
import WinLeft from "../../../../assets/others/win-left.svg";
import WinRight from "../../../../assets/others/win-right.svg";
import LoseLeft from "../../../../assets/others/lose-left.svg";
import LoseRight from "../../../../assets/others/lose-right.svg";

export const MatchBanner = () => {
    const color = {
        main: getBaseTeamColor().main,
        light: getBaseTeamColor().light,
        dark: getBaseTeamColor().dark,
        wings: getBaseTeamColor().wings,
        accent: getBaseTeamColor().accent,
        details: getBaseTeamColor().details,
        wave: getBaseTeamColor().wave,
    };

    return (
        <div className="mt-[4vw] bg-red">
            <div className="relative flex h-[33.4vw] w-full justify-center">
                <img className="h-full w-full" src={MatchBackground} />
                <div className="absolute top-[2vw] flex flex-col items-center">
                    <motion.div {...appearTextAnimation}>
                        <p className="text-nowrap font-russoone text-[5vw] font-normal text-white">
                            Match 1
                        </p>
                    </motion.div>
                    <motion.div className="-mt-[1vw]" {...appearTextAnimation}>
                        <p className="text-nowrap font-russoone text-[2.8vw] font-normal text-white">
                            PH S15 Week 4
                        </p>
                    </motion.div>
                    <motion.div className="mt-[1vw]" {...appearTextAnimation}>
                        <p className="text-nowrap font-montserrat text-[2.8vw] font-normal text-white">
                            MAR 28, 2024
                        </p>
                    </motion.div>
                    <motion.div
                        className="mt-[0.5vw] bg-graylight px-[1.5vw] py-[0.5vw]"
                        {...appearTextAnimation}
                    >
                        <p className="text-nowrap font-montserrat text-[2.8vw] font-normal text-white">
                            5:00 PM
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    className="absolute bottom-[2.5vw] flex"
                    {...appearTextAnimation}
                >
                    <button className="relative flex h-[5.5vw] justify-center">
                        <img className="h-full" src={MatchButton} />
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <p className="font-russoone text-[2.4vw] font-normal text-white">
                                View Details
                            </p>
                        </div>
                    </button>
                </motion.div>
                <div className="absolute left-[6vw] top-[10vw] h-[10vw] w-[26vw]">
                    <TeamCard color={color} />
                </div>
                <div className="absolute bottom-[6vw] left-[6vw] flex h-[6vw] w-[26vw] justify-center pl-[5vw]">
                    <img className="h-full" src={LoseLeft} />
                    <img className="-ml-[2vw] h-full" src={WinLeft} />
                    <img className="-ml-[2vw] h-full" src={WinLeft} />
                </div>
                <div className="absolute right-[6vw] top-[10vw] h-[10vw] w-[26vw]">
                    <TeamCard color={color} />
                </div>
                <div className="absolute bottom-[6vw] right-[6vw] flex h-[6vw] w-[26vw] justify-center pr-[5vw]">
                    <img className="h-full" src={WinRight} />
                    <img className="-ml-[2vw] h-full" src={WinRight} />
                    <img className="-ml-[2vw] h-full" src={LoseRight} />
                </div>
            </div>
        </div>
    );
};
