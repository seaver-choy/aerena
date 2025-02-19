import { useEffect, useState } from "react";
import { winnersOptions } from "../../../../helpers/tabs";
import { Tabs } from "../../../../components/Tabs";

import WinnersBackground from "../../../../assets/background/winners.svg";
import WinnersRankBackground from "../../../../assets/background/winners-rank.svg";
import BasicBoardBackground from "../../../../assets/background/board-basic.svg";
import EmptyBoardBackground from "../../../../assets/background/board-empty.svg";
import { Ranking, TeamColor, Tournament, UsersJoined } from "../../../../helpers/interfaces";
import { useUsers } from "../../../../hooks/useUser";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { AthleteCard } from "../../../../components/AthleteCard";
import { getStickerImage } from "../../../../helpers/images";
interface WinnersProps {
    rankings: Ranking[];
    tournament: Tournament;
}
export const Winners = ({rankings = null, tournament = null}: WinnersProps) => {
    const user = useUsers();
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [winnersTab, setWinnersTab] = useState("Winners");
    const [userLineups, setUserLineups] = useState<UsersJoined[]>(null);

    useEffect(() => {
        if(tournament != null && tournament.usersJoined.length > 0) {
            const userEntries = tournament.usersJoined.filter(entry => 
                entry.username === user.username
            ).sort((a, b) => b.score - a.score);
            setUserLineups(userEntries);
        } else {
            setUserLineups([]);
        }
    }, [tournament]);
    

    return (
        <div>
            <div className="mt-[8vw]">
                <Tabs
                    options={winnersOptions}
                    onToggle={(selected) => {
                        setWinnersTab(selected);
                    }}
                    selectedTab={winnersTab}
                />
                {
                    rankings != null && tournament != null && (
                            winnersTab === "Winners" ? (
                                <div>
                                <div className="mt-[8vw] h-[32.3vw]">
                                    <div className="relative flex justify-center">
                                        <img
                                            className="h-full w-full"
                                            src={WinnersBackground}
                                        />
                                        <div className="absolute bottom-[1vw]">
                                            <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                                {tournament.tournamentName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    rankings.map((ranking, index) => {
                                        const prevRankingsSum = rankings
                                        .slice(0, index)
                                        .reduce((sum, prevRanking) => sum + prevRanking.users.length, 0);

                                        return (
                                        <div>
                                            <div className="mx-[8vw] mt-[10vw] h-[13.3vw]">
                                                <div className="relative flex items-center justify-center">
                                                    <img
                                                        className="h-full w-full"
                                                        src={WinnersRankBackground}
                                                    />
                                                    <div className="absolute mb-[1vw] flex h-[6.5vw] w-[40vw] items-center justify-center">
                                                        <p className="font-russoone text-[5vw] text-white">
                                                            RANK{" "}{ranking.users.length < 2 || prevRankingsSum === 9 ? prevRankingsSum + 1 : (prevRankingsSum + 1) + " - " + (Math.min(prevRankingsSum + ranking.users.length, 10))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                ranking.users.map ((user) => (
                                                    <div className="mt-[4vw]">
                                                        <div className="relative h-[109.5vw] w-full">
                                                            <img
                                                                className="h-full w-full"
                                                                src={BasicBoardBackground}
                                                            />
                                                            <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                                                                <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                                                    @{user.username}
                                                                </p>
                                                            </div>
                                                            <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                                                                <p className="font-russoone text-[2.5vw] text-white">
                                                                    POINTS
                                                                </p>
                                                                <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                                                    {ranking.score}
                                                                </p>
                                                            </div>
                                                            <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                                                                <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                                                    {tournament.tournamentName}
                                                                </p>
                                                            </div>
                                                            <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                                                                {user.lineup.map((athlete, index) => (
                                                                    <div key={index} className="relative flex h-[36.4vw] w-[28vw]">
                                                                        {/* <img
                                                                            className="h-full"
                                                                            src={athlete.img}
                                                                        /> */}
                                                                        <AthleteCard
                                                                            color={baseColor}
                                                                            ign={athlete.displayName}
                                                                            role={athlete.position[0]}
                                                                            opacity={{
                                                                                wave: baseColor.wave,
                                                                            }}
                                                                            id={index}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]">
                                                                <img
                                                                    className="h-full w-full"
                                                                    src={getStickerImage(
                                                                        tournament.league
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        )})
                                    }
                                    </div>
                                )
                            : userLineups != null && (
                                userLineups.length > 0 ? (
                                    userLineups.map((user, index) => (
                                        <div key={index} className={` ${index == 0 ? "mt-[8vw]" : "mt-[4vw]"}`}>
                                            <div className="relative h-[109.5vw] w-full">
                                                <img
                                                className="h-full w-full"
                                                src={BasicBoardBackground}
                                                />
                                                <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                                                    <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                                        @{user.username}
                                                    </p>
                                                </div>
                                                <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                                                    <p className="font-russoone text-[2.5vw] text-white">
                                                        POINTS
                                                    </p>
                                                    <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                                        {user.score}
                                                    </p>
                                                </div>
                                                <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                                                    <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                                        {tournament.tournamentName}
                                                    </p>
                                                </div>
                                                <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                                                    {user.lineup.map((athlete, index) => (
                                                        <div key={index} className="relative flex h-[36.4vw] w-[28vw]">
                                                            {/* <img
                                                                className="h-full"
                                                                src={athlete.img}
                                                            /> */}
                                                            <AthleteCard
                                                                color={baseColor}
                                                                ign={athlete.displayName}
                                                                role={athlete.position[0]}
                                                                opacity={{
                                                                    wave: baseColor.wave,
                                                                }}
                                                                id={index}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]">
                                                    <img
                                                        className="h-full w-full"
                                                        src={getStickerImage(
                                                            tournament.league
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    )
                                )
                                :
                                // <div className="mt-[4vh]">
                                //     <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-bold text-transparent">
                                //         No Personal Lineups
                                //     </p>
                                // </div>
                                <div className="relative mt-[8vw] h-[49.7vw] w-full">
                                    <img
                                        className="h-full w-full"
                                        src={EmptyBoardBackground}
                                    />
                                    <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center opacity-50">
                                        <p className="font-russoone text-[2.5vw] text-white">
                                            POINTS
                                        </p>
                                        <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                            0
                                        </p>
                                    </div>
                                    <div className="absolute left-[5vw] top-[18vw] flex h-[22vw] w-[90%] flex-col">
                                        <div className="flex w-full justify-center">
                                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                                No personal lineups
                                            </p>
                                        </div>
                                        <div className="flex w-full justify-center">
                                            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                                                Enter your lineups next time!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                    )
                }
            </div>
        </div>
    );
};
