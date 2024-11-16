import { useEffect, useState } from "react";

import DustGold from "../../../../assets/dust-gold.svg";
import GlowRadial from "../../../../assets/glow-radial.svg";
import IconBackCard from "../../../../assets/icon-backcard.svg";
import ButtonGold from "../../../../assets/button-gold.svg";
import IconMythicM6 from "../../../../assets/icon-mythic-m6.svg";
import SampleAthlete from "../../../../assets/sample-athlete.svg";

interface AnimationModalProps {
  onEnd: () => void;
}

export const AnimationModal = ({ onEnd }: AnimationModalProps) => {
  const [startOpenPack, setStartOpenPack] = useState(false);
  const [showOpenPack, setShowOpenPack] = useState(true);
  const [showBackCard, setShowBackCard] = useState(false);
  const [hideTapText, setHideTapText] = useState(false);
  const [showCardReceive, setShowCardReceive] = useState(false);
  const [showAthleteCard, setShowAthleteCard] = useState(false);
  //   const [max] = useState<number>(tokens.length);
  const [index, setIndex] = useState<number>(0);

  const startPackAnimation = () => {
    setStartOpenPack(!startOpenPack);
  };

  const handleChangeImage = () => {
    if (index + 1 == 2) {
      onEnd();
    } else {
      setIndex(index + 1);
      setShowBackCard(true);
      setShowAthleteCard(false);
    }
  };

  //   const handleChangeImage = () => {
  //     if (index + 1 == max) {
  //       onEnd();
  //     } else {
  //       setIndex(index + 1);
  //       setShowBackCard(true);
  //       setShowAthleteCard(false);
  //     }
  //   };

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
        {showOpenPack && (
          <div className="absolute z-40 flex h-full w-full justify-center">
            <img
              className={`${
                startOpenPack ? "animate-dust fill-mode-forwards" : "hidden"
              } h-[200vw]`}
              src={DustGold}
            />
          </div>
        )}
        {(showBackCard || showAthleteCard) && (
          <div className="absolute z-40 flex h-full w-full justify-center">
            <img className="h-[200vw] animate-sparkle" src={DustGold} />
          </div>
        )}
        {showOpenPack && (
          <div className="absolute z-40 flex h-full w-full items-center">
            <img
              className={`${
                startOpenPack ? "animate-glow fill-mode-forwards" : "hidden"
              } w-full`}
              src={GlowRadial}
            />
          </div>
        )}
        {(showBackCard || showAthleteCard) && (
          <div className="absolute z-40 flex h-full w-full items-center">
            <img className="w-full animate-static" src={GlowRadial} />
          </div>
        )}
        <div className="absolute z-50 flex h-[115vw] w-[80vw] flex-col justify-center">
          {showOpenPack && (
            <div
              className={`${
                startOpenPack ? "animate-open fill-mode-forwards" : ""
              } mb-[4vw] flex h-[101vw] animate-appear items-center justify-center`}
              onAnimationEnd={() => {
                if (startOpenPack) {
                  setTimeout(() => {
                    setShowOpenPack(false);
                    setStartOpenPack(false);
                    setShowBackCard(true);
                  }, 1000);
                }
              }}
            >
              <img className="h-[80vw]" src={IconMythicM6} />
            </div>
          )}
          {showBackCard && (
            <div
              className={`${showBackCard ? "animate-back" : ""} ${
                showCardReceive ? "animate-flip backface-hidden" : ""
              } mb-[4vw] flex h-[101vw] items-center justify-center`}
              onAnimationEnd={() => {
                if (showCardReceive) {
                  setTimeout(() => {
                    setShowCardReceive(false);
                    setShowBackCard(false);
                    setShowAthleteCard(true);
                    setHideTapText(false);
                  }, 0);
                }
              }}
            >
              <img
                className="h-[80vw]"
                src={IconBackCard}
                onClick={() => {
                  setShowCardReceive(true);
                  setHideTapText(true);
                }}
              />
            </div>
          )}
          {showAthleteCard && (
            <div
              className={`${
                showAthleteCard ? "animate-athlete backface-hidden" : ""
              } mb-[4vw] flex h-[101vw] items-center justify-center`}
            >
              <img className="h-[80vw]" key={index} src={SampleAthlete} />
            </div>
          )}
          {showOpenPack && (
            <div className="flex h-[10vw] justify-center">
              <button
                className={`${
                  startOpenPack ? "animate-disappear" : ""
                } relative flex h-full w-full animate-appear justify-center`}
                onClick={startPackAnimation}
              >
                <img className="h-full" src={ButtonGold} />
                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                  <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                    Open Pack
                  </p>
                </div>
              </button>
            </div>
          )}
          {showBackCard && (
            <div
              className={`${
                hideTapText ? "animate-disappear" : ""
              } flex h-[10vw] justify-center`}
            >
              <p className="animate-text font-russoone text-[4vw] font-normal text-white">
                Tap the Card to reveal the Athlete.
              </p>
            </div>
          )}
          {showAthleteCard && (
            <div className="flex h-[10vw] justify-center">
              <button
                className={`${
                  showAthleteCard ? "animate-appear fill-mode-forwards" : ""
                } relative flex h-full w-full justify-center`}
                onClick={handleChangeImage}
              >
                <img className="h-full" src={ButtonGold} />
                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                  <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-white">
                    Continue
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
