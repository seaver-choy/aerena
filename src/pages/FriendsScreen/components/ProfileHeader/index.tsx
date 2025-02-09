import { useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { ReferralModal } from "../../modals/ReferralModal";
import { AddModal } from "../../modals/AddModal";

import ProfileHeaderBackground from "../../../../assets/background/profile-header.svg";
import DiamondIcon from "../../../../assets/icon/diamond.svg";
import CopyIcon from "../../../../assets/icon/copy.svg";
import AddFriendIcon from "../../../../assets/icon/add-friend.svg";
import NotificationsIcon from "../../../../assets/icon/notifications.svg";

export const ProfileHeader = () => {
    const [showReferralModal, setShowReferralModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

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
        <div className="h-[39.9vw]">
            <div className="relative h-full w-full">
                <img className="h-full w-full" src={ProfileHeaderBackground} />
                <div className="absolute left-[8vw] top-[6vw] flex h-[24vw] w-[84vw]">
                    <div className="flex h-full w-[75%] flex-col items-start justify-center">
                        <motion.div
                            className="-mt-[1vw]"
                            {...slideRightTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[7vw] text-transparent">
                                bossanarchy
                            </p>
                        </motion.div>
                        <motion.div
                            className="-mt-[1vw] flex gap-[2vw]"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-russoone text-[3.5vw] text-white">
                                32 Friends
                            </p>
                            <img
                                className="mt-[1vw] h-[3vw]"
                                src={DiamondIcon}
                            />
                            <p className="font-russoone text-[3.5vw] text-white">
                                10 Referrals
                            </p>
                        </motion.div>
                        <div className="flex items-center gap-[2vw]">
                            <motion.div
                                className="mt-[2vw] flex items-center justify-center bg-gold px-[2vw] py-[0.5vw]"
                                style={{ width: "fit-content" }}
                                {...slideRightTextAnimation}
                            >
                                <p className="font-montserrat text-[3vw] font-semibold text-white">
                                    Referral Code: ABCDEFG
                                </p>
                            </motion.div>
                            <motion.button
                                className="mt-[2vw] h-[5vw]"
                                onClick={displayReferralModal}
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
                        {showAddModal && <AddModal onClose={closeAddModal} />}
                        <motion.button className="h-[7vw]" {...appearAnimation}>
                            <img
                                className="h-full opacity-50"
                                src={NotificationsIcon}
                            />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
