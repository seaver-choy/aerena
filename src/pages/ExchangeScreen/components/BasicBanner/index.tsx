import { useState } from "react";
import { PurchaseModal } from "../../modals/PurchaseModal";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { AnimationModal } from "../../modals/AnimationModal";

import { NewModal } from "../../modals/new";

export const BasicBanner = () => {
    const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showAnimationModal, setShowAnimationModal] =
        useState<boolean>(false);

    const [showNewModal, setShowNewModal] = useState<boolean>(false);

    const displayNewModal = () => {
        setShowNewModal(true);
    };
    const closeNewModal = () => {
        setShowNewModal(false);
    };

    const displayPurchaseModal = () => {
        setShowPurchaseModal(true);
    };

    const closePurchaseModal = () => {
        setShowPurchaseModal(false);
    };

    const displayConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const displayAnimationModal = () => {
        setShowAnimationModal(true);
    };

    const closeAnimationModal = () => {
        setShowAnimationModal(false);
    };

    return (
        <div className="mt-[4vw] flex h-[50vw] flex-col items-center justify-center gap-[2vw] bg-graydark">
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayPurchaseModal}
            >
                <p className="text-white">Purchase </p>
            </button>
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayConfirmModal}
            >
                <p className="text-white">Confirm </p>
            </button>
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayAnimationModal}
            >
                <p className="text-white">Animation </p>
            </button>
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayNewModal}
            >
                <p className="text-white">New </p>
            </button>
            {showPurchaseModal && (
                <PurchaseModal
                    onCancel={closePurchaseModal}
                    onConfirm={closePurchaseModal}
                />
            )}
            {showConfirmModal && (
                <ConfirmModal
                    onCancel={closeConfirmModal}
                    onConfirm={closeConfirmModal}
                />
            )}
            {showAnimationModal && (
                <AnimationModal onEnd={closeAnimationModal} />
            )}
            {showNewModal && <NewModal onEnd={closeNewModal} />}
        </div>
    );
};
