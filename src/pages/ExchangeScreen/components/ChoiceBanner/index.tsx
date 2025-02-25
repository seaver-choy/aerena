import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import ChoicePackBackground from "../../../../assets/background/pack-choice.svg";
import Basic from "../../../../assets/pack/basic.svg";
import PH15Sticker from "../../../../assets/sticker/ph15.svg";
import AerenaTextLogo from "../../../../assets/logo/aerena-text.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import BlackButton from "../../../../assets/button/black.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";

export const ChoiceBanner = () => {
    return (
        <div className="relative mt-[4vw] h-[74.8vw]">
            <img className="h-full w-full" src={ChoicePackBackground} />
            <motion.div
                className="absolute -left-[6vw] top-[7vw] h-[64vw] -rotate-[5deg]"
                initial={{ opacity: 1, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{
                    scale: {
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    },
                }}
            >
                <img className="h-full" src={Basic} />
            </motion.div>
            <motion.div
                className="absolute right-[3vw] top-[2vw] h-[15vw] w-[15vw]"
                {...appearAnimation}
            >
                <img className="h-full w-full" src={PH15Sticker} />
            </motion.div>
            <div className="absolute right-[4vw] top-[15vw] flex w-[50vw] flex-col">
                <motion.div
                    className="h-[5vw] w-full"
                    {...slideRightTextAnimation}
                >
                    <img className="h-full" src={AerenaTextLogo} />
                </motion.div>
                <div className="mt-[1vw] flex w-full">
                    <motion.p
                        className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent"
                        {...slideRightTextAnimation}
                    >
                        Choice Pack
                    </motion.p>
                </div>
                <div className="flex w-full">
                    <motion.p
                        className="font-montserrat text-[2.8vw] text-graydark"
                        {...slideRightTextAnimation}
                    >
                        Choose a skin with the Choice Pack. One pick, two
                        possibilities.
                    </motion.p>
                </div>
            </div>
            <div className="absolute bottom-[8vw] right-[12vw] flex flex-col gap-[2vw]">
                <motion.button
                    className="relative h-[8vw] w-[38vw]"
                    {...appearTextAnimation}
                >
                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                        <img className="h-[3vw]" src={TGStarIcon}></img>
                        <p className="pt-[0.5vw] font-russoone text-[3.2vw] text-white">
                            30
                        </p>
                    </div>
                    <img className="h-full w-full" src={GoldButton} />
                </motion.button>
                <motion.button
                    className="relative h-[8vw] w-[38vw]"
                    {...appearTextAnimation}
                >
                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                        <img className="h-[3vw]" src={BattlePointsIcon}></img>
                        <p className="font-russoone text-[3.2vw] text-white">
                            200,000
                        </p>
                    </div>
                    <img className="h-full w-full" src={BlackButton} />
                </motion.button>
            </div>
        </div>
    );
};
