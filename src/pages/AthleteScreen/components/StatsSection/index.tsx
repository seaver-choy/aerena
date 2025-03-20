import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { AthleteCard } from "../../../../components/AthleteCard";
import {
    Athlete,
    SameAthlete,
    AthleteStats,
} from "../../../../helpers/interfaces";
import { getAthleteLeagueStats } from "../../../../helpers/lambda.helper";
import { StatsDetails } from "../StatsDetails";
import { StatsDisplay } from "../StatsDisplay";

import StatsBannerSonner from "../../../../assets/sonner/stats-banner.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface Props {
    athlete: Athlete;
    sameAthletes: SameAthlete[];
    reset: boolean;
    handleReset: () => void;
    competitionType: string;
}

export const StatsSection = ({
    athlete,
    sameAthletes,
    reset,
    handleReset,
    competitionType,
}: Props) => {
    const user = useUsers();
    const [showStatsBanner, setShowStatsBanner] = useState(false);
    const [leagueStats, setLeagueStats] = useState<AthleteStats[]>([]);
    // const [currentAthlete, setCurrentAthlete] = useState<Athlete>(null);
    const [showStatsDetails, setShowStatsDetails] = useState<boolean>(false);
    const [leagueIndex, setLeagueIndex] = useState<number>(-1);

    const handleFullDetails = (league: string) => {
        setShowStatsDetails(true);
        setLeagueIndex(sameAthletes.findIndex((x) => x.league === league));
    };

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
            if (res.results) {
                setLeagueStats(res.leagueStats);
            }
        }
        fetchLeagueStats();
    }, []);

    useEffect(() => {
        if (reset) {
            setShowStatsDetails(false);
            handleReset();
        }
    }, [reset]);

    return !showStatsDetails ? (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {sameAthletes?.map((athlete) => {
                let noStats = false;
                let stats: AthleteStats | undefined;
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
                            <div className="flex flex-col gap-[2vw]">
                                {/* <div className="ml-[3vw]">
                                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                                        MPL Philippines Season 1
                                    </p>
                                </div> */}
                                <div className="flex h-[44.28vw] gap-[4vw] px-[2vw]">
                                    <div>
                                        <motion.div
                                            className="h-[41.6vw] w-[32vw] overflow-hidden"
                                            {...appearCardAnimation}
                                        >
                                            <AthleteCard
                                                color={athlete.teamData.colors}
                                                ign={athlete.player}
                                                opacity={{
                                                    wave: athlete.teamData
                                                        .colors.wave,
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
                                            <div className="ml-[2vw] flex h-full w-[40%] items-center overflow-hidden">
                                                <motion.div
                                                    className="will-change-transform backface-hidden"
                                                    {...appearAnimation}
                                                >
                                                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                                                        {athlete.team}
                                                    </p>
                                                </motion.div>
                                            </div>
                                            <div className="flex h-full w-[60%] justify-end">
                                                <motion.button
                                                    className="relative flex h-[7vw] justify-center"
                                                    onClick={() =>
                                                        handleFullDetails(
                                                            athlete.league
                                                        )
                                                    }
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
    ) : (
        <StatsDetails
            leagueIndex={leagueIndex}
            athlete={athlete}
            sameAthletes={sameAthletes}
        />
    );
};
