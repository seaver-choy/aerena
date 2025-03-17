import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { Athlete, AthleteStats } from "../../../../helpers/interfaces";
import { getAthleteAllTimeAverageMoontonStats } from "../../../../helpers/lambda.helper";
import { AthleteCard } from "../../../../components/AthleteCard";
import { StatsDisplay } from "../StatsDisplay";

import AthleteHeaderSonner from "../../../../assets/sonner/athlete-header.svg";
import AthleteHeaderBackground from "../../../../assets/background/athlete-header.svg";

interface Props {
    athlete: Athlete;
}
export const AthleteHeader = ({ athlete }: Props) => {
    const [showAthleteHeader, setShowAthleteHeader] = useState(false);
    const user = useUsers();
    const ign = athlete.player;
    const role = athlete.position[0];
    const [averageStats, setAverageStats] = useState<AthleteStats>(null);

    const color = {
        main: getBaseTeamColor().main,
        light: getBaseTeamColor().light,
        dark: getBaseTeamColor().dark,
        wings: getBaseTeamColor().wings,
        accent: getBaseTeamColor().accent,
        details: getBaseTeamColor().details,
        wave: getBaseTeamColor().wave,
    };

    const opacity = {
        wave: getBaseTeamColor().wave,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAthleteHeader(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchAthleteAllTimeAverageMoontonStats = async () => {
            const res = await getAthleteAllTimeAverageMoontonStats(
                athlete.athleteId,
                user.initDataRaw
            );

            if (res.status === "success") {
                setAverageStats(res.average[0]);
            } else {
                //TODO: Handle error
                console.log(res);
            }
        };
        fetchAthleteAllTimeAverageMoontonStats();
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
                                text={"KILLS"}
                                value={
                                    averageStats !== undefined
                                        ? averageStats.averageKills
                                        : 0
                                }
                                noStats={
                                    averageStats === undefined ? true : false
                                }
                            />
                            <StatsDisplay
                                text={"DEATHS"}
                                value={
                                    averageStats !== undefined
                                        ? averageStats.averageDeaths
                                        : 0
                                }
                                noStats={
                                    averageStats === undefined ? true : false
                                }
                            />
                            <StatsDisplay
                                text={"ASSISTS"}
                                value={
                                    averageStats !== undefined
                                        ? averageStats.averageAssists
                                        : 0
                                }
                                noStats={
                                    averageStats === undefined ? true : false
                                }
                            />
                            <StatsDisplay
                                text={"POINTS"}
                                value={
                                    averageStats !== undefined
                                        ? averageStats.averagePoints
                                        : 0
                                }
                                noStats={
                                    averageStats === undefined ? true : false
                                }
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
