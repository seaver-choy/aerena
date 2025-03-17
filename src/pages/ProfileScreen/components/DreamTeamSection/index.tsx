import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import {
    DreamTeam,
    TeamProfile,
    Token,
    TournamentLineup,
} from "../../../../helpers/interfaces";
import { saveDreamTeam } from "../../../../helpers/lambda.helper";
import { DreamTeamTitle } from "../DreamTeamTitle";
import { DreamTeamLineup } from "../DreamTeamLineup";
import { DreamTeamModal } from "../../modals/DreamTeamModal";
import { ErrorModal } from "../../modals/ErrorModal";

import LineupButton from "../../../../assets/button/lineup.svg";

export const DreamTeamSection = () => {
    const user = useUsers();
    const [dreamTeam, setDreamTeam] = useState<DreamTeam>(user.dreamTeam);
    const [dreamteamLineup, setDreamTeamLineup] = useState<TournamentLineup[]>([
        {
            position: "Roam",
            athlete: null,
        },
        {
            position: "Mid",
            athlete: null,
        },
        {
            position: "Jungle",
            athlete: null,
        },
        {
            position: "Gold",
            athlete: null,
        },
        {
            position: "EXP",
            athlete: null,
        },
    ]);
    const [currentPositionIndex, setCurrentPositionIndex] =
        useState<number>(-1);
    const [positionChange, setPositionChange] = useState<boolean>(false);
    const [teamChange, setTeamChange] = useState<boolean>(false);
    const [showDreamTeamModal, setShowDreamTeamModal] =
        useState<boolean>(false);
    const [showIncompleteModal, setShowIncompleteModal] =
        useState<boolean>(false);

    const handleDreamTeam = async (
        teamProfile: TeamProfile,
        lineup: Token[],
        index = -1
    ) => {
        try {
            if (index !== -1) setPositionChange(true);
            else setTeamChange(true);
            setCurrentPositionIndex(index);
            const result = await saveDreamTeam(
                user.id,
                { teamProfile, lineup },
                user.initDataRaw
            );
            setDreamTeam(result["dreamTeam"]);
            user.dispatch({
                type: "SET_DREAM_TEAM",
                payload: {
                    dreamTeam: result["dreamTeam"],
                },
            });

            setPositionChange(false);
            setTeamChange(false);
        } catch (e) {
            setDreamTeam(user.dreamTeam);
        }
    };

    const updateDreamTeamLineup = () => {
        const updatedLineup = dreamteamLineup.map((position, index) => ({
            ...position,
            athlete: dreamTeam.lineup[index] || null,
        }));
        setDreamTeamLineup(updatedLineup);
    };

    useEffect(() => {
        updateDreamTeamLineup();
    }, [dreamTeam]);

    const displayDreamTeamModal = () => {
        console.log(dreamTeam);
        setCurrentPositionIndex(-1);
        setShowDreamTeamModal(true);
    };

    const closeDreamTeamModal = () => {
        setShowDreamTeamModal(false);
    };

    return (
        <div className="mb-[6vw] mt-[4vw] h-[120vw]">
            <div className="relative flex justify-center">
                <DreamTeamTitle
                    dreamTeam={dreamTeam}
                    handleDreamTeam={handleDreamTeam}
                />
                <DreamTeamLineup
                    dreamTeam={dreamTeam}
                    handleDreamTeam={handleDreamTeam}
                    dreamTeamLineup={dreamteamLineup}
                    currentPositionIndex={currentPositionIndex}
                    positionChange={positionChange}
                    teamChange={teamChange}
                    // isExporting={isExporting}
                    // setIsExporting={setIsExporting}
                    // setShareData={setShareData}
                />
                {/* <div className="absolute bottom-[3vw] flex h-[7.2vh] w-[56vw] items-end">
                    <button
                        className="relative w-full items-center justify-center"
                        onClick={displayDreamTeamModal}
                    />
                </div> */}
                <div className="absolute bottom-[3vw] flex h-[7.2vh] w-[56vw] items-end">
                    <button
                        className="relative w-full items-center justify-center"
                        onClick={displayDreamTeamModal}
                    >
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                Share Lineup
                            </p>
                        </div>
                        <img className="h-full w-full" src={LineupButton} />
                    </button>
                    {showDreamTeamModal && (
                        <DreamTeamModal
                            dreamTeam={dreamTeam}
                            onClose={closeDreamTeamModal}
                        />
                    )}
                    {showIncompleteModal && (
                        <ErrorModal
                            title={"Oops!"}
                            message={
                                "Your Dream Team is incomplete. Please try again later."
                            }
                            onClose={() => setShowIncompleteModal(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
