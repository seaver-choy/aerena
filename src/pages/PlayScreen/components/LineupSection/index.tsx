import { Cell } from "@ton/core";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import BackgroundLineup from "../../../../assets/background-lineup.svg";
import ButtonLineup from "../../../../assets/button-lineup.svg";
import { Loading } from "../../../../components/Loading";
import { TournamentLineup } from "../../../../helpers/interfaces";
import {
    getUserAthletesApi,
    submitLineup,
} from "../../../../helpers/lambda.helpers";
import { waitForTransaction } from "../../../../helpers/waitTransaction";
import { useTonClient } from "../../../../hooks/useTonClient";
import { Lineup } from "../Lineup";
import { LineupTitle } from "../LineupTitle";
import { SuccessModal } from "../SuccessModal";

export const LineupSection = () => {
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [userAthletes, setUserAthletes] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mount, setMount] = useState<number>(0);
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
    const { client } = useTonClient();
    const onCloseModal = () => {
        setShowSuccessModal(false);
    };

    const submitTransaction: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000,
        messages: [
            {
                address: "0QDca4AyrK6pL6q1zHHbnnjXVC-Lfxv1yIkD36dpSPetRtvb",
                amount: "1000000000",
            },
        ],
    };

    const canShowSelected = () => {
        setAllSelected(true);
    };

    tonConnectUI.onStatusChange(async (walletAndWalletInfo) => {
        if (walletAndWalletInfo) {
            const result = await getUserAthletesApi(
                tonConnectUI.account?.address!
            );
            setUserAthletes(result);
            setMount(1);
        }
    });

    const getAthletes = async () => {
        const result = await getUserAthletesApi(tonConnectUI.account?.address!);
        console.log(result);
        setUserAthletes(result);
        setMount(1);
    };

    const handleSubmitLineup = async () => {
        const check = tournamentLineup.every((obj) => obj.athlete !== null);
        //TODO: add check if wallet is connected
        if (check) {
            const lineup = tournamentLineup.map((obj) => {
                return obj.athlete;
            });

            try {
                const txResult =
                    await tonConnectUI.sendTransaction(submitTransaction);
                setLoading(true);

                const hash = Cell.fromBase64(txResult.boc)
                    .hash()
                    .toString("base64");

                if (client) {
                    const txFinalized = await waitForTransaction(
                        {
                            address: tonConnectUI.account?.address ?? "",
                            hash: hash,
                        },
                        client
                    );
                    console.log(txFinalized);
                    const result = await submitLineup(
                        1,
                        tonConnectUI.account?.address!,
                        lineup
                    );
                    console.log(result);
                    setShowSuccessModal(true);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
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
                    key={mount}
                    athletes={userAthletes}
                    canShowFinished={canShowSelected}
                    tournamentLineup={tournamentLineup}
                    setTournamentLineup={setTournamentLineup}
                />
                {showSuccessModal && <SuccessModal onClose={onCloseModal} />}
                {loading && <Loading />}
                <div
                    className={`absolute bottom-[3.2vw] flex h-[7.2vh] w-[56vw] items-end ${allSelected ? "" : "opacity-50"}`}
                >
                    <button
                        className="relative w-full items-center justify-center"
                        onClick={() => {
                            handleSubmitLineup();
                        }}
                        disabled={loading}
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
