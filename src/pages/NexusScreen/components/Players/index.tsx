import { useEffect, useRef, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    pulseAnimation,
    slideRightAnimation,
} from "../../../../helpers/animation";
import {
    getAthletePositionLogo,
    getAthletePositionBackground,
    getBaseTeamColor,
    sortLeagues,
} from "../../../../helpers/athletes";
import { Athlete, TeamColor } from "../../../../helpers/interfaces";
import {
    getLeagues,
    getAthletePaginated,
    getCountries,
} from "../../../../helpers/lambda.helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { AthleteCard } from "../../../../components/AthleteCard";
import { FunctionSection } from "../../../../components/FunctionSection";
import { AthleteModal } from "../../../../modals/AthleteModal";

import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";

export const Players = () => {
    const user = useUsers();
    const positionList = ["All", "Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [leagueAthletes, setLeagueAthletes] = useState<Athlete[]>([]);
    const [currentAthletes, setCurrentAthletes] = useState<Athlete[]>(null);
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>("ALL");
    const [regions, setRegions] = useState<string[]>(null);
    const [chosenRegion, setChosenRegion] = useState<string>("ALL");
    const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete>();
    const [showAthleteOffset, setShowAthleteOffset] = useState<number>(-1);
    const [offset, setOffset] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>();
    const [hasFetchedInitial, setHasFetchedInitial] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchString, setSearchString] = useState<string>("");
    const [queryString, setQueryString] = useState<string>("");
    const containerRef = useRef(null);

    const displayAthleteModal = (athlete: Athlete) => {
        setSelectedAthlete(athlete);
        setShowAthleteModal(true);
    };

    const closeAthleteModal = () => {
        setShowAthleteModal(false);
    };

    function compileAthletes() {
        const uniqueAthletesMap = new Map(
            leagueAthletes.map((player) => [player.athleteId, player])
        );

        setCurrentAthletes([...uniqueAthletesMap.values()]);
    }

    async function fetchMoreData() {
        if (hasNextPage && !isLoadingMore) {
            setIsLoadingMore(true); // Set loading flag
            const res = await getAthletePaginated(
                offset, // Use the current offset
                12,
                searchString,
                positionList[positionIndex],
                chosenLeagueType !== "ALL" ? [chosenLeagueType] : [],
                chosenRegion !== "ALL" ? chosenRegion : "",
                user.initDataRaw
            );

            setLeagueAthletes((prevAthletes) => [...prevAthletes, ...res.docs]);
            setOffset((prevOffset) => prevOffset + 12); // Update offset correctly
            setHasNextPage(res.hasNextPage);
            setIsLoadingMore(false); // Reset loading flag
        } else {
            console.log("No more athletes left or loading in progress");
        }
    }

    //debounce on search
    useEffect(() => {
        const searchTimer = setTimeout(() => setSearchString(queryString), 500);
        return () => clearTimeout(searchTimer);
    }, [queryString]);

    useEffect(() => {
        if (leagueAthletes != null) {
            compileAthletes();

            const timer = setTimeout(() => {
                if (showAthleteOffset === -1) {
                    //initial display, it's set to -1 so it doesn't show the first athlete only
                    setShowAthleteOffset(12);
                } else {
                    setShowAthleteOffset(showAthleteOffset + 12);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [leagueAthletes]);

    useEffect(() => {
        async function fetchAllLeagueTypes() {
            const res = await getLeagues(user.initDataRaw);
            setLeagueTypes(["ALL", ...sortLeagues(res, user.country)]);
        }
        fetchAllLeagueTypes();
    }, []);

    useEffect(() => {
        async function fetchAllCountries() {
            const res = await getCountries(user.initDataRaw);
            setRegions(["ALL", ...res]);
        }
        fetchAllCountries();
    }, []);

    useEffect(() => {
        async function fetchInitialAthletes() {
            const res = await getAthletePaginated(
                0,
                12,
                searchString,
                positionList[positionIndex],
                chosenLeagueType !== "ALL" ? [chosenLeagueType] : [],
                chosenRegion !== "ALL" ? chosenRegion : "",
                user.initDataRaw
            );
            setLeagueAthletes(res.docs);
            setHasFetchedInitial(true);
            setOffset(12);
            setShowAthleteOffset(-1);
            setHasNextPage(res.hasNextPage);
        }
        console.log(chosenLeagueType);
        console.log(chosenRegion);
        fetchInitialAthletes();
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [searchString, positionIndex, chosenLeagueType, chosenRegion]);

    return (
        <div>
            <FunctionSection
                title="Filter Options"
                regions={regions}
                chosenRegion={chosenRegion}
                setChosenRegion={setChosenRegion}
                showRegionButton={true}
                leagueTypes={leagueTypes}
                chosenLeagueType={chosenLeagueType}
                setChosenLeagueType={setChosenLeagueType}
                showLeagueButton={true}
            />
            <div className="mt-[4vw] h-[193vw]">
                <div className="relative flex">
                    <img
                        className="h-full w-full"
                        src={getAthletePositionBackground(
                            positionList[positionIndex]
                        )}
                    />
                    <div className="absolute flex h-[25vw] w-full px-[4vw] pt-[12.5vw]">
                        <motion.div
                            className="mx-[4vw] h-[12vw] w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                            {...slideRightAnimation}
                        >
                            <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[4vw]">
                                <input
                                    className="flex w-full bg-transparent font-russoone text-[3.5vw] font-normal text-white focus:outline-none"
                                    type="text"
                                    placeholder="Search Player..."
                                    maxLength={12}
                                    value={queryString}
                                    onChange={(e) =>
                                        setQueryString(e.target.value)
                                    }
                                ></input>
                            </div>
                        </motion.div>
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
                    </div>
                    <div
                        className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]"
                        id="test-id"
                    >
                        <div
                            ref={containerRef}
                            className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]"
                            id="collection-id"
                        >
                            <InfiniteScroll
                                dataLength={leagueAthletes.length}
                                next={fetchMoreData}
                                hasMore={hasNextPage && !isLoadingMore} // Disable next if loading
                                loader={
                                    isLoadingMore ? <h4>Loading...</h4> : null
                                } // Conditionally show loader
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
                                    : currentAthletes != null &&
                                      hasFetchedInitial && (
                                          <div className="mt-[2vw] px-[5vw]">
                                              <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[4vw] font-normal text-transparent">
                                                  There are currently no
                                                  athletes for{" "}
                                                  {positionList[positionIndex]}.
                                                  Please check again later.
                                              </p>
                                          </div>
                                      )}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
            {showAthleteModal && (
                <AthleteModal
                    athlete={selectedAthlete}
                    onClose={closeAthleteModal}
                />
            )}
        </div>
    );
};
