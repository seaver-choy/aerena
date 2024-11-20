import { useState, useEffect } from "react";
import { Lineup } from "../Lineup";
import { LineupTitle } from "../LineupTitle";
import { SuccessModal } from "../SuccessModal";
import { getUserAthletesApi } from "../../../../helpers/lambda.helpers";
import { useTonConnectUI } from "@tonconnect/ui-react";
import BackgroundLineup from "../../../../assets/background-lineup.svg";
import ButtonLineup from "../../../../assets/button-lineup.svg";
import { TournamentLineup } from "../../../../helpers/interfaces";

export const LineupSection = () => {
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [userAthletes, setUserAthletes] = useState([]);
    const [tournamentLineup, setTournamentLineup] = useState<
        TournamentLineup[]
    >([
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
    const [tonConnectUI] = useTonConnectUI();
    const onCloseModal = () => {
        setShowSuccessModal(false);
    };

    const canShowSelected = () => {
        setAllSelected(true);
    };

    const getAthletes = async () => {
        const result = await getUserAthletesApi(tonConnectUI.account?.address!);
        setUserAthletes(result);
    };

    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        getAthletes();
    }, []);

    return (
        <div className="mt-[4vw] h-[120vw]">
            <div className="relative flex justify-center">
                <img className="h-full w-full" src={BackgroundLineup} />
                <LineupTitle />
                <Lineup
                    key={userAthletes?.length}
                    athletes={userAthletes}
                    canShowFinished={canShowSelected}
                    tournamentLineup={tournamentLineup}
                    setTournamentLineup={setTournamentLineup}
                />
                {showSuccessModal && <SuccessModal onClose={onCloseModal} />}
                <div
                    className={`absolute bottom-[3.2vw] flex h-[7.2vh] w-[56vw] items-end ${allSelected ? "" : "opacity-50"}`}
                >
                    <button
                        className="relative w-full items-center justify-center"
                        onClick={() => {
                            if (allSelected) {
                                setShowSuccessModal(true);
                            }
                        }}
                    >
                        <div
                            className={`absolute flex h-full w-full items-center justify-center`}
                        >
                            <p className="pt-[0.8vw] font-russoone text-[3vw] text-white">
                                Enter Tournament
                            </p>
                        </div>
                        <img className="w-full" src={ButtonLineup}></img>
                    </button>
                </div>
            </div>
        </div>
    );
};
