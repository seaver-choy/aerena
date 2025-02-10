import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    //Token,
    Tournament,
    TournamentLineup,
} from "../../../../helpers/interfaces";
import {
    appearCardAnimation,
    appearTextLuckyPickAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { TeamColor } from "../../../../helpers/interfaces";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { getEmptyAthleteCard } from "../../../../helpers/athletes";
import { AthleteCard } from "../../../../components/AthleteCard";
import { AthleteSelectModal } from "../../modals/AthleteSelectModal";

import AthleteSonnerGold from "../../../../assets/sonner/athlete-gold.svg";

interface LineupProps {
    // playTab: string;
    //athletes: Token[];
    tournament: Tournament;
    tournamentLineup: TournamentLineup[];
    setTournamentLineup: (tournamentLineup: TournamentLineup[]) => void;
    loadLuckyPick: boolean;
    setLoadLuckyPick: (loadLuckPick: boolean) => void;
}

export const Lineup = ({
    // playTab,
    //athletes,
    tournament,
    tournamentLineup,
    setTournamentLineup,
    loadLuckyPick,
    setLoadLuckyPick,
}: LineupProps) => {
    const positionList =
        tournament !== null
            ? tournament.positions
            : ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [currentPositionIndex, setCurrentPositionIndex] =
        useState<number>(-1);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [showAthleteSelectModal, setShowAthleteSelectModal] =
        useState<boolean>(false);
    const [newSelected, setNewSelected] = useState<boolean>(false);
    const [usedLP, setUsedLP] = useState<boolean>(false);

    const handleSelect = async (athlete) => {
        setUsedLP(false);
        setShowAthleteSelectModal(false);
        const newLineup = tournamentLineup.map((obj, i) => {
            if (i === currentPositionIndex) {
                return { ...obj, athlete: athlete };
            } else {
                return obj;
            }
        });
        setTournamentLineup(newLineup);
        setNewSelected(true);
    };

    const handleSetLineup = (index) => {
        setNewSelected(false);
        setShowAthleteSelectModal(true);
        setCurrentPositionIndex(index);
    };

    const closeAthleteModal = () => {
        setCurrentPositionIndex(-1);
        setShowAthleteSelectModal(false);
    };

    useEffect(() => {
        if (loadLuckyPick) {
            setCurrentPositionIndex(-1);
            setUsedLP(true);

            setTimeout(() => {
                setLoadLuckyPick(false);
            }, 1000);
        }
    }, [loadLuckyPick]);

    return (
        <>
            <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
                {positionList.map((position, index) => (
                    <div>
                        {loadLuckyPick && (
                            <motion.div
                                className="relative flex h-[36.4vw] w-[28vw]"
                                {...pulseAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={AthleteSonnerGold}
                                />
                            </motion.div>
                        )}
                        {!loadLuckyPick &&
                            tournamentLineup !== null &&
                            tournamentLineup[index].athlete === null && (
                                <motion.div
                                    className="relative flex h-[36.4vw] w-[28vw]"
                                    onClick={() => handleSetLineup(index)}
                                    {...appearCardAnimation}
                                >
                                    <img
                                        className="h-full w-full"
                                        src={getEmptyAthleteCard(position)}
                                    ></img>
                                </motion.div>
                            )}
                        {!loadLuckyPick &&
                            tournamentLineup !== null &&
                            tournamentLineup[index].athlete !== null && (
                                <motion.div
                                    className={`relative flex h-[36.4vw] w-[28vw] ${currentPositionIndex === index ? "hidden" : ""}`}
                                    onClick={() => handleSetLineup(index)}
                                    {...(currentPositionIndex === -1 && !usedLP
                                        ? appearCardAnimation
                                        : appearTextLuckyPickAnimation({
                                              delay: index,
                                          }))}
                                >
                                    {/* <img
                                                className="h-full w-full"
                                                src={tournamentLineup[index].athlete.img}
                                            ></img> */}
                                    <AthleteCard
                                        color={baseColor}
                                        ign={
                                            tournamentLineup[index].athlete
                                                .displayName
                                        }
                                        role={
                                            tournamentLineup[index].athlete
                                                .position[0]
                                        }
                                        opacity={{ wave: baseColor.wave }}
                                    />
                                </motion.div>
                            )}
                        {!loadLuckyPick &&
                            newSelected &&
                            currentPositionIndex === index &&
                            tournamentLineup !== null &&
                            tournamentLineup[index].athlete !== null && (
                                <motion.div
                                    className="relative flex h-[36.4vw] w-[28vw]"
                                    onClick={() => handleSetLineup(index)}
                                    {...appearCardAnimation}
                                >
                                    <AthleteCard
                                        color={baseColor}
                                        ign={
                                            tournamentLineup[index].athlete
                                                .displayName
                                        }
                                        role={
                                            tournamentLineup[index].athlete
                                                .position[0]
                                        }
                                        opacity={{
                                            wave: baseColor.wave,
                                        }}
                                    />

                                    {/* <img
                                        className="h-full w-full"
                                        src={
                                            tournamentLineup[index].athlete.img
                                        }
                                    ></img> */}
                                </motion.div>
                            )}
                    </div>
                ))}
            </div>
            {showAthleteSelectModal && (
                <AthleteSelectModal
                    // playTab={playTab}
                    // athletes={athletes}
                    onClose={closeAthleteModal}
                    onSelect={handleSelect}
                    position={positionList[currentPositionIndex]}
                    tournamentLineup={tournamentLineup}
                    tournament={tournament}
                />
            )}
        </>
    );
};
