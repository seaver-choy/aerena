import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import {
    DreamTeam,
    TeamProfile,
    Token,
    TournamentLineup,
} from "../../../../helpers/interfaces";
import { sampleURL, saveDreamTeam } from "../../../../helpers/lambda.helper";
import { FunctionSection } from "../../../../components/FunctionSection";
import { DreamTeamLineup } from "../DreamTeamLineup";
import { DreamTeamModal } from "../../modals/DreamTeamModal";
import { ErrorModal } from "../../modals/ErrorModal";

import LineupButton from "../../../../assets/button/lineup.svg";

export const DreamTeamSection = () => {
    const user = useUsers();
    const [dreamTeam, setDreamTeam] = useState<DreamTeam>(user.dreamTeam);
    const [dreamTeamLineup, setDreamTeamLineup] = useState<TournamentLineup[]>([
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
    const [currentlySample, setCurrentlySample] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>(null);

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
        const updatedLineup = dreamTeamLineup.map((position, index) => ({
            ...position,
            athlete: dreamTeam.lineup[index] || null,
        }));
        setDreamTeamLineup(updatedLineup);
    };

    useEffect(() => {
        updateDreamTeamLineup();
    }, [dreamTeam]);

    const displayDreamTeamModal = async () => {
        setCurrentPositionIndex(-1);
        if (dreamTeam.lineup?.some((athlete) => athlete === null)) {
            setShowIncompleteModal(true);
        } else {
            setShowDreamTeamModal(true);
            const result = await sampleURL(
                user.id,
                "dreamteam",
                user.initDataRaw
            );
            setCurrentlySample(true);
            setImageUrl(result.imageUrl);
        }
    };

    const closeDreamTeamModal = () => {
        setShowDreamTeamModal(false);
    };

    return (
        <div className="mb-[6vw] mt-[4vw] h-[120vw]">
            <div className="relative flex justify-center">
                <div className="absolute top-[4vw] flex h-[20vw] w-full justify-center px-[0.5vw]">
                    <FunctionSection
                        title="My Dream Team"
                        showRegionButton={false}
                        showLeagueButton={false}
                        dreamTeam={dreamTeam}
                        handleDreamTeam={handleDreamTeam}
                        showTeamButton={true}
                    />
                </div>
                <DreamTeamLineup
                    dreamTeam={dreamTeam}
                    handleDreamTeam={handleDreamTeam}
                    dreamTeamLineup={dreamTeamLineup}
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
                            <p className="font-russoone text-[3.4vw] text-white">
                                Share Lineup
                            </p>
                        </div>
                        <img className="h-full w-full" src={LineupButton} />
                    </button>
                    {showDreamTeamModal && (
                        <DreamTeamModal
                            dreamTeam={dreamTeam}
                            imageUrl={imageUrl}
                            currentlySample={currentlySample}
                            setCurrentlySample={setCurrentlySample}
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
