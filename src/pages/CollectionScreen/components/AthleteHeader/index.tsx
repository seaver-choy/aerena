import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { AthleteCard } from "../../../../components/AthleteCard";
import { Athlete, AverageStats } from "../../../../helpers/interfaces";
import { StatsDisplay } from "../../../../components/StatsDisplay";
import AthleteHeaderSonner from "../../../../assets/sonner/athlete-header.svg";
import AthleteHeaderBackground from "../../../../assets/background/athlete-header.svg";
import StatsBackground from "../../../../assets/background/stats.svg";

interface Props {
    athlete: Athlete;
    averageStats: AverageStats;
}
export const AthleteHeader = ({ athlete, averageStats }: Props) => {
    const [showAthleteHeader, setShowAthleteHeader] = useState(false);

    const team = {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        wings: "#D8A956",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };
    console.log(athlete);
    const ign = athlete.player;
    const role = athlete.position[0];

    const color = {
        main: team.main,
        light: team.light,
        dark: team.dark,
        wings: team.wings,
        accent: team.accent,
        details: team.details,
        wave: team.wave,
    };

    const opacity = {
        wave: team.wave,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAthleteHeader(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {showAthleteHeader ? (
                <div className="h-[51.6vw]">
                    <div className="relative flex bg-graydark">
                        <img
                            className="h-full w-full"
                            src={AthleteHeaderBackground}
                        />
                        <motion.div
                            className="absolute left-[8vw] top-[4vw] h-[32vw] w-[24.62vw]"
                            {...appearCardAnimation}
                        >
                            <AthleteCard
                                color={color}
                                ign={ign}
                                opacity={opacity}
                                role={role}
                            />
                        </motion.div>
                        <div className="absolute left-[36.62vw] top-[4vw] h-[32vw] w-[55.38vw] flex-col pt-[4vw]">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="font-montserrat text-[3.5vw] font-semibold text-white">
                                    {athlete.team}
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[6.5vw] text-white">
                                    {athlete.player}
                                </p>
                            </motion.div>
                            <motion.div
                                className="mt-[1vw] flex items-center justify-center bg-gold px-[2vw] py-[0.5vw]"
                                style={{ width: "fit-content" }}
                                {...slideRightTextAnimation}
                            >
                                <p className="font-montserrat text-[3vw] font-semibold text-white">
                                    {athlete.position[0]}
                                </p>
                            </motion.div>
                        </div>
                        <div className="absolute -bottom-[6vw] left-[4vw] flex h-[12vw] w-[92vw] gap-[2vw]">
                            <StatsDisplay
                                statText={"KILLS"}
                                statValue={averageStats.averageKills}
                            />
                            <StatsDisplay
                                statText={"DEATHS"}
                                statValue={averageStats.averageDeaths}
                            />
                            <StatsDisplay
                                statText={"ASSISTS"}
                                statValue={averageStats.averageAssists}
                            />
                            <StatsDisplay
                                statText={"POINTS"}
                                statValue={averageStats.averagePoints}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[51.6vw]">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteHeaderSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
