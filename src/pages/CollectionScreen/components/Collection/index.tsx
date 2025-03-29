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
} from "../../../../helpers/athletes";
import { Athlete, Skin } from "../../../../helpers/interfaces";
import { getAthlete } from "../../../../helpers/lambda.helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { AthleteCard } from "../../../../components/AthleteCard";
import { AthleteModal } from "../../../../modals/AthleteModal";

import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";

export const Collection = () => {
    const user = useUsers();
    const positionList = ["All", "Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [currentSkins, setCurrentSkins] = useState<Skin[]>(null);
    const [displaySkins, setDisplaySkins] = useState<Skin[]>([]);
    const [filteredSkins, setFilteredSkins] = useState<Skin[]>(null);
    const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);
    const [selectedSkin, setSelectedSkin] = useState<Skin>(null);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete>(null);
    const [showSkinOffset, setShowSkinOffset] = useState<number>(-1);
    const [offset, setOffset] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>();
    const [hasFetchedInitial, setHasFetchedInitial] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchString, setSearchString] = useState<string>("");
    const [queryString, setQueryString] = useState<string>("");
    const containerRef = useRef(null);

    const fetchAthlete = async (skin) => {
        const result = await getAthlete(skin.athleteId, user.initDataRaw);
        if (result) {
            setSelectedAthlete(result);
            setSelectedSkin(skin);
            setShowAthleteModal(true);
        }
    };

    const displayAthleteModal = (skin: Skin) => {
        fetchAthlete(skin);
    };

    const closeAthleteModal = () => {
        setSelectedSkin(null);
        setShowAthleteModal(false);
    };

    const updateCurrentSkins = async () => {
        setCurrentSkins([...displaySkins]);
    };

    async function compileSkins(position: string) {
        let filteredPosition;
        if (position == "All")
            filteredPosition = user.skins.filter((obj) =>
                obj.player.includes(searchString.toUpperCase())
            );
        else
            filteredPosition = user.skins.filter(
                (obj) =>
                    obj.position.includes(position) &&
                    obj.player.includes(searchString.toUpperCase())
            );

        const sorted = filteredPosition.sort((a, b) => {
            // const teamA = a.team.toUpperCase();
            // const teamB = b.team.toUpperCase();

            const nameA = a.player;
            const nameB = b.player;

            // const teamOrder = teamA.localeCompare(teamB);
            const nameOrder = nameA.localeCompare(nameB);

            // return teamOrder || nameOrder;
            return nameOrder;
        });
        setFilteredSkins(sorted);
        setDisplaySkins(sorted.slice(0, 12));
        setHasNextPage(sorted.length > 12);
    }
    async function fetchMoreData() {
        if (hasNextPage && !isLoadingMore) {
            setIsLoadingMore(true);
            setDisplaySkins((prevSkins) => [
                ...prevSkins,
                ...filteredSkins.slice(offset, offset + 12),
            ]);
            setHasNextPage(filteredSkins.length > offset + 12);
            setOffset((prevOffset) => prevOffset + 12);
            setIsLoadingMore(false);
        } else {
            console.log("No more athletes left or loading in progress");
        }
    }

    useEffect(() => {
        const searchTimer = setTimeout(() => setSearchString(queryString), 500);
        return () => clearTimeout(searchTimer);
    }, [queryString]);

    useEffect(() => {
        if (displaySkins != null) {
            updateCurrentSkins();
            if (showSkinOffset === -1) {
                setShowSkinOffset(12);
            } else {
                setShowSkinOffset(showSkinOffset + 12);
            }
        }
    }, [displaySkins]);

    useEffect(() => {
        async function fetchInitialSkins() {
            if (user.skins.length > 0) {
                compileSkins(positionList[positionIndex]);
            } else {
                setDisplaySkins([]);
            }
            setOffset(12);
            setHasFetchedInitial(true);
            setShowSkinOffset(-1);
        }
        fetchInitialSkins();
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [searchString, positionIndex, user.skins]);

    return (
        <div className="mt-[4vw] h-[193vw]">
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
                    <div className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]">
                        <div
                            className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]"
                            id="collection-scroll"
                            ref={containerRef}
                        >
                            <InfiniteScroll
                                dataLength={displaySkins.length}
                                next={fetchMoreData}
                                hasMore={hasNextPage && !isLoadingMore} // Disable next if loading
                                loader={
                                    isLoadingMore ? <h4>Loading...</h4> : null
                                } // Conditionally show loader
                                scrollableTarget="collection-scroll"
                                className="disable-scrollbar flex flex-row flex-wrap gap-[2vw]"
                            >
                                {currentSkins != null &&
                                currentSkins?.length > 0
                                    ? currentSkins?.map((athlete, index) =>
                                          index < showSkinOffset ? (
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
                                                      color={
                                                          athlete.teamData
                                                              .colors
                                                      }
                                                      ign={athlete.player}
                                                      opacity={{
                                                          wave: athlete.teamData
                                                              .colors.wave,
                                                      }}
                                                      role={athlete.position[0]}
                                                      type={"basic"}
                                                      league={athlete.league}
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
                                    : currentSkins != null &&
                                      hasFetchedInitial && (
                                          <div className="mt-[2vw] px-[5vw]">
                                              <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[4vw] font-normal text-transparent">
                                                  You do not have skins for{" "}
                                                  {positionList[positionIndex]}.
                                                  Purchase packs to obtain
                                                  skins.
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
                    skin={selectedSkin}
                />
            )}
        </div>
    );
};
