import { motion } from "motion/react";
import {
    SameAthlete,
    AthleteStats,
    Athlete,
} from "../../../../helpers/interfaces";
import { useEffect, useState } from "react";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import PH15Sticker from "../../../../assets/sticker/ph15.svg";
import { getAthleteStats } from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import StatsBackground from "../../../../assets/background/stats.svg";
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
    useEffect(() => {
        async function fetchAthleteStats() {
            const res = await getAthleteStats(
                athlete.athleteId,
                sameAthletes[leagueIndex].league,
                "all",
                user.initDataRaw
            );
            if (res.status === "success") {
                setStats(res.stats[0]);
                console.log(res.stats[0]);
            }
        }
        fetchAthleteStats();
    }, []);
    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[4vw]">
            {/* <button onClick={onBack}>back</button> */}
            <div className="flex w-full justify-center px-[3vw]">
                <button className="flex w-[8%] items-center justify-end">
                    <img className="h-[6vw]" src={LeftIcon} />
                </button>
                <div className="flex w-[84%] flex-col items-center justify-center gap-[2vw]">
                    <img className="h-[12vw]" src={PH15Sticker} />
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        ONIC PH
                    </p>
                </div>
                <button className="flex w-[8%] items-center justify-end">
                    <img className="h-[6vw]" src={RightIcon} />
                </button>
            </div>
            <div className="mx-[3vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button className="items-center justify-center bg-graydark px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-white">
                        ALL
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 1
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 2
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 3
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 4
                    </p>
                </button>
                <button className="items-center justify-center px-[2vw]">
                    <p className="font-russone text-nowrap text-[3.5vw] font-extrabold text-gold">
                        WEEK 5
                    </p>
                </button>
            </div>
            <div className="mx-[3vw] mt-[4vw] flex flex-col gap-[2vw]">
                <div className="">
                    <p className="font-montserrat text-[4vw] font-extrabold text-golddark">
                        SEASON AVERAGES
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
                        SEASON TOTALS
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
