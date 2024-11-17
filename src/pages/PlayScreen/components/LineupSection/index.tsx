import { useState } from 'react';
import { Lineup } from "../Lineup";
import { LineupTitle } from "../LineupTitle";
import { SuccessModal } from "../SuccessModal";

import BackgroundLineup from "../../../../assets/background-lineup.svg";
import ButtonLineup from "../../../../assets/button-lineup.svg";

export const LineupSection = () => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  
  const onCloseModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="mt-[4vw] h-[120vw]">
      <div className="relative flex justify-center">
        <img className="h-full w-full" src={BackgroundLineup} />
        <LineupTitle />
        <Lineup />
        { showSuccessModal && (
          <SuccessModal onClose={onCloseModal}/>
        )}
        <div className="absolute bottom-[3.2vw] flex h-[7.2vh] w-[56vw] items-end">
          <button className="relative w-full items-center justify-center" onClick={
            () => 
            {
              console.log("clicked")
              setShowSuccessModal(true)
            }}>
            <div className="absolute flex h-full w-full items-center justify-center">
              <p className="pt-[0.8vw] font-russoone text-[3vw] text-white">
                Enter Tournament
              </p>
            </div>
            <img className="w-full" src={ButtonLineup}></img>
          </button>
        </div>
      </div>
    </div>
  );
};
