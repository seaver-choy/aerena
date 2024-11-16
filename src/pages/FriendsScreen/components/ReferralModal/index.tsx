import { useEffect } from "react";

import ModalSmall from "../../../../assets/modal-small.svg";
import ButtonGold from "../../../../assets/button-gold.svg";

interface ReferralModalProps {
  onClose: () => void;
}

export const ReferralModal = ({ onClose }: ReferralModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-graydark opacity-95" />
        <div className="absolute z-40 h-[82.5vw] w-[80vw] animate-modal">
          <img className="h-full w-full" src={ModalSmall} />
        </div>
        <div className="absolute z-50 flex h-[66.5vw] w-[66vw] animate-modal flex-col justify-center">
          <div className="mb-[4vw] flex h-[55vw] items-center justify-center pl-[4vw] pr-[4vw]">
            <p className="text-center font-montserrat text-[3.5vw] text-graydark">
              Referral link copied!
            </p>
          </div>
          <div className="flex h-[7.5vw] justify-center gap-[4vw]">
            <div className="flex h-full w-full">
              <button
                className="relative flex h-full w-full justify-center"
                onClick={onClose}
              >
                <img className="h-full" src={ButtonGold} />
                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                  <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                    Close
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
