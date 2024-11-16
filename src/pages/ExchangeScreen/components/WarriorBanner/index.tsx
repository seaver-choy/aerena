import { useEffect, useState } from "react";
import { InfoModal } from "../../../../components/InfoModal";

import BackgroundWarriorM6 from "../../../../assets/background-warrior-m6.svg";
import ButtonGold from "../../../../assets/button-gold.svg";
import ButtonInfo from "../../../../assets/button-info.svg";
import LoadingBooster from "../../../../assets/loading-booster.svg";

export const WarriorBanner = () => {
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
        <img className="h-full w-full" src={BackgroundWarriorM6} />
        <div className="absolute ml-[40vw] flex h-full w-[55.6vw] items-end justify-center gap-[1vw]">
          <button className="relative mb-[8.5vw] flex h-[7vw] justify-center">
            <img className="h-full" src={ButtonGold} />
            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
              <p className="mt-[0.2vw] font-russoone text-[2.6vw] font-normal text-white">
                0.5 TON
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
          <InfoModal identifier={"Warrior"} cancel={closeInfoModal} />
        )}
      </div>
    </div>
  );
};
