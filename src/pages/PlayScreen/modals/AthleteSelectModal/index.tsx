import { getAthletePositionLogo } from "../../../../helpers/athletes";

import ModalLarge from "../../../../assets/modal-large.svg";
import IconClose from "../../../../assets/icon-close.svg";
import ButtonGold from "../../../../assets/button-gold.svg";

import SampleAthlete from "../../../../assets/sample-athlete.svg";

interface AthleteSelectModalProps {
  position: string;
  cancel: () => void;
}

export const AthleteSelectModal = ({
  position,
  cancel,
}: AthleteSelectModalProps) => {
  return (
    <div className="fixed inset-0 z-40">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-graydark opacity-95" />
        <div className="absolute z-40 h-[115vw] w-[80vw] animate-modal">
          <img className="h-full w-full" src={ModalLarge} />
        </div>
        <div className="absolute z-50 flex h-[99vw] w-[66vw] animate-modal flex-col justify-center">
          <div className="flex h-[11vw] flex-col items-center gap-[2vw]">
            <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
              Select Player
            </p>
            <button
              className="absolute right-0 h-[5vw] w-[5vw]"
              onClick={cancel}
            >
              <img className="h-full w-full" src={IconClose} />
            </button>
          </div>
          <div className="mb-[4vw] flex h-[6.5vw] flex-row gap-[2vw]">
            <div className="flex w-[100%] items-center justify-center">
              <img className="h-full" src={getAthletePositionLogo(position)} />
            </div>
          </div>
          <div className="mb-[4vw] flex h-[66vw] flex-row flex-wrap content-start gap-[0.75vw] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
            <div className="flex h-[27.95w] w-[21.5vw]">
              <img src={SampleAthlete} className="h-[100%]" />
            </div>
          </div>
          <div className="flex h-[7.5vw] justify-center">
            <div className="flex h-full w-full justify-end">
              <button className="relative flex h-full w-full justify-center">
                <img className="h-full" src={ButtonGold} />
                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                  <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                    Select
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
