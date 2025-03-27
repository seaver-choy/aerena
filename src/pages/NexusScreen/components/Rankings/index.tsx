import { useEffect, useState } from "react";
import { rankingsOptions } from "../../../../helpers/tabs";
import { FunctionSection } from "../../../../components/FunctionSection";
import { Tabs } from "../../../../components/Tabs";
import { TitleSection } from "../../../../components/TitleSection";
import { RankLeaderboard } from "../RankLeaderboard";
import {
    getCountries,
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
    const [allRankingStats, setAllRankingStats] = useState<RankingInfo[]>(null);
    const [averageRankingStats, setAverageRankingStats] =
        useState<RankingInfo[]>(null);
    const [totalRankingStats, setTotalRankingStats] =
        useState<RankingInfo[]>(null);
    const [maxRankingStats, setMaxRankingStats] = useState<RankingInfo[]>(null);
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
    const [weekInfos, setWeekInfos] = useState<WeekInfo[]>(null);
    const [weekIndex, setWeekIndex] = useState<number>(0);

    const fetchInitialData = async () => {
        const regionsResult = await getCountries(user.initDataRaw);
        setRegions([/*"ALL",*/ ...regionsResult]);
        setChosenRegion(getCountryFull(user.country));
    };

    const sortData = async () => {
        switch (rankingsTab) {
            case "Kills": {
                setAverageRankingStats(
                    [...allRankingStats].sort((a, b) => b.avgKills - a.avgKills)
                );
                setTotalRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.totalKills - a.totalKills
                    )
                );
                setMaxRankingStats(
                    [...allRankingStats].sort((a, b) => b.maxKills - a.maxKills)
                );
                break;
            }
            case "Assists": {
                setAverageRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.avgAssists - a.avgAssists
                    )
                );
                setTotalRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.totalAssists - a.totalAssists
                    )
                );
                setMaxRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.maxAssists - a.maxAssists
                    )
                );
                break;
            }
            case "KDA": {
                setAverageRankingStats(
                    [...allRankingStats].sort((a, b) => b.avgKDA - a.avgKDA)
                );
                setMaxRankingStats(
                    [...allRankingStats].sort((a, b) => b.maxKDA - a.maxKDA)
                );
                break;
            }
            case "MVP": {
                setTotalRankingStats(
                    [...allRankingStats].sort((a, b) => b.mvpCount - a.mvpCount)
                );
                break;
            }
            case "Points": {
                setAverageRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.avgPoints - a.avgPoints
                    )
                );
                setTotalRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.totalPoints - a.totalPoints
                    )
                );
                setMaxRankingStats(
                    [...allRankingStats].sort(
                        (a, b) => b.maxPoints - a.maxPoints
                    )
                );
                break;
            }
        }
    };

    const updateRegions = async () => {
        setShowLeaderboard(false);
        const leaguesResult = await getFilteredLeaguesWithSchedule(
            getCountryCode(chosenRegion),
            user.initDataRaw
        );
        setLeagueTypes([/*"ALL",*/ ...leaguesResult]);
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
        const result = await getRankingStats(
            chosenLeagueType == "ALL"
                ? getCountryCode(chosenRegion)
                : chosenLeagueType,
            chosenLeagueType == "ALL" ? 0 : weekIndex,
            user.initDataRaw
        );
        setAllRankingStats(result);
    };

    const changeSchedule = async (index) => {
        setWeekIndex(index);
    };

    useEffect(() => {
        if (chosenRegion != null) updateRegions();
    }, [chosenRegion]);

    useEffect(() => {
        if (chosenLeagueType != null) updateRankings();
    }, [chosenLeagueType, weekIndex]);

    useEffect(() => {
        if (allRankingStats != null) {
            sortData();

            setShowLeaderboard(false);
            const timer = setTimeout(() => {
                setShowLeaderboard(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [allRankingStats, rankingsTab]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        averageRankingStats != null &&
        totalRankingStats != null &&
        maxRankingStats != null && (
            <div>
                <FunctionSection
                    title="Filter Options"
                    regions={regions}
                    chosenRegion={chosenRegion}
                    setChosenRegion={setChosenRegion}
                    leagueTypes={leagueTypes}
                    chosenLeagueType={chosenLeagueType}
                    setChosenLeagueType={setChosenLeagueType}
                    showRegionButton={true}
                    showLeagueButton={true}
                />
                <Tabs
                    options={rankingsOptions}
                    onToggle={(selected) => {
                        setRankingsTab(selected);
                    }}
                    selectedTab={rankingsTab}
                />
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
        )
    );
};
