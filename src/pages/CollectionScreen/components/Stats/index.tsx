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
    const [showStatsBanner, setShowStatsBanner] = useState(false);
    const user = useUsers();

    const [leagueStats, setLeagueStats] = useState<AverageStats[]>([]);
    // const team = {
    //     main: "#333",
    //     light: "#D8A956",
    //     dark: "#AB750F",
    //     wings: "#D8A956",
    //     accent: "#fff",
    //     details: "#fff",
    //     wave: "0.15",
    // };

    // const ign = athlete.player;
    // const role = athlete.position[0];

    // const color = {
    //     main: team.main,
    //     light: team.light,
    //     wings: team.wings,
    //     dark: team.dark,
    //     accent: team.accent,
    //     details: team.details,
    //     wave: team.wave,
    // };

    // const opacity = {
    //     wave: team.wave,
    // };

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
            setLeagueStats(res.leagueStats);
        }
        fetchLeagueStats();
    }, []);

    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {sameAthletes?.map((athlete) => {
                let noStats = false;
                const stats = leagueStats.find(
                    (x) => x.league === athlete.league
                );
                if (stats === undefined) {
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
                                                GEEK PH
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
                                                    <p className="font-russoone text-[3vw] text-white">
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
            {/* {showStatsBanner ? (
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
                                                POINTS
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
                                                POINTS
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
                                                POINTS
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
            )} */}
        </div>
    );
};
