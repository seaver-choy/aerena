import { useState } from "react";
import { motion } from "motion/react";
import { appearCardAnimation, pulseAnimation } from "../../../../helpers/animation";
import { AthleteSelectModal } from "../../modals/AthleteSelectModal";
import { DreamTeam, TeamColor, TeamProfile, Token, TournamentLineup } from "../../../../helpers/interfaces";
import { getBaseTeamColor, getEmptyAthleteCard } from "../../../../helpers/athletes";
import { AthleteCard } from "../../../../components/AthleteCard";

import AthleteSonnerGold from "../../../../assets/sonner/athlete-gold.svg";
interface DreamTeamLineupProps {
    dreamTeam: DreamTeam;
    handleDreamTeam: (teamProfile: TeamProfile, tokens: Token[]) => void;
    dreamTeamLineup: TournamentLineup[];
    currentPositionIndex: number;
    positionChange: boolean;
    teamChange: boolean;
}

export const DreamTeamLineup = ({dreamTeam, handleDreamTeam, dreamTeamLineup, currentPositionIndex, positionChange, teamChange}: DreamTeamLineupProps) => {
    const [showAthleteSelectModal, setShowAthleteSelectModal] =
        useState<boolean>(false);
    const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [positionIndex, setPositionIndex] = useState<number>(-1);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());

    const handleSetLineup = (index) => {
        setShowAthleteSelectModal(true);
        setPositionIndex(index);
    };

    const closeAthleteSelectModal = () => {
        setShowAthleteSelectModal(false);
    };

    return (
        <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
             {
                positionList.map((position, index) => (
                    <div key={index}>
                        {
                            ((positionChange && currentPositionIndex === index) || (teamChange && dreamTeamLineup[index].athlete !== null)) && (
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
                        {
                            dreamTeamLineup !== null &&
                            dreamTeamLineup[index].athlete === null && (
                                <motion.div
                                    className={`relative flex h-[36.4vw] w-[28vw] ${positionChange && currentPositionIndex === index ? "hidden" : ""}`}
                                    onClick={() => handleSetLineup(index)}
                                    {...appearCardAnimation}
                                >
                                    <img
                                        className="h-full w-full"
                                        src={getEmptyAthleteCard(position)}
                                    ></img>
                                </motion.div>
                            )}
                        {
                            !teamChange &&
                            dreamTeamLineup !== null &&
                            dreamTeamLineup[index].athlete !== null && (
                                <motion.div
                                    className={`relative flex h-[36.4vw] w-[28vw] ${currentPositionIndex === index ? "hidden" : ""}`}
                                    onClick={() => handleSetLineup(index)}
                                    {...appearCardAnimation}
                                >
                                    <AthleteCard
                                        color={dreamTeam.teamProfile != undefined ? dreamTeam.teamProfile.baseTeamColors: baseColor}
                                        ign={
                                            dreamTeamLineup[index].athlete
                                                .displayName
                                        }
                                        role={
                                            dreamTeamLineup[index].athlete
                                                .position[0]
                                        }
                                        opacity={{
                                            wave: dreamTeam.teamProfile != undefined ? dreamTeam.teamProfile.baseTeamColors.wave: baseColor.wave,
                                        }}
                                        id={index}
                                    />
                                </motion.div>
                            )}
                        {
                            !positionChange &&
                            dreamTeamLineup !== null &&
                            currentPositionIndex === index &&
                            dreamTeamLineup[index].athlete !== null && (
                                <motion.div
                                    className="relative flex h-[36.4vw] w-[28vw]"
                                    onClick={() => handleSetLineup(index)}
                                    {...appearCardAnimation}
                                >
                                    <AthleteCard
                                        color={dreamTeam.teamProfile != undefined ? dreamTeam.teamProfile.baseTeamColors: baseColor}
                                        ign={
                                            dreamTeamLineup[index].athlete
                                                .displayName
                                        }
                                        role={
                                            dreamTeamLineup[index].athlete
                                                .position[0]
                                        }
                                        opacity={{
                                            wave: dreamTeam.teamProfile != undefined ? dreamTeam.teamProfile.baseTeamColors.wave: baseColor.wave,
                                        }}
                                        id={index}
                                    />
                                </motion.div>
                            )}
                    </div>
                ))
             }
            {showAthleteSelectModal && (
                <AthleteSelectModal dreamTeam={dreamTeam} dreamTeamLineup={dreamTeamLineup} position={positionList[positionIndex]} positionIndex={positionIndex} onSelect={handleDreamTeam} onClose={closeAthleteSelectModal} />
            )}
        </div>
    );
};
