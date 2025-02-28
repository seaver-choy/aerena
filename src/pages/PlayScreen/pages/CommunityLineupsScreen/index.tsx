import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { getStickerImage } from "../../../../helpers/images";
import { TeamColor } from "../../../../helpers/interfaces";
import { Layout } from "../../../../components/Layout";
import { Title } from "../../../../components/Title";
import { AthleteCard } from "../../../../components/AthleteCard";
// import InfiniteScroll from "react-infinite-scroll-component";

import BasicBoardBackground from "../../../../assets/background/board-basic.svg";
import GoldButton from "../../../../assets/button/gold.svg";

export const CommunityLineupsScreen = () => {
    const location = useLocation();
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const ongoingTournament = location.state?.ongoingTournament;
    const [reversedUsersJoined, setReverseUsersJoined] = useState([]);
    // const playTab = location.state?.playTab;
    const [displayLineup, setDisplayLineup] = useState([]);
    // const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(5);
    const fetchMoreData = () => {
        setTimeout(() => {
            if (currentIndex >= reversedUsersJoined.length) {
                // setHasMore(false);
            } else {
                setDisplayLineup(
                    displayLineup.concat(
                        reversedUsersJoined.slice(
                            currentIndex,
                            currentIndex + 5
                        )
                    )
                );
                setCurrentIndex(currentIndex + 5);
            }
        }, 1500);
    };

    useEffect(() => {
        async function reverseData() {
            const reversedUsersJoined =
                await ongoingTournament.usersJoined.reverse();
            setReverseUsersJoined(reversedUsersJoined);
            setDisplayLineup(reversedUsersJoined.slice(0, 5));
        }
        reverseData();
    }, []);

    return (
        <Layout>
            <Title title="Community Lineups" />
            {/* <InfiniteScroll
                    dataLength={ongoingTournament.usersJoined.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<h4>You've reached the end.</h4>}
                    scrollableTarget={"layout-id"}
                > */}
            <div className="mt-[6vw] flex flex-col gap-[4vw]">
                {displayLineup !== null &&
                    displayLineup.map((userInfo) => (
                        <div className="relative h-[109.5vw] w-full">
                            <img
                                className="h-full w-full"
                                src={BasicBoardBackground}
                            />
                            <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                                <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                    @{userInfo.username}
                                </p>
                            </div>
                            <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                                <p className="font-russoone text-[2.5vw] text-white">
                                    POINTS
                                </p>
                                <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                    {userInfo.score}
                                </p>
                            </div>
                            <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                                <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                    {userInfo.lineupName}
                                </p>
                            </div>
                            <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                                {userInfo.lineup.map((athlete, index) => (
                                    <div
                                        key={index}
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                    >
                                        <AthleteCard
                                            color={athlete.skin?.teamData.colors ?? baseColor}
                                            ign={athlete.displayName}
                                            role={athlete.position[0]}
                                            opacity={{
                                                wave: athlete.skin?.teamData.colors.wave ?? baseColor.wave,
                                            }}
                                            type={athlete.skin ? "basic" : null}
                                            league={athlete.skin ? athlete.league : null}
                                            id={index}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]">
                                <img
                                    className="h-full w-full"
                                    src={getStickerImage(
                                        ongoingTournament.league
                                    )}
                                />
                            </div>
                            <div className="absolute bottom-[2.5vw] left-[17vw] flex h-[6.5vw] w-[60vw] items-center">
                                <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                    {ongoingTournament.tournamentName}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
            {reversedUsersJoined.length == 0 ? (
                <div className="mt-[30vh]">
                    <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-bold text-transparent">
                        No Community Lineups
                    </p>
                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                        Please check again later
                    </p>
                </div>
            ) : currentIndex < reversedUsersJoined.length ? (
                <div className="mt-[4vw] flex w-full flex-col items-center">
                    <div className="flex flex-col items-center">
                        <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                            Displaying {currentIndex} out of{" "}
                            {reversedUsersJoined.length} lineups.
                        </p>
                        <button
                            className="relative mt-[2vw] flex h-[8vw] justify-center"
                            onClick={fetchMoreData}
                        >
                            <img className="h-full" src={GoldButton} />
                            <div className="absolute flex h-full items-center">
                                <p className="font-russoone text-[3vw] text-white">
                                    Show More
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-[4vw] flex w-full flex-col items-center gap-[4vw]">
                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                        You've reached the end.
                    </p>
                </div>
            )}
        </Layout>
    );
};
