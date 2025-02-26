import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    pulseAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import GoldButton from "../../../../assets/button/gold.svg";
import { AthleteCard } from "../../../../components/AthleteCard";
import { useUsers } from "../../../../hooks/useUser";
import {
    Athlete,
    SameAthlete,
    AverageStats,
} from "../../../../helpers/interfaces";
import { StatsDisplay } from "../../../../components/StatsDisplay";
import { getAthleteLeagueStats } from "../../../../helpers/lambda.helper";
import StatsBannerSonner from "../../../../assets/sonner/stats-banner.svg";

interface Props {
    athlete: Athlete;
    sameAthletes: SameAthlete[];
    competitionType: string;
}

export const Stats = ({ athlete, sameAthletes, competitionType }: Props) => {
    const user = useUsers();
    const [showStatsBanner, setShowStatsBanner] = useState(false);
    const [leagueStats, setLeagueStats] = useState<AverageStats[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStatsBanner(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        async function fetchLeagueStats() {
            const res = await getAthleteLeagueStats(
                athlete.athleteId,
                competitionType,
                user.initDataRaw
            );
            console.log(res);
            if (res.results) {
                setLeagueStats(res.leagueStats);
            }
        }
        fetchLeagueStats();
    }, []);

    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {sameAthletes?.map((athlete) => {
                console.log("test");
                let noStats = false;
                let stats: AverageStats | undefined;
                if (leagueStats.length > 0) {
                    stats = leagueStats.find(
                        (x) => x.league === athlete.league
                    );
                } else {
                    noStats = true;
                }

                // const displayAthlete = sameAthletes.find(
                //     (x) => x.league === stats.league
                // );
                return (
                    <>
                        {showStatsBanner ? (
                            <div className="flex h-[44.28vw] gap-[4vw] px-[2vw]">
                                <div>
                                    <motion.div
                                        className="h-[41.6vw] w-[32vw]"
                                        {...appearCardAnimation}
                                    >
                                        <AthleteCard
                                            color={athlete.teamData.colors}
                                            ign={athlete.player}
                                            opacity={{
                                                wave: athlete.teamData.colors
                                                    .wave,
                                            }}
                                            role={athlete.position[0]}
                                            type={"basic"}
                                            league={athlete.league}
                                        />
                                    </motion.div>
                                </div>
                                <div className="flex h-[44.28vw] w-full flex-col gap-[2vw]">
                                    <div className="mt-[2vw] flex flex-col items-end gap-[2vw]">
                                        <div className="flex gap-[2vw]">
                                            <StatsDisplay
                                                text={"KILLS"}
                                                value={
                                                    stats !== undefined
                                                        ? stats.averageKills
                                                        : 0
                                                }
                                                fromStats={true}
                                                noStats={noStats}
                                            />

                                            <StatsDisplay
                                                text={"ASSISTS"}
                                                value={
                                                    stats !== undefined
                                                        ? stats.averageAssists
                                                        : 0
                                                }
                                                fromStats={true}
                                                noStats={noStats}
                                            />
                                        </div>
                                        <div className="flex gap-[2vw]">
                                            <StatsDisplay
                                                text={"DEATHS"}
                                                value={
                                                    stats !== undefined
                                                        ? stats.averageDeaths
                                                        : 0
                                                }
                                                fromStats={true}
                                                noStats={noStats}
                                            />
                                            <StatsDisplay
                                                text={"POINTS"}
                                                value={
                                                    stats !== undefined
                                                        ? stats.averagePoints
                                                        : 0
                                                }
                                                fromStats={true}
                                                noStats={noStats}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-[2vw] flex">
                                        <div className="ml-[2vw] flex h-full w-[40%] items-center">
                                            <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                                                {athlete.team}
                                            </p>
                                        </div>
                                        <div className="flex h-full w-[60%] justify-end">
                                            <motion.button
                                                className="relative flex h-[7vw] justify-center"
                                                {...appearTextAnimation}
                                            >
                                                <img
                                                    className="h-full"
                                                    src={GoldButton}
                                                />
                                                <div className="absolute flex h-full items-center">
                                                    <p className="mt-[0.2vw] font-russoone text-[3vw] text-white">
                                                        Full Stats
                                                    </p>
                                                </div>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[46.8vw] bg-loading">
                                <motion.div
                                    className="relative"
                                    {...pulseAnimation}
                                >
                                    <img
                                        className="h-full w-full"
                                        src={StatsBannerSonner}
                                    />
                                </motion.div>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
};
