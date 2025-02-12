import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { AthleteCard } from "../../../../components/AthleteCard";

import StatsBannerSonner from "../../../../assets/sonner/stats-banner.svg";
import StatsBackground from "../../../../assets/background/stats.svg";
import GoldButton from "../../../../assets/button/gold.svg";

export const LocalStats = () => {
    const [showStatsBanner, setShowStatsBanner] = useState(false);

    const athlete = {
        ign: "KELRA",
        role: "Gold",
    };

    const team = {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };

    const ign = athlete.ign;
    const role = athlete.role;

    const color = {
        main: team.main,
        light: team.light,
        dark: team.dark,
        accent: team.accent,
        details: team.details,
        wave: team.wave,
    };

    const opacity = {
        wave: team.wave,
    };

    const count = useMotionValue(0);
    const stats = useTransform(() => count.get().toFixed(2));

    useEffect(() => {
        const controls = animate(count, 10, { duration: 1.5 });
        return () => controls.stop();
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStatsBanner(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {showStatsBanner ? (
                <div className="flex h-[44.28vw] gap-[4vw] px-[2vw]">
                    <div>
                        <motion.div
                            className="h-[41.6vw] w-[32vw]"
                            {...appearCardAnimation}
                        >
                            <AthleteCard
                                color={color}
                                ign={ign}
                                opacity={opacity}
                                role={role}
                            />
                        </motion.div>
                    </div>
                    <div className="flex h-[44.28vw] w-full flex-col gap-[2vw]">
                        <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                KILLS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                ASSISTS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                DEATHS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                PPG
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="mt-[2vw] flex items-start justify-end">
                            <motion.button
                                className="relative flex h-[8vw] justify-center"
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        Full Stats
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[46.8vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={StatsBannerSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showStatsBanner ? (
                <div className="flex h-[44.28vw] gap-[4vw] px-[2vw]">
                    <div>
                        <motion.div
                            className="h-[41.6vw] w-[32vw]"
                            {...appearCardAnimation}
                        >
                            <AthleteCard
                                color={color}
                                ign={ign}
                                opacity={opacity}
                                role={role}
                            />
                        </motion.div>
                    </div>
                    <div className="flex h-[44.28vw] w-full flex-col gap-[2vw]">
                        <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                KILLS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                ASSISTS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                DEATHS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                PPG
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="mt-[2vw] flex items-start justify-end">
                            <motion.button
                                className="relative flex h-[8vw] justify-center"
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        Full Stats
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[46.8vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={StatsBannerSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showStatsBanner ? (
                <div className="flex h-[44.28vw] gap-[4vw] px-[2vw]">
                    <div>
                        <motion.div
                            className="h-[41.6vw] w-[32vw]"
                            {...appearCardAnimation}
                        >
                            <AthleteCard
                                color={color}
                                ign={ign}
                                opacity={opacity}
                                role={role}
                            />
                        </motion.div>
                    </div>
                    <div className="flex h-[44.28vw] w-full flex-col gap-[2vw]">
                        <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                KILLS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                ASSISTS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex gap-[2vw]">
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                DEATHS
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="h-[13.14vw] w-[24vw]"
                                    {...appearAnimation}
                                >
                                    <div className="relative flex h-full w-full">
                                        <img
                                            className="h-full w-full"
                                            src={StatsBackground}
                                        />
                                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                                                PPG
                                            </p>
                                            <motion.pre className="-mt-[1vw] font-russoone text-[5vw] font-normal text-white">
                                                {stats}
                                            </motion.pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="mt-[2vw] flex items-start justify-end">
                            <motion.button
                                className="relative flex h-[8vw] justify-center"
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full items-center">
                                    <p className="font-russoone text-[3vw] text-white">
                                        Full Stats
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[46.8vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={StatsBannerSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
