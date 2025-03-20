import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    slideRightTextAnimation,
} from "../../helpers/animation";
import { DreamTeam, TeamProfile, Token } from "../../helpers/interfaces";
import { LeagueModal } from "../../modals/LeagueModal";
import { RegionModal } from "../../modals/RegionModal";
import { TeamModal } from "../../modals/TeamModal";

import FunctionBackground from "../../assets/background/function.svg";
import FunctionButton from "../../assets/button/function.svg";

interface FunctionSectionProps {
    title: string;
    regions?: string[];
    chosenRegion?: string;
    setChosenRegion?: (chosenRegion: string) => void;
    showRegionButton?: boolean;
    leagueTypes?: string[];
    chosenLeagueType?: string;
    setChosenLeagueType?: (chosenLeagueTypes: string) => void;
    showLeagueButton?: boolean;
    dreamTeam?: DreamTeam;
    handleDreamTeam?: (teamProfile: TeamProfile, tokens: Token[]) => void;
    showTeamButton?: boolean;
    showBuyButton?: boolean;
}

export const FunctionSection = ({
    title,
    regions,
    chosenRegion,
    setChosenRegion,
    showRegionButton = false,
    leagueTypes,
    chosenLeagueType,
    setChosenLeagueType,
    showLeagueButton = false,
    dreamTeam,
    handleDreamTeam,
    showTeamButton = false,
    showBuyButton = false,
}: FunctionSectionProps) => {
    const navigate = useNavigate();
    const [showRegionModal, setShowRegionModal] = useState<boolean>(false);
    const [showLeagueModal, setShowLeagueModal] = useState<boolean>(false);
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

    const closeRegionModal = () => {
        setShowRegionModal(false);
    };

    const closeLeagueModal = () => {
        setShowLeagueModal(false);
    };

    const closeTeamModal = () => {
        setShowTeamModal(false);
    };

    function handleSetRegion(region: string) {
        if (region === "ALL") {
            setChosenRegion("ALL");
        } else {
            setChosenRegion(region);
        }
    }

    function handleSetLeagueType(leagueType: string) {
        if (leagueType === "ALL") {
            setChosenLeagueType("ALL");
        } else {
            setChosenLeagueType(leagueType);
        }
    }

    const dynamicTitle =
        dreamTeam?.teamProfile?.key !== undefined &&
        dreamTeam?.teamProfile?.key !== null
            ? dreamTeam.teamProfile.key
            : title;

    const handlePurchase = () => {
        navigate(`/exchange`);
    };

    return (
        <div className="relative mt-[4vw] flex h-[13.8vw] w-full">
            <img className="h-full" src={FunctionBackground} />
            <div className="absolute flex h-full w-full px-[6vw]">
                <div className="flex h-full w-[50%] items-center pl-[2vw]">
                    <motion.p
                        className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                        {...slideRightTextAnimation}
                    >
                        {dynamicTitle}
                    </motion.p>
                </div>
                <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                    {showRegionButton && (
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
                            <img
                                className="h-[100%]"
                                src={FunctionButton}
                            ></img>
                        </motion.button>
                    )}
                    {showLeagueButton && (
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
                            <img
                                className="h-[100%]"
                                src={FunctionButton}
                            ></img>
                        </motion.button>
                    )}
                    {showTeamButton && (
                        <motion.button
                            className="relative flex h-[7vw] items-center justify-center"
                            onClick={() => setShowTeamModal(true)}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex">
                                <p className="font-russoone text-[2.8vw] font-normal tracking-wide text-white">
                                    Team
                                </p>
                            </div>
                            <img
                                className="h-[100%]"
                                src={FunctionButton}
                            ></img>
                        </motion.button>
                    )}
                    {showBuyButton && (
                        <motion.button
                            className="relative flex h-[7vw] items-center justify-center"
                            onClick={handlePurchase}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex">
                                <p className="font-russoone text-[2.8vw] font-normal tracking-wide text-white">
                                    Buy
                                </p>
                            </div>
                            <img
                                className="h-[100%]"
                                src={FunctionButton}
                            ></img>
                        </motion.button>
                    )}
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
            {showTeamModal && (
                <TeamModal
                    onClose={closeTeamModal}
                    dreamTeam={dreamTeam}
                    onSelect={handleDreamTeam}
                />
            )}
        </div>
    );
};
