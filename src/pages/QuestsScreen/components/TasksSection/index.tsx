import { motion } from "motion/react";
import {
    appearAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import ActionIcon from "../../../../assets/icon/action.svg";
import ClaimIcon from "../../../../assets/icon/claim.svg";
import ClaimedIcon from "../../../../assets/icon/claimed.svg";

export const TasksSection = () => {
    return (
        <div className="mx-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
            <div className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[3vw]">
                    <div className="flex h-full w-[80%] flex-col">
                        <motion.div
                            className="flex"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                Enter a Referral Code
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="mt-[1.2vw] h-[5vw]"
                                src={BattlePointsIcon}
                            />
                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                                200,000
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                        <motion.button className="h-[8vw]" {...appearAnimation}>
                            <img className="h-full" src={ClaimedIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[3vw]">
                    <div className="flex h-full w-[80%] flex-col">
                        <motion.div
                            className="flex"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                Join Aerena Community
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="mt-[1.2vw] h-[5vw]"
                                src={BattlePointsIcon}
                            />
                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                                50,000
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                        <motion.button className="h-[8vw]" {...appearAnimation}>
                            <img className="h-full" src={ClaimIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[3vw]">
                    <div className="flex h-full w-[80%] flex-col">
                        <motion.div
                            className="flex"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                Join Aerena Channel
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="mt-[1.2vw] h-[5vw]"
                                src={BattlePointsIcon}
                            />
                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                                50,000
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                        <motion.button className="h-[8vw]" {...appearAnimation}>
                            <img className="h-full" src={ActionIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[3vw]">
                    <div className="flex h-full w-[80%] flex-col">
                        <motion.div
                            className="flex"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                Refer a Friend
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="mt-[1.2vw] h-[5vw]"
                                src={BattlePointsIcon}
                            />
                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                                10,000
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                        <motion.button className="h-[8vw]" {...appearAnimation}>
                            <img className="h-full" src={ActionIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
