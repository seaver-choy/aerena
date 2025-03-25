import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import RankingsLeaderBoardBackground from "../../../../assets/background/rankings-leaderboard.svg";
import RankingsLeaderboardSonner from "../../../../assets/sonner/rankings-leaderboard.svg";
import RankingsItemBackground from "../../../../assets/background/rankings-item.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface RankLeaderboardProps {
    category: string;
    subCategory: string;
}

export const RankLeaderboard = ({
    category,
    subCategory,
}: RankLeaderboardProps) => {
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLeaderboard(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-[4vw] h-[128.4vw]">
            {showLeaderboard ? (
                <div className="relative flex justify-center">
                    <img
                        className="h-full w-full"
                        src={RankingsLeaderBoardBackground}
                    />
                    <motion.div
                        className="absolute top-[23.5vw] flex flex-col justify-center"
                        {...appearTextAnimation}
                    >
                        <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[2.5vw] text-transparent">
                            {subCategory}
                        </p>
                        <p className="-mt-[2vw] text-center font-russoone text-[6vw] text-white">
                            {category}
                        </p>
                    </motion.div>
                    <div className="absolute top-[43vw] flex flex-col justify-center gap-[2vw]">
                        <motion.div
                            className="relative flex h-[9vw] w-[64vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        1
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        SPIDER MILEZ
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                        00.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[9vw] w-[64vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        2
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        MP THE KING
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                        00.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[9vw] w-[64vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        3
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        KENYYZSKIEE
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                        100
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[9vw] w-[64vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        4
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        AERONNSHIKII
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                        0.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative flex h-[9vw] w-[64vw]"
                            {...slideRightTextAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={RankingsItemBackground}
                            />
                            <div className="absolute flex h-full w-full">
                                <div className="flex h-full w-[15%] items-center justify-center pl-[1vw]">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        5
                                    </p>
                                </div>
                                <div className="flex h-full w-[60%] items-center">
                                    <p className="font-russoone text-[3.2vw] text-white">
                                        SUPER FRINCE
                                    </p>
                                </div>
                                <div className="flex h-full w-[25%] items-center justify-center">
                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                        0.00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-[2vw] flex justify-center"
                            {...appearTextAnimation}
                        >
                            <button className="relative flex h-[7vw] justify-center">
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <p className="font-russoone text-[2.8vw] font-normal text-white">
                                        View All
                                    </p>
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div className="h-[128.4vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={RankingsLeaderboardSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
