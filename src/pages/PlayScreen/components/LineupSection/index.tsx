import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import { bobbleAnimation } from "../../../../helpers/animation";
import {
    submitLineup,
    getLuckyPicks,
    getInvoiceLinkForPremiumTournament,
    saveStarsTransaction,
} from "../../../../helpers/lambda.helper";
import { Tournament, TournamentLineup } from "../../../../helpers/interfaces";
import { Lineup } from "../Lineup";
import { LineupTitle } from "../LineupTitle";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { SuccessModal } from "../../modals/SuccessModal";
import { ErrorModal } from "../../modals/ErrorModal";
import { LoadingModal } from "../../modals/LoadingModal";

import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";
import LuckyPickIcon from "../../../../assets/icon/lucky-pick.svg";
import TGStarWhite from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points.svg";
import { initInvoice } from "@telegram-apps/sdk-react";

interface LineupSectionProps {
    ongoingTournament: Tournament;
    updateLineup: (ongoingTournament: Tournament) => void;
    showTournament: boolean;
    playTab: string;
}

export const LineupSection = ({
    ongoingTournament,
    updateLineup,
    showTournament,
    playTab,
}: LineupSectionProps) => {
    // const [showAfterTimer, setShowAfterTimer] = useState<boolean>(false);
    const user = useUsers();
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showErrorDeadline, setShowErrorDeadline] = useState<boolean>(false);
    const [showErrorIncomplete, setShowErrorIncomplete] =
        useState<boolean>(false);
    const [loadLuckyPick, setLoadLuckyPick] = useState<boolean>(false);
    
    const defaultLineup = [
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
    ];
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
    const [initialLineup, setInitialLineup] =
        useState<TournamentLineup[]>(tournamentLineup);
    const [editLineup, setEditLineup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const invoice = initInvoice();

    const setupTournamentLineup = () => {
        console.log(ongoingTournament);
        if (ongoingTournament !== null) {
            const lineup: TournamentLineup[] = [];

            for (const position of ongoingTournament.positions) {
                const obj = {
                    position: position,
                    athlete: null,
                };
                lineup.push(obj);
            }

            // /* Code for single user lineup submission*/
            // const userFilter = ongoingTournament.usersJoined.filter(
            //     (x) => x.username === user.username
            // );
            // if (userFilter.length > 0) {
            //     for (let i = 0; i < ongoingTournament.positions.length; i++) {
            //         const obj = {
            //             position: ongoingTournament.positions[i],
            //             athlete: userFilter[0].lineup[i],
            //         };
            //         lineup.push(obj);
            //     }
            //     setHasJoinedTournament(true);
            // } else {
            //     for (const position of ongoingTournament.positions) {
            //         const obj = {
            //             position: position,
            //             athlete: null,
            //         };
            //         lineup.push(obj);
            //     }
            // }

            console.log(lineup);
            setTournamentLineup(lineup);
        }
    };

    const isTournamentClosed = () => {
        if (ongoingTournament !== null) {
            console.log(ongoingTournament);
            if (
                Date.now() >
                new Date(
                    ongoingTournament.tournamentEndSubmissionDate
                ).getTime()
            ) {
                console.log("true1");
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    const handleEditLineup = () => {
        if (editLineup) {
            setEditLineup(false);
            setTournamentLineup(initialLineup);
        } else {
            setEditLineup(true);
            setInitialLineup(tournamentLineup);
        }
    };

    const handleFetchLuckyPicks = async () => {
        setLoadLuckyPick(true);
        setTournamentLineup(null);
        if (ongoingTournament !== null) {
            const luckyPicks = await getLuckyPicks(
                ongoingTournament.league,
                user.initDataRaw
            );

            const lineup = tournamentLineup.map((obj, i) => {
                return { ...obj, athlete: luckyPicks[i] };
            });
            console.log(lineup);
            setTournamentLineup(lineup);
        }
    };

    const lineupSubmission = async (lineup) => {
        try {
            const result = await submitLineup(
                ongoingTournament.tournamentId,
                user.id,
                user.username,
                lineup,
                user.initDataRaw
            );
            if (result.userUpdate) {
                console.log("Joined a tournament");
                user.dispatch({
                    type: "SET_JOINED_TOURNAMENTS",
                    payload: {
                        joinedTournaments:
                            result.userUpdate["joinedTournaments"],
                    },
                });
                console.log();
                //setHasJoinedTournament(true);
                setIsLoading(false);
                setShowSuccessModal(true);
                setTournamentLineup(defaultLineup);
                updateLineup(result.tournamentUpdate);
            } else if (result.error === "SUBMISSION_ENDED") {
                setShowErrorDeadline(true);
            } else {
                setShowErrorModal(true);
            }
        } catch (e) {
            console.log(e);
            setShowErrorModal(true);
        }
    };
    const handleEnterTournament = async () => {
        const check = tournamentLineup.every((obj) => obj.athlete !== null);
        if (check) {
            setIsLoading(true);
            const lineup = tournamentLineup.map((obj) => {
                return obj.athlete;
            });

            if (ongoingTournament.type === "premium") {
                const invoiceLink = await getInvoiceLinkForPremiumTournament(
                    user.id,
                    "premium_tournament",
                    ongoingTournament.tournamentId,
                    ongoingTournament.joinCost,
                    user.initDataRaw
                );
                console.log(invoiceLink);
                setIsLoading(false);
                if (invoiceLink != null && invoiceLink["link"] != null) {
                    invoice
                        .open(invoiceLink["link"], "url")
                        .then(async (status) => {
                            if (status === "paid") {
                                const transactionResult =
                                    await saveStarsTransaction(
                                        user.id,
                                        invoiceLink.updateId,
                                        invoiceLink.transactionInfo,
                                        invoiceLink.transactionType,
                                        invoiceLink.amount,
                                        user.initDataRaw
                                    );
                                if (transactionResult) {
                                    setIsLoading(true);
                                    lineupSubmission(lineup);
                                }
                            }
                        });
                }
            } else lineupSubmission(lineup);
        } else {
            setShowErrorIncomplete(true);
        }
    };
    // const showBanner = () => {
    //     setTimeout(() => {
    //         setShowAfterTimer(true);
    //     }, 1000);
    // };

    useEffect(() => {
        // setShowAfterTimer(false);
        // showBanner();
    }, [playTab]);

    useEffect(() => {
        if (ongoingTournament != null) setupTournamentLineup();
    }, [ongoingTournament]);

    return (
        showTournament &&
        ongoingTournament != null && (
            <div className="mt-[4vw] h-[120vw]">
                {showSuccessModal && (
                    <SuccessModal
                        title="Success!"
                        message="You have successfully joined the tournament!"
                        onClose={() => setShowSuccessModal(false)}
                    />
                )}
                {showErrorDeadline && (
                    <ErrorModal
                        title="Error!"
                        message="The tournament submission period has ended."
                        onClose={() => setShowErrorDeadline(false)}
                    />
                )}
                {showErrorIncomplete && (
                    <ErrorModal
                        title="Error!"
                        message="Your lineup is incomplete."
                        onClose={() => setShowErrorIncomplete(false)}
                    />
                )}
                {showErrorModal && (
                    <ErrorModal
                        title="Error!"
                        message="Something went wrong. Please try again."
                        onClose={() => setShowErrorModal(false)}
                    />
                )}
                {showConfirmModal && (
                    <ConfirmModal
                        onCancel={() => setShowConfirmModal(false)}
                        onConfirm={() => {
                            setShowConfirmModal(false);
                            handleEnterTournament();
                        }}
                        loading={isLoading}
                    />
                )}
                {isLoading && <LoadingModal />}
                <div className="relative flex justify-center">
                    <img className="h-full w-full" src={LineupBackground} />
                    <LineupTitle
                        handleEdit={handleEditLineup}
                        isTournamentClosed={isTournamentClosed()}
                    />
                    <Lineup
                        key={
                            ongoingTournament != null
                                ? ongoingTournament.tournamentId
                                : 0
                        }
                        // playTab={playTab}
                        //athletes={user.tokens}
                        tournament={ongoingTournament}
                        tournamentLineup={tournamentLineup}
                        editLineup={true}
                        setTournamentLineup={setTournamentLineup}
                        loadLuckyPick={loadLuckyPick}
                        setLoadLuckyPick={setLoadLuckyPick}
                    />
                    <button className="absolute bottom-[3.2vw] flex h-[7.2vh] w-[56vw] items-end">
                        <button
                            className="relative w-full items-center justify-center"
                            onClick={
                                editLineup
                                    ? () => {
                                          setEditLineup(false);
                                      }
                                    : isLoading || isTournamentClosed()
                                      ? () => {}
                                      : () => setShowConfirmModal(true)
                            }
                        >
                            
                            {
                                ongoingTournament.type === "free"
                                    ?
                                        <div className="absolute flex h-full w-full items-center justify-center">
                                            <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                                JOIN FOR&nbsp;
                                            </p>
                                            <img
                                                className="h-[3vw]"
                                                src={BattlePointsIcon}
                                            ></img>
                                            <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                                &nbsp;{ongoingTournament.joinCost}
                                            </p>
                                        </div>
                                    : 
                                    <div className="absolute flex h-full w-full items-center justify-center">
                                        <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                            JOIN FOR&nbsp;
                                        </p>
                                        <img
                                            className="h-[3vw]"
                                            src={TGStarWhite}
                                        ></img>
                                        <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                            &nbsp;{ongoingTournament.joinCost}
                                        </p>
                                    </div>
                            }
                            <img className="w-full" src={LineupButton} />
                        </button>
                    </button>
                    <motion.button
                        className="absolute bottom-[6.5vw] right-[4vw] h-[15vw] w-[15vw]"
                        onClick={handleFetchLuckyPicks}
                        {...bobbleAnimation}
                    >
                        <img className="w-full" src={LuckyPickIcon} />
                    </motion.button>
                </div>
            </div>
        )
    );
};
