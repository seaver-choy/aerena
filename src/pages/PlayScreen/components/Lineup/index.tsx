/* eslint-disable */
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { getUserAthletesApi } from "../../../../helpers/lambda.helpers";
import { AthleteSelectModal } from "../../modals/AthleteSelectModal";
import { Token, TournamentLineup } from "../../../../helpers/interfaces";
import EmptyEXP from "../../../../assets/empty-exp.svg";
import EmptyGold from "../../../../assets/empty-gold.svg";
import EmptyJungle from "../../../../assets/empty-jungle.svg";
import EmptyMid from "../../../../assets/empty-mid.svg";
import EmptyRoam from "../../../../assets/empty-roam.svg";

interface LineupProps {
    canShowFinished: () => void;
    athletes: Token[];
    tournamentLineup: TournamentLineup[];
    setTournamentLineup: (tournamentLineup: TournamentLineup[]) => void;
}

export const Lineup = ({
    canShowFinished,
    athletes,
    tournamentLineup,
    setTournamentLineup,
}: LineupProps) => {
    const [showAthleteSelectModal, setShowAthleteSelectModal] =
        useState<boolean>(false);

    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const handleSelectAthlete = (athlete) => {
        setShowAthleteSelectModal(false);

        const newLineup = tournamentLineup.map((obj, i) => {
            if (i === currentPositionIndex) {
                return { ...obj, athlete: athlete };
            } else {
                return obj;
            }
        });

        const check = newLineup.every((obj) => obj.athlete !== null);
        if (check) {
            canShowFinished();
        }
        setTournamentLineup(newLineup);
    };

    const handleSetLineup = (index) => {
        setShowAthleteSelectModal(true);
        setCurrentPositionIndex(index);
    };

    const closeAthleteSelectModal = () => {
        setShowAthleteSelectModal(false);
    };

    return (
        <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
            {showAthleteSelectModal && (
                <AthleteSelectModal
                    cancel={closeAthleteSelectModal}
                    athletes={athletes}
                    submission={handleSelectAthlete}
                />
            )}
            <button
                className="relative flex h-[37vw] w-[28vw] animate-appear"
                onClick={() => handleSetLineup(0)}
            >
                <img
                    className="h-[100%]"
                    src={
                        tournamentLineup[0].athlete
                            ? tournamentLineup[0].athlete.img
                            : EmptyRoam
                    }
                />
            </button>

            <button
                className="relative flex h-[37vw] w-[28vw] animate-appear"
                onClick={() => handleSetLineup(1)}
            >
                <img
                    className="h-[100%]"
                    src={
                        tournamentLineup[1].athlete
                            ? tournamentLineup[1].athlete.img
                            : EmptyMid
                    }
                />
            </button>
            <button
                className="relative flex h-[37vw] w-[28vw] animate-appear"
                onClick={() => handleSetLineup(2)}
            >
                <img
                    className="h-[100%]"
                    src={
                        tournamentLineup[2].athlete
                            ? tournamentLineup[2].athlete.img
                            : EmptyJungle
                    }
                />
            </button>
            <button
                className="relative flex h-[37vw] w-[28vw] animate-appear"
                onClick={() => handleSetLineup(3)}
            >
                <img
                    className="h-[100%]"
                    src={
                        tournamentLineup[3].athlete
                            ? tournamentLineup[3].athlete.img
                            : EmptyGold
                    }
                />
            </button>
            <button
                className="relative flex h-[37vw] w-[28vw] animate-appear"
                onClick={() => handleSetLineup(4)}
            >
                <img
                    className="h-[100%]"
                    src={
                        tournamentLineup[4].athlete
                            ? tournamentLineup[4].athlete.img
                            : EmptyEXP
                    }
                />
            </button>
        </div>
    );
};
