import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ButtonGold from "../../assets/button-gold.svg";
import ButtonWhite from "../../assets/button-white.svg";
import SlideOne from "../../assets/slide-one.svg";
import SlideTwo from "../../assets/slide-two.svg";
import SlideThree from "../../assets/slide-three.svg";
import SlideFour from "../../assets/slide-four.svg";

export const TutorialModal = () => {
  const sliderRef = useRef(null);

  const settings = {
    centerMode: true,
    centerPadding: "5%",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute z-50 bg-light py-[20vw] flex h-full w-full animate-modal flex-col justify-center">
          <div className="mb-[4vw] flex h-full items-center justify-center">
            {/* <TonConnectButton /> */}
            <Slider
              ref={(slider: any) => (sliderRef.current = slider)}
              className="w-full h-full"
              {...settings}
            >
              <div className="px-[2vw] mt-[10vw]">
                <img className="h-[93vw] w-full" src={SlideOne} />
                <p className="mt-[10vw] bg-gradient-to-r text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
                  Collect Player Cards
                </p>
                <p className="text-center mx-[5vw] mt-[3vw] font-montserrat text-[4vw] text-graydark">
                  Build your dream roster by collecting unique Player Cards!
                </p>
              </div>
              <div className="px-[2vw] mt-[10vw]">
                <img className="h-[93vw] w-full" src={SlideTwo} />
                <p className="mt-[10vw] bg-gradient-to-r text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
                  Join Tournaments
                </p>
                <p className="text-center mx-[5vw] mt-[3vw] font-montserrat text-[4vw] text-graydark">
                  Field your best Player Cards and dominate the competition!
                </p>
              </div>
              <div className="px-[2vw] mt-[10vw]">
                <img className="h-[93vw] w-full" src={SlideThree} />
                <p className="mt-[10vw] bg-gradient-to-r text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
                  Win Tournament Prizes
                </p>
                <p className="text-center mx-[5vw] mt-[3vw] font-montserrat text-[4vw] text-graydark">
                  Score big and unlock exclusive prizes when you win!
                </p>
              </div>
              <div className="px-[2vw] mt-[10vw]">
                <img className="h-[93vw] w-full" src={SlideFour} />
                <p className="mt-[10vw] bg-gradient-to-r text-center from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
                  Connect TON Wallet
                </p>
                <p className="text-center mx-[5vw] mt-[3vw] font-montserrat text-[4vw] text-graydark">
                  Get started by linking your TON wallet to unlock the full
                  experience!
                </p>
              </div>
            </Slider>
          </div>
          <div className="flex justify-center h-[10vw] gap-[4vw]">
            <button className="relative pl-[8vw] flex h-full w-full justify-center">
              <img className="h-full" src={ButtonWhite} />
              <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                <p className="mt-[0.2vw] font-russoone text-[3.5vw] font-normal text-transparent bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text">
                  Back
                </p>
              </div>
            </button>
            <button className="relative pr-[8vw] flex h-full w-full justify-center">
              <img className="h-full" src={ButtonGold} />
              <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                <p className="mt-[0.2vw] font-russoone text-[3.5vw] font-normal text-white">
                  Next
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
