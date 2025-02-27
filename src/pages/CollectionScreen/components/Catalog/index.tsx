import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import {
    getAthletePositionLogo,
    getAthletePositionBackground,
    getBaseTeamColor,
} from "../../../../helpers/athletes";
import { Athlete, TeamColor } from "../../../../helpers/interfaces";
import {
    getAthletes,
    getLeagues,
    getAthletePaginated,
} from "../../../../helpers/lambda.helper";
import { AthleteCard } from "../../../../components/AthleteCard";
import { AthleteModal } from "../../modals/AthleteModal";
import { LeagueModal } from "../../modals/LeagueModal";
import InfiniteScroll from "react-infinite-scroll-component";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";

export const Catalog = () => {
    const user = useUsers();
    const positionList = ["All", "Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [maxLength] = useState<number>(positionList.length - 1);
    const [showAthlete, setShowAthlete] = useState(false);
    const [allAthletes, setAllAthletes] = useState<Athlete[]>([]);
    const [leagueAthletes, setLeagueAthletes] = useState<Athlete[]>([]);
    const [currentAthletes, setCurrentAthletes] = useState<Athlete[]>(null);
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>(null);
    const [showLeagueModal, setShowLeagueModal] = useState<boolean>(false);
    const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete>();
    const [showAthleteOffset, setShowAthleteOffset] = useState<number>(-1);
    const [offset, setOffset] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>();
    // const handlePreviousCategory = () => {
    //     if (positionIndex > 0) {
    //         setPositionIndex(positionIndex - 1);
    //     }
    // };

    // const handleNextCategory = () => {
    //     if (positionIndex < maxLength) {
    //         setPositionIndex(positionIndex + 1);
    //     }
    // };

    const displayLeagueModal = () => {
        setShowLeagueModal(true);
    };

    const closeLeagueModal = () => {
        setShowLeagueModal(false);
    };

    const displayAthleteModal = (athlete: Athlete) => {
        setSelectedAthlete(athlete);
        setShowAthleteModal(true);
    };

    const closeAthleteModal = () => {
        setShowAthleteModal(false);
    };

    function compileAthletes() {
        // const filteredPosition = leagueAthletes.filter((obj) =>
        //     obj.position.includes(position)
        // );

        const uniqueAthletesMap = new Map(
            leagueAthletes.map((player) => [player.athleteId, player])
        );

        // const sorted = [...uniqueAthletesMap.values()].sort((a, b) => {
        //     // const teamA = a.team.toUpperCase();
        //     // const teamB = b.team.toUpperCase();

        //     const nameA = a.displayName;
        //     const nameB = b.displayName;

        //     // const teamOrder = teamA.localeCompare(teamB);
        //     const nameOrder = nameA.localeCompare(nameB);

        //     // return teamOrder || nameOrder;
        //     return nameOrder;
        // });

        setCurrentAthletes([...uniqueAthletesMap.values()]);
    }

    async function fetchMoreData() {
        console.log("fetching more data");
        if (hasNextPage) {
            const res = await getAthletePaginated(
                offset + 12,
                12,
                "",
                positionList[positionIndex],
                leagueTypes,
                user.initDataRaw
            );
            setLeagueAthletes([...leagueAthletes, ...res.docs]);
            setOffset(offset + 12);
            setHasNextPage(res.hasNextPage);
        } else {
            console.log("No more athletes left");
        }
    }

    useEffect(() => {
        if (allAthletes !== null && leagueAthletes != null) {
            compileAthletes();

            const timer = setTimeout(() => {
                if (showAthleteOffset === -1) {
                    //initial display, it's set to -1 so it doesn't show the first athlete only
                    setShowAthleteOffset(12);
                } else {
                    console.log(showAthleteOffset);
                    setShowAthleteOffset(showAthleteOffset + 12);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [leagueAthletes]);

    // useEffect(() => {
    //     if (allAthletes !== null && chosenLeagueType != null) {
    //         const tempAthletes = allAthletes.filter((obj) =>
    //             obj.league.includes(chosenLeagueType)
    //         );
    //         setLeagueAthletes(tempAthletes);
    //     }
    // }, [chosenLeagueType]);

    // const getAllAthletes = async () => {
    //     const allAthletes = await getAthletes(user.initDataRaw);
    //     const allLeagueTypes = await getLeagues(user.initDataRaw);
    //     setAllAthletes(allAthletes);
    //     setLeagueTypes(allLeagueTypes);
    //     const tempAthletes = allAthletes.filter((obj) =>
    //         allLeagueTypes.includes(obj.league)
    //     );
    //     setLeagueAthletes(tempAthletes);
    // };

    // useEffect(() => {
    //     getAllAthletes();
    // }, []);

    useEffect(() => {
        async function fetchAllLeagueTypes() {
            const res = await getLeagues(user.initDataRaw);
            setLeagueTypes(res);
        }
        fetchAllLeagueTypes();
    }, []);

    useEffect(() => {
        // Fetches for the initial athletes with pagination.
        // Occurs on initial page load and when positionIndex/leagueTypes changes
        async function fetchInitialAthletes() {
            const res = await getAthletePaginated(
                0,
                12,
                "",
                positionList[positionIndex],
                leagueTypes,
                user.initDataRaw
            );
            console.log(res);
            setLeagueAthletes(res.docs);
            setOffset(12);
            setShowAthleteOffset(-1);
            setHasNextPage(res.hasNextPage);
        }
        fetchInitialAthletes();
    }, [positionIndex, leagueTypes]);

    return (
        <div className="mt-[4vw]">
            <motion.div
                className="mx-[4vw] mb-[4vw] h-[12vw] rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                {...slideRightAnimation}
            >
                <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[4vw]">
                    <input
                        className="flex w-full bg-transparent font-russoone text-[3.5vw] font-normal text-white focus:outline-none"
                        type="text"
                        placeholder="Search Player..."
                        maxLength={12}
                    ></input>
                </div>
            </motion.div>
            <div className="mt-[4vw] h-[193vw]">
                {showLeagueModal && (
                    <LeagueModal
                        onClose={closeLeagueModal}
                        leagueTypes={leagueTypes}
                        chosenLeagueType={chosenLeagueType}
                        setChosenLeagueType={setChosenLeagueType}
                    />
                )}
                <div className="relative flex">
                    <img
                        className="h-full w-full"
                        src={getAthletePositionBackground(
                            positionList[positionIndex]
                        )}
                    />
                    <div className="absolute flex h-[25vw] w-full px-[4vw] pt-[11vw]">
                        <div className="flex h-full w-[50%] items-center pl-[4vw]">
                            <motion.p
                                className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                                {...slideRightTextAnimation}
                            >
                                {chosenLeagueType == null
                                    ? "Player Catalog"
                                    : chosenLeagueType}
                            </motion.p>
                        </div>
                        <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                            <motion.button
                                className="relative flex h-[7vw] items-center justify-center"
                                onClick={displayLeagueModal}
                                {...appearTextAnimation}
                                disabled={
                                    leagueTypes === null ||
                                    currentAthletes === null
                                }
                            >
                                <div className="absolute flex">
                                    <p className="font-russoone text-[2.4vw] font-normal tracking-wide text-white">
                                        Filter
                                    </p>
                                </div>
                                <img
                                    className="h-[100%]"
                                    src={FunctionButton}
                                ></img>
                            </motion.button>
                        </div>
                        <img
                            className="absolute bottom-0 left-0 w-full"
                            src={GoldLine}
                        ></img>
                    </div>
                    <div className="absolute mt-[29vw] flex h-[13vw] w-full justify-center gap-[5vw] px-[4vw]">
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(0)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 0 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("All")}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(1)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 1 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("Roam")}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(2)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 2 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("Mid")}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(3)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 3 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("Jungle")}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(4)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 4 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("Gold")}
                            />
                        </button>
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setPositionIndex(5)}
                        >
                            <img
                                className={`h-[10vw] ${positionIndex === 5 ? "opacity-1" : "opacity-50"}`}
                                src={getAthletePositionLogo("EXP")}
                            />
                        </button>
                        {/* <button
                            onClick={handlePreviousCategory}
                            className="flex w-[8%] items-center justify-end"
                        >
                            <img
                                className={`h-[6vw] ${positionIndex === 0 ? "cursor-default opacity-50" : "opacity-100"}`}
                                src={LeftIcon}
                            />
                        </button>
                        <div className="flex w-[84%] items-center justify-center">
                            <img
                                className="h-[10vw]"
                                src={getAthletePositionLogo(
                                    positionList[positionIndex]
                                )}
                            />
                        </div>
                        <button
                            onClick={handleNextCategory}
                            className="flex w-[8%] items-center justify-end"
                        >
                            <img
                                className={`h-[6vw] ${positionIndex === positionList.length - 1 ? "cursor-default opacity-50" : "opacity-100"}`}
                                src={RightIcon}
                            />
                        </button> */}
                    </div>
                    <div
                        className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]"
                        id="test-id"
                    >
                        <div
                            className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]"
                            id="collection-id"
                        >
                            <InfiniteScroll
                                dataLength={leagueAthletes.length}
                                next={fetchMoreData}
                                hasMore={hasNextPage}
                                loader={<h4>Loading...</h4>}
                                endMessage={<h4> No more athletes.</h4>}
                                scrollableTarget="collection-id"
                                className="disable-scrollbar flex flex-row flex-wrap gap-[2vw]"
                            >
                                {currentAthletes != null &&
                                currentAthletes?.length > 0
                                    ? currentAthletes?.map((athlete, index) =>
                                          index < showAthleteOffset ? (
                                              <motion.button
                                                  className="relative flex h-[36.4vw] w-[28vw]"
                                                  key={index}
                                                  onClick={() => {
                                                      displayAthleteModal(
                                                          athlete
                                                      );
                                                  }}
                                                  {...appearCardAnimation}
                                              >
                                                  <AthleteCard
                                                      color={baseColor}
                                                      ign={athlete.displayName}
                                                      role={athlete.position[0]}
                                                      opacity={{
                                                          wave: baseColor.wave,
                                                      }}
                                                      id={index}
                                                  />
                                              </motion.button>
                                          ) : (
                                              <motion.div
                                                  className="relative flex h-[36.4vw] w-[28vw]"
                                                  {...pulseAnimation}
                                              >
                                                  <img
                                                      className="h-full w-full"
                                                      src={AthleteSonner}
                                                  />
                                              </motion.div>
                                          )
                                      )
                                    : currentAthletes != null && (
                                          <div className="mt-[2vw] px-[5vw]">
                                              <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[4vw] font-normal text-transparent">
                                                  There are currently no
                                                  athletes for{" "}
                                                  {positionList[positionIndex]}.
                                                  Please check again later.
                                              </p>
                                          </div>
                                      )}
                                {showAthleteModal && (
                                    <AthleteModal
                                        athlete={selectedAthlete}
                                        onClose={closeAthleteModal}
                                    />
                                )}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
