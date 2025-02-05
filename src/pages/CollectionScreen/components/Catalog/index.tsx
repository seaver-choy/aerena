import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import {
    getAthletePositionLogo,
    getAthletePositionBackground,
    getBaseTeamColor,
} from "../../../../helpers/athletes";
import { Athlete, LeagueCompetition, TeamColor } from "../../../../helpers/interfaces";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";
import { getAthletes, getLeagues } from "../../../../helpers/lambda.helper";
import { LeagueModal } from "../../modals/LeagueModal";
import { AthleteCard } from "../../../../components/AthleteCard";

export const Catalog = () => {
    const user = useUsers();
    const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [maxLength] = useState<number>(positionList.length - 1);
    const [showAthlete, setShowAthlete] = useState(false);
    const [allAthletes, setAllAthletes] = useState<Athlete[]>([]);
    const [leagueAthletes, setLeagueAthletes] = useState<Athlete[]>(null);
    const [currentAthletes, setCurrentAthletes] = useState<Athlete[]>(null);
    const [leagueTypes, setLeagueTypes] = useState<LeagueCompetition[]>(null);
    const [chosenLeagueType, setChosenLeagueType] =
        useState<LeagueCompetition>(null);
    const [showLeagueModal, setShowLeagueModal] = useState<boolean>(false);

    const handlePreviousCategory = () => {
        if (positionIndex > 0) {
            setPositionIndex(positionIndex - 1);
        }
    };

    const handleNextCategory = () => {
        if (positionIndex < maxLength) {
            setPositionIndex(positionIndex + 1);
        }
    };

    const displayLeagueModal = () => {
        setShowLeagueModal(true);
    };

    const closeLeagueModal = () => {
        setShowLeagueModal(false);
    };

    function compileAthletes(position: string) {
        const filteredPosition = leagueAthletes.filter((obj) =>
            obj.position.includes(position)
        );

        const sorted = filteredPosition.sort((a, b) => {
            const teamA = a.team.toUpperCase();
            const teamB = b.team.toUpperCase();

            const nameA = a.displayName;
            const nameB = b.displayName;

            const teamOrder = teamA.localeCompare(teamB);
            const nameOrder = nameA.localeCompare(nameB);

            return teamOrder || nameOrder;
        });
        console.log(sorted);
        setCurrentAthletes(sorted);
    }

    useEffect(() => {
        if(allAthletes !== null && leagueAthletes != null) {
            compileAthletes(positionList[positionIndex]);
            setShowAthlete(false);

            const timer = setTimeout(() => {
                setShowAthlete(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [positionIndex, leagueAthletes]);

    useEffect(() => {
        if(allAthletes !== null && chosenLeagueType != null) {
            const tempAthletes = allAthletes.filter((obj) =>
                obj.league.includes(chosenLeagueType.leagueType)
            );
            setLeagueAthletes(tempAthletes);
        }
    }, [chosenLeagueType]);


    const getAllAthletes = async () => {
        const allAthletes = await getAthletes(user.initDataRaw);
        const allLeagueTypes = await getLeagues(user.initDataRaw); //TODO: currently uses packinfos, will have to update to whatever collection lists the leagues
        const initialLeagueType = allLeagueTypes[0];
        setChosenLeagueType(initialLeagueType);
        const tempAthletes = allAthletes.filter((obj) =>
            obj.league.includes(initialLeagueType.leagueType)
        );
        setAllAthletes(allAthletes);
        setLeagueTypes(allLeagueTypes);
        setLeagueAthletes(tempAthletes);
    };
    
    useEffect(() => {
        getAllAthletes();
    }, []);

    return (
        <div className="mt-[10vw] h-[193vw]">
            
            {showLeagueModal && (
                <LeagueModal
                    closeModal={closeLeagueModal}
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
                            Player Catalog
                        </motion.p>
                    </div>
                    <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                        <motion.button
                            className="relative flex h-[7vw] items-center justify-center"
                            onClick={displayLeagueModal}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex">
                                <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
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
                <div className="absolute mt-[29vw] flex h-[13vw] w-full justify-center px-[4vw]">
                    <button
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
                    </button>
                </div>
                <div className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]">
                    <div className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
                        { currentAthletes != null && currentAthletes?.length > 0 ? (
                            currentAthletes?.map((athlete, index) =>
                                showAthlete ? (
                                    <motion.button
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                        key={index}
                                        {...appearCardAnimation}
                                    >
                                        <AthleteCard
                                            color={baseColor}
                                            ign={
                                                athlete.displayName
                                            }
                                            role={
                                                athlete.position[0]
                                            }
                                            opacity={{
                                                wave: baseColor.wave,
                                            }}
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
                        ) : currentAthletes != null && (
                            <div className="mt-[2vw] px-[5vw]">
                                <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[4vw] font-normal text-transparent">
                                    There are currently no athletes for{" "}
                                    {positionList[positionIndex]}. Please check again later.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
