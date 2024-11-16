/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAthletePositionBackground,
  getAthletePositionLogo,
} from "../../../../helpers/athletes";
import { AthleteModal } from "../../modals/AthleteModal";

import ButtonFunction from "../../../../assets/button-function.svg";
import ButtonLeft from "../../../../assets/button-left.svg";
import ButtonRight from "../../../../assets/button-right.svg";
import LineBasic from "../../../../assets/line-basic.svg";
import LoadingAthlete from "../../../../assets/loading-athlete.svg";

export const Collection = ({ athletes }: {athletes: any[]}) => {
  const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
  const [maxLength] = useState<number>(positionList.length - 1);
  const [positionIndex, setPositionIndex] = useState<number>(0);
  const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);

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
  const displayAthleteModal = () => {
    setShowAthleteModal(true);
  };

  const closeAthleteModal = () => {
    setShowAthleteModal(false);
  };

  return (
    <>
      {showAthleteModal && <AthleteModal cancel={closeAthleteModal} />}
      <div className="mt-[10vw] h-[193vw]">
        <div className="relative flex">
          <img
            className="h-full w-full"
            src={getAthletePositionBackground(positionList[positionIndex])}
          />
          <div className="absolute flex h-[25vw] w-full pl-[4vw] pr-[4vw] pt-[11vw]">
            <div className="flex h-full w-[50%] items-center pl-[4vw]">
              <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                Personal Collection
              </p>
            </div>
            <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
              <Link
                to={"/exchange"}
                className="relative flex h-[7vw] items-center justify-center"
              >
                <div className="absolute flex">
                  <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
                    Purchase
                  </p>
                </div>
                <img className="h-[100%]" src={ButtonFunction}></img>
              </Link>
            </div>
            <img
              className="absolute bottom-0 left-0 w-full"
              src={LineBasic}
            ></img>
          </div>
          <div className="absolute mt-[29vw] flex h-[13vw] w-full justify-center pl-[4vw] pr-[4vw]">
            <button
              onClick={handlePreviousCategory}
              className="flex w-[8%] items-center justify-end"
            >
              <img
                className={`h-[6vw] ${
                  positionIndex === 0
                    ? "cursor-default opacity-50"
                    : "opacity-100"
                }`}
                src={ButtonLeft}
              />
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
              <img
                className={`h-[6vw] ${
                  positionIndex === positionList.length - 1
                    ? "cursor-default opacity-50"
                    : "opacity-100"
                }`}
                src={ButtonRight}
              />
            </button>
          </div>
          <div className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]">
            <div className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
              { athletes?.length > 0 
                ? (
                  athletes.map((athlete, index) => {
                    return (
                      <>
                        <button
                          key={index}
                          className={`relative flex h-[37vw] w-[28vw] animate-appear`}
                          onClick={() => {
                            displayAthleteModal();
                          }}
                        >
                          <img className="h-full w-full" src={athlete.img} />
                        </button>
                      </>
                    )
                  })
                ) : (
                  Array.from({length:9}, (_, index) => (
                    <div
                      key={index}
                      className={`relative flex h-[37vw] w-[28vw] animate-pulse`}
                    >
                    <img className="h-full w-full" src={LoadingAthlete} />
                  </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
