import { useEffect, useState } from "react";
import { InfoModal } from "../../../../components/InfoModal";
import { AnimationModal } from "../../modals/AnimationModal";

import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import BackgroundMythicM6 from "../../../../assets/background-mythic-m6.svg";
import ButtonGold from "../../../../assets/button-gold.svg";
import ButtonInfo from "../../../../assets/button-info.svg";
import LoadingBooster from "../../../../assets/loading-booster.svg";
import { mint } from "../../../../helpers/lambda.helpers";

export const MythicBanner = () => {
  const [showAfterTimer, setShowAfterTimer] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [tonConnectUI] = useTonConnectUI();
  const [showAnimationModal, setShowAnimationModal] = useState<boolean>(false);
  const [mintedAthletes, setMintedAthletes] = useState([])

  const showBanner = () => {
    setTimeout(() => {
      setShowAfterTimer(true);
    }, 1000);
  };

  useEffect(() => {
    showBanner();
  }, []);

  const displayInfoModal = () => {
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: "0QDca4AyrK6pL6q1zHHbnnjXVC-Lfxv1yIkD36dpSPetRtvb", // message destination in user-friendly format
        amount: "1000000000", // Toncoin in nanotons
      },
    ],
  };

  // const displayAnimationModal = () => {
  //   setShowAnimationModal(true);
  // };

  const closeAnimationModal = () => {
    setShowAnimationModal(false);
  };

  return (
    <div
      className={`${
        !showAfterTimer ? "bg-loading" : "bg-graydark"
      } mt-[4vw] h-[41.7vw]`}
    >
      <div
        className={`${
          !showAfterTimer ? "" : "hidden"
        } relative flex animate-pulse`}
      >
        <img className="h-full w-full" src={LoadingBooster} />
      </div>
      <div className={`${showAfterTimer ? "" : "hidden"} relative flex`}>
        <img className="h-full w-full" src={BackgroundMythicM6} />
        <div className="absolute ml-[40vw] flex h-full w-[55.6vw] items-end justify-center gap-[1vw]">
          <button
            className="relative mb-[8.5vw] flex h-[7vw] justify-center"
            onClick={async () => {
              tonConnectUI.sendTransaction(transaction);
              const response = await mint(tonConnectUI.account?.address!);
              setMintedAthletes(response.mintedAthletes);
              setTimeout(() => {
                setShowAnimationModal(true);
              }, 1000);
            }}
          >
            <img className="h-full" src={ButtonGold} />
            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
              <p className="mt-[0.2vw] font-russoone text-[2.6vw] font-normal text-white">
                1 TON
              </p>
            </div>
          </button>
          {showAnimationModal && <AnimationModal onEnd={closeAnimationModal} athletes={mintedAthletes}/>}
        </div>
        <button className="absolute right-[4vw] top-[4vw] h-[5vw] w-[5vw]">
          <img
            className="h-full w-full"
            src={ButtonInfo}
            onClick={displayInfoModal}
          />
        </button>
        {showInfoModal && (
          <InfoModal identifier={"Mythic"} cancel={closeInfoModal} />
        )}
      </div>
    </div>
  );
};
