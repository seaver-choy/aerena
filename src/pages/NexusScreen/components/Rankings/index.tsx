import { useEffect, useState } from "react";
import { rankingsOptions } from "../../../../helpers/tabs";
import { FunctionSection } from "../../../../components/FunctionSection";
import { Tabs } from "../../../../components/Tabs";
import { TitleSection } from "../../../../components/TitleSection";
import { Loading } from "../../../../components/Loading";
import { RankLeaderboard } from "../RankLeaderboard";
import {
    getCountriesWithSchedule,
    getFilteredLeaguesWithSchedule,
    getRankingStats,
    getScheduleWeeks,
} from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import { getCountryCode, getCountryFull } from "../../../../helpers/utilities";
import { RankingInfo, WeekInfo } from "../../../../helpers/interfaces";
import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";

export const Rankings = () => {
    const user = useUsers();
    const [rankingsTab, setRankingsTab] = useState("Kills");
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>(null);
    const [regions, setRegions] = useState<string[]>(null);
    const [chosenRegion, setChosenRegion] = useState<string>(null);
    const [averageRankingStats, setAverageRankingStats] =
        useState<RankingInfo[]>(null);
    const [totalRankingStats, setTotalRankingStats] =
        useState<RankingInfo[]>(null);
    const [maxRankingStats, setMaxRankingStats] = useState<RankingInfo[]>(null);
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
    const [weekInfos, setWeekInfos] = useState<WeekInfo[]>(null);
    const [weekIndex, setWeekIndex] = useState<number>(0);
    const [rankingsLoaded, setRankingsLoaded] = useState<boolean>(false);
    const [dataSorted, setDataSorted] = useState<boolean>(false);

    const fetchInitialData = async () => {
        const regionsResult = await getCountriesWithSchedule(user.initDataRaw);
        setRegions([/*"ALL",*/ ...regionsResult]);
        setChosenRegion(getCountryFull(user.country));
    };

    // function removeDuplicates(
    //     stats: RankingInfo[],
    //     statName: string
    // ): RankingInfo[] {
    //     const seen = new Map<string, RankingInfo>();

    //     return stats.reduce<RankingInfo[]>((uniqueItems, currentItem) => {
    //         const key = `${currentItem.athleteId}-${currentItem.player}-${currentItem.team}-${currentItem.league}-${statName == "kills" ? currentItem.kills : statName == "assists" ? currentItem.assists : statName == "kda" ? currentItem.kda : statName == "points" ? currentItem.points : ""}`;
    //         const existingItem = seen.get(key);
    //         if (!existingItem) {
    //             seen.set(key, currentItem);
    //             uniqueItems.push(currentItem);
    //         }

    //         return uniqueItems;
    //     }, []);
    // }

    const sortData = async () => {
        switch (rankingsTab) {
            case "Kills": {
                setAverageRankingStats(
                    [...averageRankingStats].sort((a, b) => {
                        const killsDiff = b.kills - a.kills;
                        return killsDiff !== 0
                            ? killsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setTotalRankingStats(
                    [...totalRankingStats].sort((a, b) => {
                        const killsDiff = b.kills - a.kills;
                        return killsDiff !== 0
                            ? killsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setMaxRankingStats(
                    [...maxRankingStats].sort((a, b) => {
                        const killsDiff = b.kills - a.kills;
                        return killsDiff !== 0
                            ? killsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                break;
            }
            case "Assists": {
                setAverageRankingStats(
                    [...averageRankingStats].sort((a, b) => {
                        const assistsDiff = b.assists - a.assists;
                        return assistsDiff !== 0
                            ? assistsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setTotalRankingStats(
                    [...totalRankingStats].sort((a, b) => {
                        const assistsDiff = b.assists - a.assists;
                        return assistsDiff !== 0
                            ? assistsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setMaxRankingStats(
                    [...maxRankingStats].sort((a, b) => {
                        const assistsDiff = b.assists - a.assists;
                        return assistsDiff !== 0
                            ? assistsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                break;
            }
            case "KDA": {
                setAverageRankingStats(
                    [...averageRankingStats].sort((a, b) => {
                        const kdaDiff = b.kda - a.kda;
                        return kdaDiff !== 0
                            ? kdaDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setMaxRankingStats(
                    [...maxRankingStats].sort((a, b) => {
                        const kdaDiff = b.kda - a.kda;
                        return kdaDiff !== 0
                            ? kdaDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                break;
            }
            case "MVP": {
                setTotalRankingStats(
                    [...totalRankingStats].sort((a, b) => {
                        const mvpDiff = b.mvpCount - a.mvpCount;
                        return mvpDiff !== 0
                            ? mvpDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                break;
            }
            case "Points": {
                setAverageRankingStats(
                    [...averageRankingStats].sort((a, b) => {
                        const pointsDiff = b.points - a.points;
                        return pointsDiff !== 0
                            ? pointsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setTotalRankingStats(
                    [...totalRankingStats].sort((a, b) => {
                        const pointsDiff = b.points - a.points;
                        return pointsDiff !== 0
                            ? pointsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                setMaxRankingStats(
                    [...maxRankingStats].sort((a, b) => {
                        const pointsDiff = b.points - a.points;
                        return pointsDiff !== 0
                            ? pointsDiff
                            : a.player.localeCompare(b.player);
                    })
                );
                break;
            }
        }
        setDataSorted(true);
    };

    const updateRegions = async () => {
        const leaguesResult = await getFilteredLeaguesWithSchedule(
            getCountryCode(chosenRegion),
            user.initDataRaw
        );
        setLeagueTypes(["ALL", ...leaguesResult]);
        setChosenLeagueType(
            leaguesResult.length > 0 ? leaguesResult[0] : "ALL"
        );
        if (leaguesResult.length > 0) {
            const weeksResult = await getScheduleWeeks(
                leaguesResult[0],
                user.initDataRaw
            );
            setWeekInfos([{ week: 0, playoffs: false }, ...weeksResult]);
        }
    };

    const updateRankings = async () => {
        setShowLeaderboard(false);
        const result = await getRankingStats(
            chosenLeagueType == "ALL"
                ? getCountryCode(chosenRegion)
                : chosenLeagueType,
            chosenLeagueType == "ALL" ? 0 : weekIndex,
            rankingsTab.toLowerCase(),
            user.initDataRaw
        );
        setTotalRankingStats(result.total);
        setAverageRankingStats(result.average);
        setMaxRankingStats(result.max);
        setRankingsLoaded(true);
    };

    const changeSchedule = async (index) => {
        if (weekIndex != index) {
            setWeekIndex(index);
            setShowLeaderboard(false);
        }
    };

    const handleChosenRegion = async (choice) => {
        setChosenRegion(choice);
        setWeekIndex(0);
        setDataSorted(false);
        setShowLeaderboard(false);
    };

    const handleChosenLeagueType = async (choice) => {
        setChosenLeagueType(choice);
        setWeekIndex(0);
        setDataSorted(false);
        setShowLeaderboard(false);
        if (choice != "ALL") {
            const weeksResult = await getScheduleWeeks(
                choice,
                user.initDataRaw
            );
            setWeekInfos([{ week: 0, playoffs: false }, ...weeksResult]);
        } else setWeekInfos(null);
    };

    useEffect(() => {
        if (chosenRegion != null) {
            setRankingsLoaded(false);
            updateRegions();
        }
    }, [chosenRegion]);

    useEffect(() => {
        if (chosenLeagueType != null) {
            setRankingsLoaded(false);
            updateRankings();
        }
    }, [chosenLeagueType, rankingsTab, weekIndex]);

    useEffect(() => {
        if (
            averageRankingStats != null &&
            totalRankingStats != null &&
            maxRankingStats != null &&
            rankingsLoaded
        ) {
            sortData();

            setShowLeaderboard(false);
            const timer = setTimeout(() => {
                setShowLeaderboard(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [rankingsLoaded]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div>
            <FunctionSection
                title="Filter Options"
                regions={regions}
                chosenRegion={chosenRegion}
                setChosenRegion={handleChosenRegion}
                leagueTypes={leagueTypes}
                chosenLeagueType={chosenLeagueType}
                setChosenLeagueType={handleChosenLeagueType}
                showRegionButton={true}
                showLeagueButton={true}
            />
            <Tabs
                options={rankingsOptions}
                onToggle={(selected) => {
                    setRankingsTab(selected);
                }}
                selectedTab={rankingsTab}
                disabled={!dataSorted}
            />
            {dataSorted ? (
                <div>
                    {weekInfos != null && chosenLeagueType != "ALL" && (
                        <div className="mx-[6vw] mt-[4vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none]">
                            {weekInfos.map((weekInfo, index) => (
                                <button
                                    key={index}
                                    className={`items-center justify-center ${index == weekIndex ? "bg-graydark" : ""} px-[2vw]`}
                                    onClick={() => changeSchedule(index)}
                                >
                                    <motion.p
                                        className={`text-nowrap font-russoone text-[3.5vw] ${index == weekIndex ? "text-white" : "text-gold"}`}
                                        {...appearTextAnimation}
                                    >
                                        {weekInfo.week == 0
                                            ? "ALL"
                                            : weekInfo.playoffs
                                              ? "PLAYOFFS"
                                              : "WEEK " + weekInfo.week}
                                    </motion.p>
                                </button>
                            ))}
                        </div>
                    )}
                    {rankingsTab != "MVP" && (
                        <div>
                            <TitleSection title="AVERAGES" />
                            <RankLeaderboard
                                rankingsTab={rankingsTab}
                                rankingStats={averageRankingStats}
                                statType={"Average"}
                                showLeaderboard={showLeaderboard}
                            />
                        </div>
                    )}
                    {rankingsTab != "KDA" && (
                        <div>
                            <TitleSection title="TOTALS" />
                            <RankLeaderboard
                                rankingsTab={rankingsTab}
                                rankingStats={totalRankingStats}
                                statType={"Total"}
                                showLeaderboard={showLeaderboard}
                            />
                        </div>
                    )}
                    {rankingsTab != "MVP" && (
                        <div>
                            <TitleSection title="GAME HIGH" />
                            <RankLeaderboard
                                rankingsTab={rankingsTab}
                                rankingStats={maxRankingStats}
                                statType={"Max"}
                                showLeaderboard={showLeaderboard}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-[15vh] flex items-center justify-center">
                    <Loading />
                </div>
            )}
        </div>
    );
};
