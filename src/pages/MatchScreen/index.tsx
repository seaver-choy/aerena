import { useEffect, useState } from "react";
import { matchOptions, gameOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { GameSummary } from "./components/GameSummary";
import { GameDetails } from "./components/GameDetails";
import { useLocation } from "react-router-dom";
import { MatchInfo, ScheduleInfo, Team } from "../../helpers/interfaces";
import { getSpecificMatchStats } from "../../helpers/lambda.helper";
import { useUsers } from "../../hooks/useUser";
import { MatchBanner } from "../../components/MatchBanner";

interface LocationState {
    schedule?: ScheduleInfo;
    teams?: Team[];
}

export const MatchScreen = () => {
    const user = useUsers();
    const [matchTab, setMatchTab] = useState("Game 1");
    const [gameTab, setGameTab] = useState("Summary");
    const locationState = useLocation().state as LocationState;
    const schedule = locationState.schedule;
    const teams = locationState.teams;
    const [allMatchStats, setAllMatchStats] = useState<MatchInfo[]>(null);
    const [team1Stats, setTeam1Stats] = useState<MatchInfo>(null);
    const [team2Stats, setTeam2Stats] = useState<MatchInfo>(null);
    const team1 = locationState.teams.find(
        (team) => team.key == schedule.team1
    );
    const team2 = locationState.teams.find(
        (team) => team.key == schedule.team2
    );

    const fetchData = async () => {
        const result = await getSpecificMatchStats(
            schedule.match_id,
            schedule.team1,
            schedule.team2,
            user.initDataRaw
        );
        setAllMatchStats(result);
        setTeam1Stats(
            result.find(
                (matchstats) =>
                    matchstats.game == 1 && matchstats.team == schedule.team1
            )
        );
        setTeam2Stats(
            result.find(
                (matchstats) =>
                    matchstats.game == 1 && matchstats.team == schedule.team2
            )
        );
    };
    useEffect(() => {
        if (
            allMatchStats != null &&
            (schedule.score1 != 0 || schedule.score2 != 0)
        ) {
            const gameNumber = parseInt(matchTab.split(" ")[1]);
            setTeam1Stats(
                allMatchStats.find(
                    (matchstats) =>
                        matchstats.game == gameNumber &&
                        matchstats.team == schedule.team1
                )
            );
            setTeam2Stats(
                allMatchStats.find(
                    (matchstats) =>
                        matchstats.game == gameNumber &&
                        matchstats.team == schedule.team2
                )
            );
        }
    }, [matchTab]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <MatchBanner schedule={schedule} teams={teams} noButton={true} />
            <Tabs
                options={matchOptions.slice(
                    0,
                    schedule.score1 == 0 && schedule.score2 == 0
                        ? Math.floor(schedule.boType / 2) + 1
                        : schedule.score1 + schedule.score2
                )}
                onToggle={(selected) => {
                    setMatchTab(selected);
                }}
                selectedTab={matchTab}
            />
            <Tabs
                options={gameOptions}
                onToggle={(selected) => {
                    setGameTab(selected);
                }}
                selectedTab={gameTab}
            />
            {(schedule.score1 == 0 && schedule.score2 == 0) ||
            team1Stats == undefined ||
            team2Stats == undefined ? (
                <div className="mt-[15vh]">
                    <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-bold text-transparent">
                        No Match Results
                    </p>
                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                        Please check again later
                    </p>
                </div>
            ) : (
                <div>
                    {gameTab === "Summary" && (
                        <GameSummary
                            team1={team1}
                            team2={team2}
                            team1Stats={team1Stats}
                            team2Stats={team2Stats}
                            schedule={schedule}
                        />
                    )}
                    {gameTab === "Team 1" && (
                        <GameDetails
                            team={team1}
                            teamStats={team1Stats}
                            league={schedule.league}
                        />
                    )}
                    {gameTab === "Team 2" && (
                        <GameDetails
                            team={team2}
                            teamStats={team2Stats}
                            league={schedule.league}
                        />
                    )}
                </div>
            )}
        </Layout>
    );
};
