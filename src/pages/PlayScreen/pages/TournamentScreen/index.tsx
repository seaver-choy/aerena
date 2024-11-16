import { useState, useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { Header } from "../../../../components/Header";

import LoadingTournament from "../../../../assets/loading-tournament.svg";
import BackgroundTournament from "../../../../assets/background-tournament.svg";
import BackgroundCategories from "../../../../assets/background-categories.svg";
import CategoryRoam from "../../../../assets/category-roam.svg";
import CategoryMid from "../../../../assets/category-mid.svg";
import CategoryJungle from "../../../../assets/category-jungle.svg";
import CategoryGold from "../../../../assets/category-gold.svg";
import CategoryEXP from "../../../../assets/category-exp.svg";

export const TournamentScreen = () => {
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
    <Layout>
      <Header />
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
              PHP 20,000
            </p>
          </div>
          <div className="absolute flex w-[70%] bottom-[5vw] h-[10vw]">
            <div className="w-[100%] items-center justify-center flex flex-col h-full">
              <p className="font-montserrat text-[3vw] text-white">
                09 <span className="font-montagu">/</span> 20{" "}
                <span className="font-montagu">/</span> 2024 | 5:00PM
              </p>
              <p className="font-montserrat text-[2vw] text-white">
                Closes in 120 : 25 : 08 : 56
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[4vw] h-[146.8vw] bg-darkgray">
        <div className="relative flex justify-center">
          <img className="h-full w-full" src={BackgroundCategories} />
          <div className="absolute top-[40vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
            <div className="relative animate-appear gap-[1vw] items-center flex-col flex">
              <div className="h-[37vw] w-[28vw]">
                <img className="h-[100%]" src={CategoryRoam} />
              </div>
              <div className="w-[28vw]">
                <p className="bg-gradient-to-b text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                  HIGHEST NUMBER OF ASSISTS
                </p>
              </div>
            </div>
            <div className="relative animate-appear gap-[1vw] items-center flex-col flex">
              <div className="h-[37vw] w-[28vw]">
                <img className="h-[100%]" src={CategoryMid} />
              </div>
              <div className="w-[28vw]">
                <p className="bg-gradient-to-b text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                  HIGHEST NUMBER OF ASSISTS
                </p>
              </div>
            </div>
            <div className="relative animate-appear gap-[1vw] items-center flex-col flex">
              <div className="h-[37vw] w-[28vw]">
                <img className="h-[100%]" src={CategoryJungle} />
              </div>
              <div className="w-[28vw]">
                <p className="bg-gradient-to-b text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                  HIGHEST NUMBER OF ASSISTS
                </p>
              </div>
            </div>
            <div className="relative animate-appear gap-[1vw] items-center flex-col flex">
              <div className="h-[37vw] w-[28vw]">
                <img className="h-[100%]" src={CategoryGold} />
              </div>
              <div className="w-[28vw]">
                <p className="bg-gradient-to-b text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                  HIGHEST NUMBER OF ASSISTS
                </p>
              </div>
            </div>
            <div className="relative animate-appear gap-[1vw] items-center flex-col flex">
              <div className="h-[37vw] w-[28vw]">
                <img className="h-[100%]" src={CategoryEXP} />
              </div>
              <div className="w-[28vw]">
                <p className="bg-gradient-to-b text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3vw] font-normal text-transparent">
                  HIGHEST NUMBER OF ASSISTS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
