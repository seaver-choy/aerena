import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import {
    addNewReferral,
    checkReferralCode,
} from "../../../../helpers/lambda.helper";
import { ReferralModal } from "../../modals/ReferralModal";
import { AddModal } from "../../modals/AddModal";
import { ErrorModal } from "../../../../pages/PlayScreen/modals/ErrorModal";
import { SuccessModal } from "../../../../pages/PlayScreen/modals/SuccessModal";
import { LoadingModal } from "../../../../pages/PlayScreen/modals/LoadingModal";

import ProfileHeaderBackground from "../../../../assets/background/profile-header.svg";
import DiamondIcon from "../../../../assets/icon/diamond.svg";
import CopyIcon from "../../../../assets/icon/copy.svg";
import AddFriendIcon from "../../../../assets/icon/add-friend.svg";
import QuestsIcon from "../../../../assets/icon/quests.svg";

export const ProfileHeader = () => {
    const user = useUsers();
    const navigate = useNavigate();
    const [showReferralModal, setShowReferralModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showAlreadyReferredModal, setShowAlreadyReferredModal] =
        useState<boolean>(false);
    const [showOwnCodeModal, setShowOwnCodeModal] = useState<boolean>(false);
    const [loading, isLoading] = useState<boolean>(false);

    const handleCheckReferralCode = async (searchReferral) => {
        isLoading(true);
        if (
            user.referredBy == undefined ||
            user.referredBy.userID == undefined
        ) {
            if (searchReferral === "") setShowErrorModal(true);
            else if (searchReferral === user.referralCode)
                setShowOwnCodeModal(true);
            else {
                const checkData = await checkReferralCode(
                    searchReferral,
                    user.initDataRaw
                );
                if (checkData["message"] == "DNE") setShowErrorModal(true);
                else if (checkData["message"] == "EXISTS") {
                    const data = await addNewReferral(
                        user.id,
                        searchReferral,
                        user.initDataRaw
                    );
                    user.dispatch({
                        type: "SET_FRIENDS",
                        payload: { friends: data["friends"] },
                    });
                    user.dispatch({
                        type: "SET_REFERRED_BY",
                        payload: {
                            referredBy: data["referredBy"],
                        },
                    });
                    setShowSuccessModal(true);
                }
            }
        } else setShowAlreadyReferredModal(true);
        isLoading(false);
    };

    const handleReferralCodeCopy = () => {
        navigator.clipboard.writeText(user.referralCode);
        displayReferralModal();
    };

    const handleQuests = () => {
        navigate(`/quests`);
    };

    const displayReferralModal = () => {
        setShowReferralModal(true);
    };

    const closeReferralModal = () => {
        setShowReferralModal(false);
    };

    const displayAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    return (
        <div className="mt-[4vw] h-[39.9vw]">
            <div className="relative h-full w-full">
                {showSuccessModal && (
                    <SuccessModal
                        title="Success!"
                        message="You have successfully used the referral code!"
                        onClose={() => setShowSuccessModal(false)}
                    />
                )}
                {showErrorModal && (
                    <ErrorModal
                        title="Error!"
                        message="Referral code does not exist. Please try again."
                        onClose={() => setShowErrorModal(false)}
                    />
                )}
                {showAlreadyReferredModal && (
                    <ErrorModal
                        title="Error!"
                        message="You have already used a referral code!"
                        onClose={() => setShowAlreadyReferredModal(false)}
                    />
                )}
                {showOwnCodeModal && (
                    <ErrorModal
                        title="Error!"
                        message="You cannot use your own referral code!"
                        onClose={() => setShowOwnCodeModal(false)}
                    />
                )}
                {loading && <LoadingModal />}
                <img className="h-full w-full" src={ProfileHeaderBackground} />
                <div className="absolute left-[8vw] top-[6vw] flex h-[24vw] w-[84vw]">
                    <div className="flex h-full w-[75%] flex-col items-start justify-center">
                        <motion.div
                            className="-mt-[1vw]"
                            {...slideRightTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[7vw] text-transparent">
                                {user.username}
                            </p>
                        </motion.div>
                        <motion.div
                            className="-mt-[1vw] flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-russoone text-[3.5vw] text-white">
                                {user.friends.length} Friends
                            </p>
                            <img
                                className="mt-[1vw] h-[3vw]"
                                src={DiamondIcon}
                            />
                            <p className="font-russoone text-[3.5vw] text-white">
                                {
                                    user.friends.filter(
                                        (user) => user.isReferred === true
                                    ).length
                                }{" "}
                                Referrals
                            </p>
                        </motion.div>
                        <div className="flex items-center gap-[2vw]">
                            <motion.div
                                className="mt-[2vw] flex items-center justify-center bg-gold px-[2vw] py-[0.5vw]"
                                style={{ width: "fit-content" }}
                                {...slideRightTextAnimation}
                            >
                                <p className="font-montserrat text-[3vw] font-semibold text-white">
                                    Referral Code: {user.referralCode}
                                </p>
                            </motion.div>
                            <motion.button
                                className="mt-[2vw] h-[5vw]"
                                onClick={handleReferralCodeCopy}
                                {...appearAnimation}
                            >
                                <img className="h-full" src={CopyIcon} />
                            </motion.button>
                            {showReferralModal && (
                                <ReferralModal onClose={closeReferralModal} />
                            )}
                        </div>
                    </div>
                    <div className="flex h-full w-[25%] items-end justify-end gap-[2vw]">
                        <motion.button
                            className="h-[7vw]"
                            onClick={displayAddModal}
                            {...appearAnimation}
                        >
                            <img className="h-full" src={AddFriendIcon} />
                        </motion.button>
                        {showAddModal && (
                            <AddModal
                                handleSubmit={handleCheckReferralCode}
                                onClose={closeAddModal}
                            />
                        )}
                        <motion.button
                            className="h-[7vw]"
                            onClick={handleQuests}
                            {...appearAnimation}
                        >
                            <img className="h-full" src={QuestsIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
