import {
    SameAthlete,
    AthleteStats,
    Athlete,
    TournamentDetails,
} from "../../../../helpers/interfaces";
import { useEffect, useState, useRef } from "react";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import {
    getAthleteStats,
    getLeagueWeeks,
} from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import { getAthleteStickerLogo } from "../../../../helpers/athletes";
import { StatsDisplay } from "../../../../components/StatsDisplay";

interface Props {
    athlete: Athlete;
    leagueIndex: number;
    sameAthletes: SameAthlete[];
}
export const StatsDetails = ({ athlete, leagueIndex, sameAthletes }: Props) => {
    const user = useUsers();
    const [stats, setStats] = useState<AthleteStats>({
        averageKills: 0,
        totalKills: 0,
        averageDeaths: 0,
        totalDeaths: 0,
        averageAssists: 0,
        totalAssists: 0,
        averagePoints: 0,
        totalPoints: 0,
        winRate: 0,
        totalWins: 0,
        mvpRate: 0,
        totalMvps: 0,
    });
    const [currentLeagueIndex, setCurrentLeagueIndex] =
        useState<number>(leagueIndex);
    const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
    const [tournamentDetails, setTournamentDetails] =
        useState<TournamentDetails>({
            weeks: [],
            playoffs: false,
            matchType: "",
        });
    const handleLeftArrow = () => {
        if (currentLeagueIndex > 0) {
            setCurrentLeagueIndex(currentLeagueIndex - 1);
        }
    };
    const handleRightArrow = () => {
        if (currentLeagueIndex < sameAthletes.length - 1) {
            setCurrentLeagueIndex(currentLeagueIndex + 1);
        }
    };

    useEffect(() => {
        async function fetchAthleteStats() {
            const res = await getAthleteStats(
                athlete.athleteId,
                sameAthletes[currentLeagueIndex].league,
                tournamentDetails.weeks[currentWeekIndex] !== undefined
                    ? tournamentDetails.weeks[currentWeekIndex]
                    : "all",
                user.initDataRaw
            );
            if (res.status === "success") {
                setStats(res.stats[0]);
            }
        }
        fetchAthleteStats();
    }, [currentLeagueIndex, currentWeekIndex]);

    useEffect(() => {
        async function fetchLeagueWeeks() {
            const res = await getLeagueWeeks(
                sameAthletes[currentLeagueIndex].league,
                user.initDataRaw
            );
            if (res.status === "success") {
                const temp = res.weeks;
                res.weeks = ["all", ...temp];
                if (res.playoffs) res.weeks.push("playoffs");
                setTournamentDetails(res);
            }
        }
        fetchLeagueWeeks();
    }, [currentLeagueIndex]);
    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {/* <button onClick={onBack}>back</button> */}
            <div className="flex w-full justify-center px-[3vw]">
                <button
                    className="flex w-[8%] items-center justify-end"
                    onClick={handleLeftArrow}
                >
                    <img className="h-[6vw]" src={LeftIcon} />
                </button>
                <div className="flex w-[84%] flex-col items-center justify-center gap-[2vw]">
                    <img
                        className="h-[12vw]"
                        src={getAthleteStickerLogo(
                            sameAthletes[currentLeagueIndex].league
                        )}
                    />
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        {sameAthletes[currentLeagueIndex].team}
                    </p>
                </div>
                <button
                    className="flex w-[8%] items-center justify-end"
                    onClick={handleRightArrow}
                >
                    <img className="h-[6vw]" src={RightIcon} />
                </button>
            </div>
            <div className="mx-[3vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none]">
                {tournamentDetails.weeks.map((x, index) => (
                    <button
                        className={`items-center justify-center px-[2vw] ${index === currentWeekIndex && "bg-graydark"}`}
                        onClick={() => setCurrentWeekIndex(index)}
                    >
                        <p
                            className={`text-nowrap font-russoone text-[3.5vw] font-extrabold ${index === currentWeekIndex ? "text-white" : "text-gold"}`}
                        >
                            {x === "all"
                                ? "ALL"
                                : x === "playoffs"
                                  ? "PLAYOFFS"
                                  : `${tournamentDetails.matchType.toUpperCase()} ${x}`}
                        </p>
                    </button>
                ))}
            </div>
            <div className="mx-[3vw] mt-[4vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        {tournamentDetails.weeks[currentWeekIndex] === "all"
                            ? "SEASONAL AVERAGES"
                            : tournamentDetails.weeks[currentWeekIndex] ===
                                "playoffs"
                              ? "PLAYOFF AVERAGES"
                              : `${tournamentDetails.matchType === "week" ? "WEEKLY" : "DAILY"} AVERAGES`}
                    </p>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text={"KPG"}
                            value={stats !== undefined ? stats.averageKills : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="DPG"
                            value={
                                stats !== undefined ? stats.averageDeaths : 0
                            }
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="APG"
                            value={
                                stats !== undefined ? stats.averageAssists : 0
                            }
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="WIN RATE %"
                            value={stats !== undefined ? stats.winRate : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="MVP RATE %"
                            value={stats !== undefined ? stats.mvpRate : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="PPG"
                            value={
                                stats !== undefined ? stats.averagePoints : 0
                            }
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                </div>
            </div>
            <div className="mx-[3vw] mt-[4vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        {tournamentDetails.weeks[currentWeekIndex] === "all"
                            ? "SEASONAL TOTALS"
                            : tournamentDetails.weeks[currentWeekIndex] ===
                                "playoffs"
                              ? "PLAYOFF TOTALS"
                              : `${tournamentDetails.matchType === "week" ? "WEEKLY" : "DAILY"} TOTALS`}
                    </p>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="KILLS"
                            value={stats !== undefined ? stats.totalKills : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="DEATHS"
                            value={stats !== undefined ? stats.totalDeaths : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="ASSISTS"
                            value={stats !== undefined ? stats.totalAssists : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                </div>
                <div className="flex h-[15.1vw] gap-[2.5vw]">
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="WINS"
                            value={stats !== undefined ? stats.totalWins : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="MVP"
                            value={stats !== undefined ? stats.totalMvps : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                    <div className="relative flex w-[27vw]">
                        <StatsDisplay
                            text="POINTS"
                            value={stats !== undefined ? stats.totalPoints : 0}
                            fromFullDetails={true}
                            noStats={stats === undefined ? true : false}
                        />
                    </div>
                </div>
            </div>
            <div className="mx-[3vw] mb-[4vw] mt-[8vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        LEGEND
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        KPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Kills Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        DPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Deaths Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        APG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Assists Per Game
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        WIN RATE:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Total Wins over Total Games Played
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        MVP RATE:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Total MVPs over Total Games Played
                    </p>
                </div>
                <div className="flex gap-[1vw]">
                    <p className="font-montserrat text-[3.5vw] font-extrabold text-graydark">
                        PPG:
                    </p>
                    <p className="font-montserrat text-[3.5vw] text-graydark">
                        Points Per Game
                    </p>
                </div>
            </div>
        </div>
    );
};
