import { useEffect, useState } from "react";
import { InfoModal } from "../../../../components/InfoModal";

import LoadingStarter from "../../../../assets/loading-starter.svg";
import BackgroundStarterM6 from "../../../../assets/background-starter-m6.svg";
import ButtonInfo from "../../../../assets/button-info.svg";
import ButtonBlack from "../../../../assets/button-black.svg";

export const StarterBanner = () => {
  const [showAfterTimer, setShowAfterTimer] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

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

  return (
    <div
      className={`${
        !showAfterTimer ? "bg-loading" : "bg-graydark"
      } mt-[4vw] h-[60.5vw]`}
    >
      <div
        className={`${
          !showAfterTimer ? "" : "hidden"
        } relative flex animate-pulse`}
      >
        <img className="h-full w-full" src={LoadingStarter} />
      </div>
      <div className={`${showAfterTimer ? "" : "hidden"} relative flex`}>
        <img className="h-full w-full" src={BackgroundStarterM6} />
        <div className="absolute ml-[10vw] flex h-full w-[31.2vw] items-end">
          <button className="relative mb-[13.8vw] flex h-[8vw] w-full justify-center">
            <img className="h-full" src={ButtonBlack} />
            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
              <p className="mt-[0.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                Claim
              </p>
            </div>
          </button>
        </div>
        <button className="absolute right-[4vw] top-[4vw] h-[5vw] w-[5vw]">
          <img
            className="h-full w-full"
            src={ButtonInfo}
            onClick={displayInfoModal}
          />
        </button>
        {showInfoModal && (
          <InfoModal identifier={"Starter"} cancel={closeInfoModal} />
        )}
      </div>
    </div>
  );
};
