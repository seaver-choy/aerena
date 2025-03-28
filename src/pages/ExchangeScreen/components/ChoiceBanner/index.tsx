import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { initInvoice } from "@telegram-apps/sdk-react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { sortList } from "../../../../helpers/athletes";
import {
    getChoicePackImage,
    getStickerImage,
} from "../../../../helpers/images";
import { PackInfo, Skin } from "../../../../helpers/interfaces";
import {
    getAthleteChoices,
    getInvoiceLinkForExchangePacks,
    getPackInfos,
    payBPForExchangePacks,
    saveSkin,
    saveStarsTransaction,
} from "../../../../helpers/lambda.helper";
import { PurchaseModal } from "../../modals/PurchaseModal";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { LoadingModal } from "../../modals/LoadingModal";
import { AnimationModal } from "../../modals/AnimationModal";
import { SuccessModal } from "../../modals/SuccessModal";
import { ErrorModal } from "../../modals/ErrorModal";

import ChoicePackSonner from "../../../../assets/sonner/pack-choice.svg";
import ChoicePackBackground from "../../../../assets/background/pack-choice.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import BlackButton from "../../../../assets/button/black.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import { Loading } from "../../../../components/Loading";

export const ChoiceBanner = () => {
    const user = useUsers();
    const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showAnimationModal, setShowAnimationModal] =
        useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showInsufficientModal, setShowInsufficientModal] =
        useState<boolean>(false);
    const [showChoiceBanners, setShowChoiceBanners] = useState<boolean>(false);
    const [packInfos, setPackInfos] = useState<PackInfo[]>(null);
    const [selectedPackInfo, setSelectedPackInfo] = useState<PackInfo>(null);
    const [costType, setCostType] = useState<string>(null);
    const [boosterQuantity, setBoosterQuantity] = useState<number>(null);
    const [loading, isLoading] = useState<boolean>(false);
    const [athleteChoices, setAthleteChoices] = useState<Skin[][]>(null);
    const [choicesIndex, setChoicesIndex] = useState<number>(-1);
    const [athleteChoice, setAthleteChoice] = useState<Skin>(null);
    const invoice = initInvoice();

    const getPackInfosData = async () => {
        const result = await getPackInfos(user.initDataRaw);
        setPackInfos(
            sortList(
                result.filter((packInfo) => packInfo.packType === "choice"),
                user.country
            )
        );
    };

    const fetchAthleteChoices = async () => {
        try {
            if (costType === "star") {
                const invoiceLink = await getInvoiceLinkForExchangePacks(
                    user.id,
                    selectedPackInfo,
                    boosterQuantity,
                    user.initDataRaw
                );
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
                                    const result = await getAthleteChoices(
                                        selectedPackInfo.league,
                                        boosterQuantity,
                                        user.initDataRaw
                                    );
                                    setAthleteChoices(result);
                                    setChoicesIndex(0);
                                }
                            }
                            isLoading(false);
                        });
                }
            } else {
                const updateResult = await payBPForExchangePacks(
                    user.id,
                    selectedPackInfo,
                    boosterQuantity,
                    user.initDataRaw
                );
                if (updateResult) {
                    user.dispatch({
                        type: "SET_POINTS",
                        payload: {
                            points: updateResult["points"],
                        },
                    });
                    const result = await getAthleteChoices(
                        selectedPackInfo.league,
                        boosterQuantity,
                        user.initDataRaw
                    );
                    setAthleteChoices(result);
                    setChoicesIndex(0);
                } else {
                    setShowInsufficientModal(true);
                }
                isLoading(false);
            }
        } catch (e) {
            console.log(e);
            setShowErrorModal(true);
            isLoading(false);
        }
    };

    const handleAthleteChoice = async (athleteChoice: Skin) => {
        const newSkin = {
            ...athleteChoice,
            costType: costType,
            packId: selectedPackInfo.packId,
        };
        const result = await saveSkin(user.id, newSkin, user.initDataRaw);
        if (result) {
            user.dispatch({
                type: "SET_SKINS",
                payload: {
                    skins: result["skins"],
                },
            });
            setAthleteChoice(newSkin);
            setShowAnimationModal(false);
            setShowSuccessModal(true);
        } else {
            //error
        }
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        goNext();
    };

    const displayPurchaseModal = () => {
        setShowPurchaseModal(true);
    };

    const reset = () => {
        setSelectedPackInfo(null);
        setCostType(null);
    };

    const goNext = () => {
        const nextChoicesIndex = choicesIndex + 1;
        if (nextChoicesIndex < athleteChoices.length) {
            setChoicesIndex(nextChoicesIndex);
            setShowAnimationModal(true);
        } else {
            reset();
            setAthleteChoices(null);
            setAthleteChoice(null);
            setChoicesIndex(-1);
        }
    };

    useEffect(() => {
        if (choicesIndex != -1) setShowAnimationModal(true);
    }, [choicesIndex]);

    useEffect(() => {
        getPackInfosData();
    }, []);

    useEffect(() => {
        const searchTimer = setTimeout(() => setShowChoiceBanners(true), 500);
        return () => clearTimeout(searchTimer);
    }, [packInfos]);

    return (
        <div className="mt-[6vw]">
            {packInfos != null ? (
                packInfos?.map((packInfo) =>
                    showChoiceBanners ? (
                        <div
                            key={packInfo.packId}
                            className="relative h-[74.8vw]"
                        >
                            <img
                                className="h-full w-full"
                                src={ChoicePackBackground}
                            />
                            <motion.div
                                className="absolute -left-[6vw] top-[7vw] h-[64vw] -rotate-[5deg]"
                                initial={{ opacity: 1, scale: 0.8, rotate: 0 }}
                                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                                transition={{
                                    scale: {
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    },
                                }}
                            >
                                <img
                                    className="h-full will-change-transform backface-hidden"
                                    src={getChoicePackImage(packInfo.league)}
                                />
                            </motion.div>
                            <motion.div
                                className="absolute right-[3vw] top-[2vw] h-[15vw] w-[15vw]"
                                {...appearAnimation}
                            >
                                <img
                                    className="h-full w-full will-change-transform backface-hidden"
                                    src={getStickerImage(packInfo.league)}
                                />
                            </motion.div>
                            <div className="absolute right-[4vw] top-[10vw] flex w-[50vw] flex-col">
                                {/* <motion.div
                                    className="h-[5vw] w-full"
                                    {...slideRightTextAnimation}
                                >
                                    <img
                                        className="h-full"
                                        src={AerenaTextLogo}
                                    />
                                </motion.div> */}
                                <div className="mt-[1vw] flex w-full">
                                    <motion.p
                                        className="text-nowrap font-russoone text-[4vw] font-normal text-golddark"
                                        {...slideRightTextAnimation}
                                    >
                                        PH S15
                                    </motion.p>
                                </div>
                                <div className="-mt-[1vw] flex w-full">
                                    <motion.p
                                        className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent"
                                        {...slideRightTextAnimation}
                                    >
                                        Choice Pack
                                    </motion.p>
                                </div>
                                <div className="flex w-full">
                                    <motion.p
                                        className="font-montserrat text-[3.5vw] text-graydark"
                                        {...slideRightTextAnimation}
                                    >
                                        Choose a skin with the Choice Pack. One
                                        pick, two possibilities.
                                    </motion.p>
                                </div>
                            </div>
                            <div className="absolute bottom-[6vw] right-[10vw] flex flex-col gap-[2vw]">
                                <motion.button
                                    className="relative h-[10vw] w-[42vw]"
                                    onClick={() => {
                                        setSelectedPackInfo(packInfo);
                                        setCostType("star");
                                        displayPurchaseModal();
                                    }}
                                    {...appearTextAnimation}
                                >
                                    <div className="absolute -mt-[0.4vw] flex h-full w-full items-center justify-center gap-[1vw]">
                                        <img
                                            className="h-[3.5vw]"
                                            src={TGStarIcon}
                                        ></img>
                                        <p className="mt-[0.6vw] font-russoone text-[4.2vw] text-white">
                                            {packInfo.starCost.toLocaleString()}
                                        </p>
                                    </div>
                                    <img
                                        className="h-full w-full"
                                        src={GoldButton}
                                    />
                                </motion.button>
                                <motion.button
                                    className="relative h-[10vw] w-[42vw]"
                                    onClick={() => {
                                        setSelectedPackInfo(packInfo);
                                        setCostType("bp");
                                        displayPurchaseModal();
                                    }}
                                    {...appearTextAnimation}
                                >
                                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                        <img
                                            className="h-[3.5vw]"
                                            src={BattlePointsIcon}
                                        ></img>
                                        <p className="font-russoone text-[3.5vw] text-white">
                                            {packInfo.bpCost.toLocaleString()}
                                        </p>
                                    </div>
                                    <img
                                        className="h-full w-full"
                                        src={BlackButton}
                                    />
                                </motion.button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[74.8vw]">
                            <motion.div
                                className="relative"
                                {...pulseAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={ChoicePackSonner}
                                />
                            </motion.div>
                        </div>
                    )
                )
            ) : (
                <div className="mt-[30vh] flex items-center justify-center">
                    <Loading />
                </div>
            )}

            {showErrorModal && (
                <ErrorModal
                    title={"Oops!"}
                    message={
                        "Something went wrong on our end. Please try again later."
                    }
                    onClose={() => setShowErrorModal(false)}
                />
            )}
            {showInsufficientModal && (
                <ErrorModal
                    title={"Insufficient Battle Points"}
                    message={
                        "You do not have enough Battle Points to make this purchase."
                    }
                    onClose={() => setShowInsufficientModal(false)}
                />
            )}
            {showPurchaseModal && (
                <PurchaseModal
                    packInfo={selectedPackInfo}
                    costType={costType}
                    onCancel={() => {
                        setShowPurchaseModal(false);
                        reset();
                    }}
                    onConfirm={(boosterQuantity) => {
                        setShowPurchaseModal(false);
                        setShowConfirmModal(true);
                        setBoosterQuantity(boosterQuantity);
                    }}
                />
            )}
            {showConfirmModal && (
                <ConfirmModal
                    packInfo={selectedPackInfo}
                    costType={costType}
                    boosterQuantity={boosterQuantity}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        reset();
                    }}
                    onConfirm={() => {
                        setShowConfirmModal(false);
                        isLoading(true);
                        fetchAthleteChoices();
                    }}
                />
            )}
            {showAnimationModal && (
                <AnimationModal
                    athleteChoices={athleteChoices[choicesIndex]}
                    handleAthleteChoice={handleAthleteChoice}
                    league={
                        selectedPackInfo != null ? selectedPackInfo.league : ""
                    }
                />
            )}
            {showSuccessModal && (
                <SuccessModal
                    athleteChoice={athleteChoice}
                    onClose={closeSuccessModal}
                />
            )}
            {loading && <LoadingModal />}
        </div>
    );
};
