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
} from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import { getCountryCode, getCountryFull } from "../../../../helpers/utilities";
import { RankingInfo } from "@/helpers/interfaces";

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

    const fetchInitialData = async () => {
        const regionsResult = await getCountries(user.initDataRaw);
        setRegions([/*"ALL",*/ ...regionsResult]);
        setChosenRegion(getCountryFull(user.country));
    };

    const sortData = async () => {
        switch (rankingsTab) {
            case "Kills": {
                setAverageRankingStats([
                    ...allRankingStats.sort((a, b) => b.avgKills - a.avgKills),
                ]);
                setTotalRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.totalKills - a.totalKills
                    ),
                ]);
                setMaxRankingStats([
                    ...allRankingStats.sort((a, b) => b.maxKills - a.maxKills),
                ]);
                break;
            }
            case "Deaths": {
                setAverageRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.avgDeaths - a.avgDeaths
                    ),
                ]);
                setTotalRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.totalDeaths - a.totalDeaths
                    ),
                ]);
                setMaxRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.maxDeaths - a.maxDeaths
                    ),
                ]);
                break;
            }
            case "Assists": {
                setAverageRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.avgAssists - a.avgAssists
                    ),
                ]);
                setTotalRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.totalAssists - a.totalAssists
                    ),
                ]);
                setMaxRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.maxAssists - a.maxAssists
                    ),
                ]);
                break;
            }
            case "KDA": {
                setAverageRankingStats([
                    ...allRankingStats.sort((a, b) => b.avgKDA - a.avgKDA),
                ]);
                setTotalRankingStats([
                    ...allRankingStats.sort((a, b) => b.totalKDA - a.totalKDA),
                ]);
                setMaxRankingStats([
                    ...allRankingStats.sort((a, b) => b.maxKDA - a.maxKDA),
                ]);
                break;
            }
            case "MVP": {
                setTotalRankingStats([
                    ...allRankingStats.sort((a, b) => b.mvpCount - a.mvpCount),
                ]);
                break;
            }
            case "Points": {
                setAverageRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.avgPoints - a.avgPoints
                    ),
                ]);
                setTotalRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.totalPoints - a.totalPoints
                    ),
                ]);
                setMaxRankingStats([
                    ...allRankingStats.sort(
                        (a, b) => b.maxPoints - a.maxPoints
                    ),
                ]);
                break;
            }
        }
    };

    const updateRegions = async () => {
        const leaguesResult = await getFilteredLeaguesWithSchedule(
            getCountryCode(chosenRegion),
            user.initDataRaw
        );
        setLeagueTypes(["ALL", ...leaguesResult]);
        setChosenLeagueType(leaguesResult[0]);
    };

    const updateScheduleGroups = async () => {
        const result = await getRankingStats(
            chosenLeagueType,
            user.initDataRaw
        );
        setAllRankingStats(result);
    };

    useEffect(() => {
        if (chosenRegion != null) updateRegions();
    }, [chosenRegion]);

    useEffect(() => {
        if (chosenLeagueType != null) updateScheduleGroups();
    }, [chosenLeagueType]);

    useEffect(() => {
        if (allRankingStats != null) sortData();
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
                {rankingsTab != "MVP" && (
                    <div>
                        <TitleSection title="AVERAGES" />
                        <RankLeaderboard
                            rankingsTab={rankingsTab}
                            rankingStats={averageRankingStats}
                            statType={"Average"}
                        />
                    </div>
                )}
                <TitleSection title="TOTALS" />
                <RankLeaderboard
                    rankingsTab={rankingsTab}
                    rankingStats={totalRankingStats}
                    statType={"Total"}
                />
                {rankingsTab != "MVP" && (
                    <div>
                        <TitleSection title="GAME HIGH" />
                        <RankLeaderboard
                            rankingsTab={rankingsTab}
                            rankingStats={maxRankingStats}
                            statType={"Max"}
                        />
                    </div>
                )}
            </div>
        )
    );
};
