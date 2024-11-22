/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BackgroundMainStatistics from "../../../../assets/background-mainstatistics.svg";
import ButtonGold from "../../../../assets/button-gold.svg";
import ButtonWhite from '../../../../assets/button-white.svg'
import IconMint from '../../../../assets/icon-mint.svg'
import IconClose from "../../../../assets/icon-close.svg";
import IconStickerM6 from "../../../../assets/icon-sticker-m6.svg";
import ModalLarge from "../../../../assets/modal-large.svg";
import BackgroundMintingBenefits from '../../../../assets/background-mintingbenefits.svg'
import BenefitOne from '../../../../assets/benefit-one.svg'
import BenefitTwo from '../../../../assets/benefit-two.svg'
import BenefitThree from '../../../../assets/benefit-three.svg'
import IconTON from '../../../../assets/icon-ton.svg'

interface AthleteModalProps {
  cancel: () => void;
  selectedAthlete: any;
}

export const AthleteModal = ({ cancel, selectedAthlete }: AthleteModalProps) => {
    const [showMintingBenefits, setShowMintingBenefits] = useState(false);
    const [showMintAthlete, setShowMintAthlete] = useState(false);

  return (
    <div className="fixed inset-0 z-40">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-graydark opacity-95" />
        <div className="absolute z-40 h-[115vw] w-[80vw] animate-modal">
          <img className="h-full w-full" src={ModalLarge} />
        </div>
        <div className="absolute z-50 flex h-[99vw] w-[66vw] animate-modal flex-col justify-center">
            {showMintAthlete ? (
                <div>
                    <div className="flex h-[11vw] flex-col items-center gap-[2vw]">
                        <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                            Mint Player Card
                        </p>
                        <button
                            className="absolute right-0 h-[5vw] w-[5vw]"
                            onClick={cancel}
                        >
                            <img className="h-full w-full" src={IconClose} />
                        </button>
                    </div>
                    <div className="relative mb-[2vw] flex h-[45vw] justify-center">
                        <img className="h-[100%] animate-modal" src={selectedAthlete?.img} />
                    </div>
                    <div className="mb-[2vw] flex h-[16vw] flex-row justify-center gap-[2vw] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex h-full w-full animate-modal flex-col items-center justify-center">
                            <img className="h-[7vw]" src={IconTON} />
                            <p className="mt-[0.5vw] text-nowrap font-montserrat text-[5vw] font-extrabold text-ton">
                                5.005 TON
                            </p>
                        </div>
                    </div>
                    <div className="mb-[4vw] flex h-[11.5vw]">
                        <div className="flex justify-center ml-[4vw] items-start flex-col h-full w-full">
                            <p className="font-montserrat text-[3vw] font-normal text-graylight">
                                Mint Cost
                            </p>
                            <p className="font-montserrat text-[3vw] font-normal text-graylight">
                                Network Fee
                            </p>
                        </div>
                        <div className="flex justify-center mr-[4vw] items-end flex-col h-full w-full">
                            <p className="font-montserrat text-[3vw] font-bold text-graydark">
                                5 TON
                            </p>
                            <p className="font-montserrat text-[3vw] font-bold text-graydark">
                                0.005 TON
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full justify-end">
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={() => setShowMintAthlete(false)}
                            >
                                <img className="h-full" src={ButtonWhite} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.8vw] font-normal text-transparent">
                                        Cancel
                                    </p>
                                </div>
                            </button>
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={() => setShowMintAthlete(true)}
                            >
                                <img className="h-full" src={ButtonGold} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Mint
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : showMintingBenefits ? (
                <div>
                    <div className="flex h-[11vw] flex-col items-center gap-[2vw]">
                        <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                            Mint Player Card
                        </p>
                        <button
                            className="absolute right-0 h-[5vw] w-[5vw]"
                            onClick={cancel}
                        >
                            <img className="h-full w-full" src={IconClose} />
                        </button>
                    </div>
                    <div className="relative mb-[4vw] items-center overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-col flex h-[76.5vw] animate-modal justify-start">
                        <div className="flex h-[27.3vw] w-full mb-[2vw]">
                            <img className="h-full w-full" src={BackgroundMintingBenefits} />
                        </div>
                        <div className="flex h-[17.9vw] w-full mb-[2vw]">
                            <img className="h-full w-full" src={BenefitOne} />
                        </div>
                        <div className="flex h-[17.9vw] w-full mb-[2vw]">
                            <img className="h-full w-full" src={BenefitTwo} />
                        </div>
                        <div className="flex h-[17.9vw] w-full mb-[2vw]">
                            <img className="h-full w-full" src={BenefitThree} />
                        </div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full justify-end">
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={() => setShowMintingBenefits(false)}
                            >
                                <img className="h-full" src={ButtonWhite} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.8vw] font-normal text-transparent">
                                        Back
                                    </p>
                                </div>
                            </button>
                            <button
                                className="relative flex h-full w-full justify-center"
                                onClick={() => setShowMintAthlete(true)}
                            >
                                <img className="h-full" src={ButtonGold} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Continue
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex h-[11vw] flex-col items-center gap-[2vw]">
                        <button
                            className="absolute animate-modal left-0 h-[10vw] w-[10vw]"
                            onClick={() => setShowMintingBenefits(true)}
                        >
                            <img className="h-full w-full" src={IconMint} />
                        </button>
                        <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                            Athlete Profile
                        </p>
                        <button
                            className="absolute right-0 h-[5vw] w-[5vw]"
                            onClick={cancel}
                        >
                            <img className="h-full w-full" src={IconClose} />
                        </button>
                    </div>
                    <div className="relative mb-[2vw] flex h-[45vw] animate-modal justify-center">
                        <img className="h-[100%]" src={selectedAthlete?.img} />
                    </div>
                    <div className="mb-[2vw] flex h-[16vw] flex-row justify-center gap-[2vw] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex h-full w-[20vw] animate-modal flex-col items-center justify-center">
                            <img className="h-[10vw]" src={IconStickerM6} />
                            <p className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[2.5vw] font-extrabold text-transparent">
                            </p>
                        </div>
                    </div>
                    <div className="mb-[4vw] flex h-[11.5vw] gap-[2vw]">
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img className="h-full" src={BackgroundMainStatistics} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                KILLS
                            </p>
                            <p className="font-russoone text-[4vw] font-normal text-white">
                                {selectedAthlete.avgKills}
                            </p>
                        </div>
                        </div>
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img className="h-full" src={BackgroundMainStatistics} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                ASSISTS
                            </p>
                            <p className="font-russoone text-[4vw] font-normal text-white">
                                {selectedAthlete.avgAssists}
                            </p>
                        </div>
                        </div>
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img className="h-full" src={BackgroundMainStatistics} />
                        <div className="absolute flex h-full w-full flex-col items-center justify-center">
                            <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                KDA
                            </p>
                            <p className="font-russoone text-[4vw] font-normal text-white">
                                {selectedAthlete.kda}
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full justify-end">
                            <button className="relative flex h-full w-full justify-center opacity-50" disabled>
                                <img className="h-full" src={ButtonGold} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        All Stats
                                    </p>
                                </div>
                            </button>
                            <button className="relative flex h-full w-full justify-center opacity-50" disabled>
                                <img className="h-full" src={ButtonGold} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Upgrade
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}   
        </div>
      </div>
    </div>
  );
};
