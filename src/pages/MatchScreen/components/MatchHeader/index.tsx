import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import MatchBackground from "../../../../assets/background/match.svg";
import MatchSonner from "../../../../assets/sonner/match.svg";
import SampleTeam from "../../../../assets/card/sample-team.svg";
import AerenaLogo from "../../../../assets/logo/aerena-text.svg";

export const MatchHeader = () => {
    const [showMatchBanner, setShowMatchBanner] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setShowMatchBanner(true), 500);
    }, []);

    return (
        <div>
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
                            <p className="text-nowrap font-russoone text-[2.6vw] font-normal text-white">
                                Upper Quarterfinals
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[2.2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap font-montserrat text-[2.8vw] font-normal text-white">
                                Mar 28, 2025
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
                        <motion.div className="mt-[5vw] h-[5vw] w-[18vw]">
                            <img className="h-full w-full" src={AerenaLogo} />
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute left-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                        {...appearAnimation}
                    >
                        <img className="h-full w-full" src={SampleTeam} />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[12vw] left-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pl-[5vw]"
                        {...appearAnimation}
                    ></motion.div>
                    <motion.div
                        className="absolute right-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                        {...appearAnimation}
                    >
                        <img className="h-full w-full" src={SampleTeam} />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-[12vw] right-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pr-[5vw]"
                        {...appearAnimation}
                    ></motion.div>
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
