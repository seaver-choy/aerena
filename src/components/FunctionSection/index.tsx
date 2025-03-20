import { useState } from "react";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../helpers/animation";
import { LeagueModal } from "../../modals/LeagueModal";
import { RegionModal } from "../../modals/RegionModal";

import FunctionBackground from "../../assets/background/function.svg";
import FunctionButton from "../../assets/button/function.svg";

interface FilterProps {
    title: string;
    regions?: string[];
    chosenRegion?: string;
    setChosenRegion?: (chosenRegion: string) => void;
    leagueTypes?: string[];
    chosenLeagueType?: string;
    setChosenLeagueType?: (chosenLeagueTypes: string) => void;
}

export const FunctionSection = ({
    title,
    regions,
    chosenRegion,
    setChosenRegion,
    leagueTypes,
    chosenLeagueType,
    setChosenLeagueType,
}: FilterProps) => {
    const [showRegionModal, setShowRegionModal] = useState<boolean>(false);
    const [showLeagueModal, setShowLeagueModal] = useState<boolean>(false);

    const closeLeagueModal = () => {
        setShowLeagueModal(false);
    };
    const closeRegionModal = () => {
        setShowRegionModal(false);
    };

    function handleSetLeagueType(leagueType: string) {
        if (leagueType === "ALL") {
            setChosenLeagueType("ALL");
        } else {
            setChosenLeagueType(leagueType);
        }
    }

    function handleSetRegion(region: string) {
        if (region === "ALL") {
            setChosenRegion("ALL");
        } else {
            setChosenRegion(region);
        }
    }

    return (
        <div className="relative mt-[4vw] flex h-[13.8vw] w-full">
            <img className="h-full" src={FunctionBackground} />
            <div className="absolute flex h-full w-full px-[6vw]">
                <div className="flex h-full w-[50%] items-center pl-[2vw]">
                    <motion.p
                        className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                        {...slideRightTextAnimation}
                    >
                        {title}
                    </motion.p>
                </div>
                <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                    <motion.button
                        className="relative flex h-[7vw] items-center justify-center"
                        onClick={() => setShowRegionModal(true)}
                        disabled={regions == null || leagueTypes == null}
                        {...appearTextAnimation}
                    >
                        <div className="absolute flex">
                            <p className="font-russoone text-[2.8vw] font-normal tracking-wide text-white">
                                Region
                            </p>
                        </div>
                        <img className="h-[100%]" src={FunctionButton}></img>
                    </motion.button>
                    <motion.button
                        className="relative flex h-[7vw] items-center justify-center"
                        onClick={() => setShowLeagueModal(true)}
                        disabled={regions == null || leagueTypes == null}
                        {...appearTextAnimation}
                    >
                        <div className="absolute flex">
                            <p className="font-russoone text-[2.8vw] font-normal tracking-wide text-white">
                                League
                            </p>
                        </div>
                        <img className="h-[100%]" src={FunctionButton}></img>
                    </motion.button>
                </div>
            </div>
            {showRegionModal && (
                <RegionModal
                    onClose={closeRegionModal}
                    regions={regions}
                    chosenRegion={chosenRegion}
                    setChosenRegion={handleSetRegion}
                />
            )}
            {showLeagueModal && (
                <LeagueModal
                    onClose={closeLeagueModal}
                    leagueTypes={leagueTypes}
                    chosenLeagueType={chosenLeagueType}
                    setChosenLeagueType={handleSetLeagueType}
                />
            )}
        </div>
    );
};
