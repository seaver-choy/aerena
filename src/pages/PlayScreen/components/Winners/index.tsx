import { useState } from "react";
import { winnersOptions } from "../../../../helpers/tabs";
import { Tabs } from "../../../../components/Tabs";

import WinnersBackground from "../../../../assets/background/winners.svg";
import WinnersRankBackground from "../../../../assets/background/winners-rank.svg";
import SkinLineupBackground from "../../../../assets/background/lineup-skin.svg";

export const Winners = () => {
    const [winnersTab, setWinnersTab] = useState("Winners");

    return (
        <div>
            <div className="mt-[8vw]">
                <Tabs
                    options={winnersOptions}
                    onToggle={(selected) => {
                        setWinnersTab(selected);
                    }}
                    selectedTab={winnersTab}
                />
                <div className="mt-[8vw] h-[32.3vw]">
                    <div className="relative flex justify-center">
                        <img
                            className="h-full w-full"
                            src={WinnersBackground}
                        />
                        <div className="absolute bottom-[1vw]">
                            <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                M6 Swiss Stage Three
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-[8vw] mt-[10vw] h-[13.3vw]">
                    <div className="relative flex items-center justify-center">
                        <img
                            className="h-full w-full"
                            src={WinnersRankBackground}
                        />
                        <div className="absolute mb-[1vw] flex h-[6.5vw] w-[40vw] items-center justify-center">
                            <p className="font-russoone text-[5vw] text-white">
                                RANK 1
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-[4vw]">
                    <div className="relative h-[109.5vw] w-full">
                        <img
                            className="h-full w-full"
                            src={SkinLineupBackground}
                        />
                        <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                            <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                JOINED
                            </p>
                        </div>
                        <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent">
                                POINTS
                            </p>
                            <p className="-mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] text-transparent">
                                0
                            </p>
                        </div>
                        <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                            <p className="font-russoone text-[4vw] text-white">
                                M6 Swiss Stage Three
                            </p>
                        </div>
                        <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                            <div className="relative flex h-[36.4vw] w-[28vw]"></div>
                        </div>
                        <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]"></div>
                    </div>
                </div>
                <div className="mx-[8vw] mt-[10vw] h-[13.3vw]">
                    <div className="relative flex items-center justify-center">
                        <img
                            className="h-full w-full"
                            src={WinnersRankBackground}
                        />
                        <div className="absolute mb-[1vw] flex h-[6.5vw] w-[40vw] items-center justify-center">
                            <p className="font-russoone text-[5vw] text-white">
                                RANK 2
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-[4vw]">
                    <div className="relative h-[109.5vw] w-full">
                        <img
                            className="h-full w-full"
                            src={SkinLineupBackground}
                        />
                        <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                            <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                JOINED
                            </p>
                        </div>
                        <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] text-transparent">
                                POINTS
                            </p>
                            <p className="-mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] text-transparent">
                                0
                            </p>
                        </div>
                        <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                            <p className="font-russoone text-[4vw] text-white">
                                M6 Swiss Stage Three
                            </p>
                        </div>
                        <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                            <div className="relative flex h-[36.4vw] w-[28vw]"></div>
                        </div>
                        <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
