import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    Skin,
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
    athleteSkins: Skin[];
    tournament: Tournament;
    tournamentLineup: TournamentLineup[];
    setTournamentLineup: (tournamentLineup: TournamentLineup[]) => void;
    loadLuckyPick: boolean;
    setLoadLuckyPick: (loadLuckPick: boolean) => void;
}

export const Lineup = ({
    // playTab,
    athleteSkins,
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
        setShowAthleteSelectModal(false);
        const skin = athleteSkins?.find(
            (s) =>
                s.position[0] === positionList[currentPositionIndex] &&
                s.athleteId === (athlete?.athleteId ?? null)
        );
        const newLineup = tournamentLineup.map((obj, i) => {
            if (i === currentPositionIndex) {
                if (skin == undefined) return { ...obj, athlete: athlete };
                else
                    return {
                        ...obj,
                        athlete: {
                            ...athlete,
                            skin: {
                                skinId: skin.skinId,
                                teamData: skin.teamData,
                                league: skin.league,
                            },
                        },
                    };
            } else {
                return obj;
            }
        });
        setTournamentLineup(newLineup);
        setUsedLP(false);
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
                {positionList.map((position, index) => {
                    const skin = athleteSkins?.find(
                        (s) =>
                            s.position[0] === position &&
                            s.athleteId ===
                                (tournamentLineup?.[index]?.athlete
                                    ?.athleteId ?? null)
                    );
                    return (
                        <div key={index}>
                            {loadLuckyPick && (
                                <div className="h-[36.4vw] w-[28vw]">
                                    <motion.div
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                        {...pulseAnimation}
                                    >
                                        <img
                                            className="h-full w-full"
                                            src={AthleteSonnerGold}
                                        />
                                    </motion.div>
                                </div>
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
                                            className="h-[36.4vw] w-[28vw]"
                                            src={getEmptyAthleteCard(position)}
                                        ></img>
                                    </motion.div>
                                )}
                            {!loadLuckyPick &&
                                tournamentLineup !== null &&
                                currentPositionIndex !== index &&
                                tournamentLineup[index].athlete !== null && (
                                    <motion.div
                                        className="relative flex h-[36.4vw] w-[28vw] overflow-hidden"
                                        onClick={() => handleSetLineup(index)}
                                        {...(currentPositionIndex === -1 &&
                                        !usedLP
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
                                            color={
                                                skin?.teamData.colors ??
                                                baseColor
                                            }
                                            ign={
                                                tournamentLineup[index].athlete
                                                    .displayName
                                            }
                                            role={
                                                tournamentLineup[index].athlete
                                                    .position[0]
                                            }
                                            opacity={{
                                                wave:
                                                    skin?.teamData.colors
                                                        .wave ?? baseColor.wave,
                                            }}
                                            type={skin ? "basic" : null}
                                            league={skin?.league ?? null}
                                            id={index}
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
                                            color={
                                                skin?.teamData.colors ??
                                                baseColor
                                            }
                                            ign={
                                                tournamentLineup[index].athlete
                                                    .displayName
                                            }
                                            role={
                                                tournamentLineup[index].athlete
                                                    .position[0]
                                            }
                                            opacity={{
                                                wave:
                                                    skin?.teamData.colors
                                                        .wave ?? baseColor.wave,
                                            }}
                                            type={skin ? "basic" : null}
                                            league={skin?.league ?? null}
                                            id={index}
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
                    );
                })}
            </div>
            {showAthleteSelectModal && (
                <AthleteSelectModal
                    // playTab={playTab}
                    athleteSkins={athleteSkins.filter(
                        (skin) =>
                            skin.position[0] ===
                            positionList[currentPositionIndex]
                    )}
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
