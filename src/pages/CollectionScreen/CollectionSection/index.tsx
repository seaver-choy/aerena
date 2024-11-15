import { useState } from "react";
import { CollectionTitle } from "../../CollectionTitle";
import {
  getAthletePositionLogo,
  getAthletePositionBackground,
} from "../../../helpers/athletes";

import ButtonLeft from "../../../assets/button-left.svg";
import ButtonRight from "../../../assets/button-right.svg";

export const CollectionSection = () => {
  const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
  const [maxLength] = useState<number>(positionList.length - 1);
  const [positionIndex, setPositionIndex] = useState<number>(0);

  const handlePreviousCategory = () => {
    if (positionIndex > 0) {
      setPositionIndex(positionIndex - 1);
    }
  };

  const handleNextCategory = () => {
    if (positionIndex < maxLength) {
      setPositionIndex(positionIndex + 1);
    }
  };

  return (
    <div className="mt-[10vw] h-[193vw]">
      <div className="relative flex">
        <img
          className="h-full w-full"
          src={getAthletePositionBackground(positionList[positionIndex])}
        />
        <CollectionTitle />
        <div className="absolute mt-[29vw] flex h-[13vw] w-full justify-center pl-[4vw] pr-[4vw]">
          <button
            onClick={handlePreviousCategory}
            className="flex w-[8%] items-center justify-end"
          >
            <img className={`h-[6vw] ${"opacity-100"}`} src={ButtonLeft} />
          </button>
          <div className="flex w-[84%] items-center justify-center">
            <img
              className="h-[10vw]"
              src={getAthletePositionLogo(positionList[positionIndex])}
            />
          </div>
          <button
            onClick={handleNextCategory}
            className="flex w-[8%] items-center justify-end"
          >
            <img className={`h-[6vw] ${"opacity-100"}`} src={ButtonRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
