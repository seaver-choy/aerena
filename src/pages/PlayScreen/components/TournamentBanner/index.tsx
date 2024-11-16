import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingTournament from "../../../../assets/loading-tournament.svg";
import BackgroundTournament from "../../../../assets/background-tournament.svg";
import ButtonGold from "../../../../assets/button-gold.svg";

export const TournamentBanner = () => {
  const [showAfterTimer, setShowAfterTimer] = useState<boolean>(false);

  const showBanner = () => {
    setTimeout(() => {
      setShowAfterTimer(true);
    }, 1000);
  };

  useEffect(() => {
    showBanner();
  }, []);

  return (
    <div
      className={`${
        !showAfterTimer ? "bg-loading" : "bg-graydark"
      } mt-[4vw] h-[52vw]`}
    >
      <div
        className={`${
          !showAfterTimer ? "" : "hidden"
        } relative flex animate-pulse`}
      >
        <img className="h-full w-full" src={LoadingTournament} />
      </div>
      <div
        className={`${
          showAfterTimer ? "" : "hidden"
        } relative flex justify-center`}
      >
        <img className="h-full w-full" src={BackgroundTournament} />
        <div className="absolute animate-appear flex top-[4vw]">
          <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
            M6 Round One
          </p>
        </div>
        <div className="absolute animate-appear flex top-[21vw]">
          <p className="text-nowrap font-russoone text-[9vw] font-normal text-white">
            20 TON
          </p>
        </div>
        <div className="absolute flex w-[70%] bottom-[5vw] h-[10vw]">
          <div className="w-[50%] items-start justify-center flex flex-col h-full">
            <p className="font-montserrat text-[3vw] text-white">
              09 <span className="font-montagu">/</span> 20{" "}
              <span className="font-montagu">/</span> 2024 | 5:00PM
            </p>
            <p className="font-montserrat text-[2vw] text-white">
              Closes in 120 : 25 : 08 : 56
            </p>
          </div>
          <div className="w-[50%] flex justify-end items-center h-full">
            <Link to="/tournament">
              <button className="relative animate-appear flex h-[7vw] justify-center">
                <img className="h-full" src={ButtonGold} />
                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                  <p className="mt-[0.2vw] font-russoone text-[2.6vw] font-normal text-white">
                    View Details
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
