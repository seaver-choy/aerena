import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import { bobbleAnimation } from "../../../../helpers/animation";
import {
    submitLineup,
    getLuckyPicks,
    getInvoiceLinkForPremiumTournament,
    saveStarsTransaction,
    joinBasic,
} from "../../../../helpers/lambda.helper";
import {
    Skin,
    Tournament,
    TournamentLineup,
} from "../../../../helpers/interfaces";
import {
    isTournamentClosed,
    isTournamentUpcoming,
} from "../../../../hooks/dates";
import { initInvoice } from "@telegram-apps/sdk-react";
import { FunctionSection } from "../../../../components/FunctionSection";
import { Lineup } from "../Lineup";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { NameModal } from "../../modals/NameModal";
import { SuccessModal } from "../../modals/SuccessModal";
import { ErrorModal } from "../../modals/ErrorModal";
import { LoadingModal } from "../../modals/LoadingModal";

import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";
import LuckyPickIcon from "../../../../assets/icon/lucky-pick.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-white.svg";
import LockedIcon from "../../../../assets/icon/locked.svg";

interface LineupSectionProps {
    ongoingTournament: Tournament;
    updateLineup: (ongoingTournament: Tournament) => void;
    showTournament: boolean;
}

export const LineupSection = ({
    ongoingTournament,
    updateLineup,
    showTournament,
}: LineupSectionProps) => {
    const user = useUsers();
    const positionList =
        ongoingTournament !== null
            ? ongoingTournament.positions
            : ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showErrorDeadline, setShowErrorDeadline] = useState<boolean>(false);
    const [showErrorIncomplete, setShowErrorIncomplete] =
        useState<boolean>(false);
    const [showInsufficientModal, setShowInsufficientModal] =
        useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>("");
    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const [loadLuckyPick, setLoadLuckyPick] = useState<boolean>(false);
    const [athleteSkins, setAthleteSkins] = useState<Skin[]>([]);

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
    const [loading, isLoading] = useState<boolean>(false);
    const invoice = initInvoice();

    const setupTournamentLineup = () => {
        if (ongoingTournament !== null) {
            const lineup: TournamentLineup[] = [];

            for (const position of ongoingTournament.positions) {
                const obj = {
                    position: position,
                    athlete: null,
                };
                lineup.push(obj);
            }
            setTournamentLineup(lineup);
            setAthleteSkins(user.skins.filter((skin) => skin.isEquipped));
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
                const skin = athleteSkins?.find(
                    (s) =>
                        s.position[0] === positionList[i] &&
                        s.athleteId === (luckyPicks[i]?.athleteId ?? null)
                );

                if (skin == undefined)
                    return { ...obj, athlete: luckyPicks[i] };
                else
                    return {
                        ...obj,
                        athlete: {
                            ...luckyPicks[i],
                            skin: {
                                skinId: skin.skinId,
                                teamData: skin.teamData,
                                league: skin.league,
                            },
                        },
                    };
            });
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
                teamName == "" ? `${user.username}'s Lineup` : teamName,
                user.initDataRaw
            );
            if (result.userUpdate) {
                user.dispatch({
                    type: "SET_JOINED_TOURNAMENTS",
                    payload: {
                        joinedTournaments:
                            result.userUpdate["joinedTournaments"],
                    },
                });
                //setHasJoinedTournament(true);
                isLoading(false);
                setShowSuccessModal(true);
                setTournamentLineup(defaultLineup);
                updateLineup(result.tournamentUpdate);
            } else if (result.error === "SUBMISSION_ENDED") {
                setShowErrorDeadline(true);
            } else {
                setShowErrorModal(true);
            }
        } catch (e) {
            setShowErrorModal(true);
        }
    };
    const handleEnterTournament = async () => {
        try {
            const check = tournamentLineup.every((obj) => obj.athlete !== null);
            if (check) {
                isLoading(true);
                const lineup = tournamentLineup.map((obj) => {
                    return obj.athlete;
                });
                if (ongoingTournament.type === "premium") {
                    const invoiceLink =
                        await getInvoiceLinkForPremiumTournament(
                            user.id,
                            "premium_tournament",
                            ongoingTournament.tournamentId,
                            ongoingTournament.joinCost,
                            user.initDataRaw
                        );
                    isLoading(false);
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
                                        isLoading(true);
                                        lineupSubmission(lineup);
                                    }
                                }
                            });
                    }
                } else if (user.points >= ongoingTournament.joinCost) {
                    const result = await joinBasic(
                        user.id,
                        ongoingTournament.joinCost,
                        user.initDataRaw
                    );
                    user.dispatch({
                        type: "SET_POINTS",
                        payload: { points: result["points"] },
                    });
                    lineupSubmission(lineup);
                } else {
                    isLoading(false);
                    setShowInsufficientModal(true);
                }
            } else {
                setShowErrorIncomplete(true);
            }
        } catch (e) {
            console.log(e);
            isLoading(false);
            setShowErrorModal(true);
        }
        setTeamName("");
    };

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
                {showInsufficientModal && (
                    <ErrorModal
                        title="Error!"
                        message="You do not have enough Battle Points to join the tournament."
                        onClose={() => setShowInsufficientModal(false)}
                    />
                )}
                {showConfirmModal && (
                    <ConfirmModal
                        onClose={() => setShowConfirmModal(false)}
                        onConfirm={() => {
                            setShowNameModal(true);
                            setShowConfirmModal(false);
                        }}
                        loading={loading}
                        tournamentType={ongoingTournament.type}
                        joinCost={ongoingTournament.joinCost}
                    />
                )}
                {showNameModal && (
                    <NameModal
                        teamName={teamName}
                        setTeamName={setTeamName}
                        onClose={() => {
                            setTeamName("");
                            setShowNameModal(false);
                        }}
                        onConfirm={() => {
                            setShowNameModal(false);
                            handleEnterTournament();
                        }}
                    />
                )}
                {loading && <LoadingModal />}
                <div className="relative flex justify-center">
                    <img className="h-full w-full" src={LineupBackground} />
                    <div className="absolute top-[4vw] flex h-[20vw] w-full justify-center px-[0.5vw]">
                        <FunctionSection
                            title="Fantasy Lineup"
                            showRegionButton={false}
                            showLeagueButton={false}
                        />
                    </div>
                    <Lineup
                        key={
                            ongoingTournament != null
                                ? ongoingTournament.tournamentId
                                : 0
                        }
                        athleteSkins={athleteSkins}
                        tournament={ongoingTournament}
                        tournamentLineup={tournamentLineup}
                        setTournamentLineup={setTournamentLineup}
                        loadLuckyPick={loadLuckyPick}
                        setLoadLuckyPick={setLoadLuckyPick}
                    />
                    <div className="absolute bottom-[3vw] flex h-[7.2vh] w-[56vw] items-end">
                        <button
                            className="relative w-full items-center justify-center"
                            onClick={
                                loading
                                    ? () => {}
                                    : () => setShowConfirmModal(true)
                            }
                            disabled={
                                isTournamentClosed(ongoingTournament) ||
                                isTournamentUpcoming(ongoingTournament)
                            }
                        >
                            {isTournamentClosed(ongoingTournament) ||
                            isTournamentUpcoming(ongoingTournament) ? (
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <img
                                        className="mt-[0.1vw] h-[4vw]"
                                        src={LockedIcon}
                                    ></img>
                                </div>
                            ) : ongoingTournament.type === "basic" ? (
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                        JOIN FOR&nbsp;
                                    </p>
                                    <img
                                        className="mt-[0.1vw] h-[2.5vw]"
                                        src={BattlePointsIcon}
                                    ></img>
                                    <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                        &nbsp;{ongoingTournament.joinCost}
                                    </p>
                                </div>
                            ) : (
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                        JOIN FOR&nbsp;
                                    </p>
                                    <img
                                        className="mt-[0.1vw] h-[2.5vw]"
                                        src={TGStarIcon}
                                    ></img>
                                    <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                        &nbsp;{ongoingTournament.joinCost}
                                    </p>
                                </div>
                            )}
                            <img className="w-full" src={LineupButton} />
                        </button>
                    </div>
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
