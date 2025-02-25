import { useState } from "react";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { AnimationModal } from "../../modals/AnimationModal";
import { SuccessModal } from "../../modals/SuccessModal";

export const BasicBanner = () => {
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showAnimationModal, setShowAnimationModal] =
        useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

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

    const displaySuccessModal = () => {
        setShowSuccessModal(true);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="mt-[4vw] flex h-[50vw] flex-col items-center justify-center gap-[2vw] bg-graydark">
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayConfirmModal}
            >
                <p className="text-white">Confirm</p>
            </button>
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displayAnimationModal}
            >
                <p className="text-white">Animation</p>
            </button>
            <button
                className="h-[10vw] w-[30vw] bg-graylight"
                onClick={displaySuccessModal}
            >
                <p className="text-white">Success</p>
            </button>
            {showConfirmModal && (
                <ConfirmModal
                    onCancel={closeConfirmModal}
                    onConfirm={closeConfirmModal}
                />
            )}
            {showAnimationModal && (
                <AnimationModal onEnd={closeAnimationModal} />
            )}
            {showSuccessModal && <SuccessModal onClose={closeSuccessModal} />}
        </div>
    );
};
