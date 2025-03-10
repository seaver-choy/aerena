import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import { DreamTeam, TeamProfile, Token } from "../../../../helpers/interfaces";
import { useUsers } from "../../../../hooks/useUser";
import { getTeamProfiles } from "../../../../helpers/lambda.helper";
import { getCountryImage } from "../../../../helpers/images";
import { TeamSlider } from "../../../../components/TeamSlider";

interface TeamModalProps {
    dreamTeam: DreamTeam;
    onSelect: (
        teamProfile: TeamProfile,
        tokens: Token[],
        index?: number
    ) => void;
    onClose: () => void;
}

export const TeamModal = ({ dreamTeam, onSelect, onClose }: TeamModalProps) => {
    const user = useUsers();
    const [teams, setTeams] = useState<TeamProfile[]>(null);
    const [countries, setCountries] = useState<string[]>(null);
    const [filteredTeams, setFilteredTeams] = useState<TeamProfile[]>(null);
    const [countryIndex, setCountryIndex] = useState<number>(0);
    const [teamIndex, setTeamIndex] = useState<number>(0);

    const fetchTeams = async () => {
        const result = await getTeamProfiles(user.initDataRaw);
        setTeams(result);
    };

    const handleCountryChange = (newIndex) => {
        const matchingTeams = teams
            .filter((team) => team.country === countries[newIndex])
            .sort((a, b) => a.key.localeCompare(b.key));
        setFilteredTeams(matchingTeams);
        if (
            dreamTeam.teamProfile !== undefined &&
            countries[newIndex] === dreamTeam.teamProfile.country
        ) {
            const currentTeamIndex = matchingTeams.findIndex(
                (team) => team.teamId === dreamTeam.teamProfile.teamId
            );
            setTeamIndex(currentTeamIndex);
        } else setTeamIndex(0);
    };

    const handleContent = async () => {
        const uniqueCountries = [
            ...new Set(
                teams
                    .map((team) => team.country)
                    .filter(
                        (country) => country !== undefined && country !== null
                    )
            ),
        ].sort();
        setCountries(uniqueCountries);
        if (dreamTeam.teamProfile !== undefined) {
            const matchingTeams = teams
                .filter(
                    (team) => team.country === dreamTeam.teamProfile.country
                )
                .sort((a, b) => a.key.localeCompare(b.key));
            setFilteredTeams(matchingTeams);
            const currentCountryIndex = uniqueCountries.findIndex(
                (country) => country === dreamTeam.teamProfile.country
            );
            setCountryIndex(currentCountryIndex);
            const currentTeamIndex = matchingTeams.findIndex(
                (team) => team.teamId === dreamTeam.teamProfile.teamId
            );
            setTeamIndex(currentTeamIndex);
        } else {
            const matchingTeams = teams
                .filter((team) => team.country === uniqueCountries[0])
                .sort((a, b) => a.key.localeCompare(b.key));
            setFilteredTeams(matchingTeams);
        }
    };

    const handleTeamSelect = async () => {
        onSelect(filteredTeams[teamIndex], dreamTeam.lineup);
        onClose();
    };

    const handleCountryPrevious = () => {
        if (countryIndex > 0) {
            const newIndex = countryIndex - 1;
            setCountryIndex(newIndex);
            handleCountryChange(newIndex);
        }
    };

    const handleCountryNext = () => {
        if (countryIndex < countries.length - 1) {
            const newIndex = countryIndex + 1;
            setCountryIndex(newIndex);
            handleCountryChange(newIndex);
        }
    };

    useEffect(() => {
        if (teams != null) {
            handleContent();
        }
    }, [teams]);

    useEffect(() => {
        fetchTeams();
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                <motion.div
                    className="absolute z-40 h-[115vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={LargeModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[99vw] w-[66vw] flex-col justify-center">
                    <div className="relative flex h-[11vw] flex-col items-center gap-[2vw]">
                        <motion.div {...appearTextAnimation}>
                            <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                                Select Team
                            </p>
                        </motion.div>
                        <motion.button
                            className="absolute right-0 top-0 h-[7vw] w-[7vw]"
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full w-full" src={CloseIcon} />
                        </motion.button>
                    </div>
                    <div className="mb-[4vw] mt-[4vw] flex h-[10vw] items-center">
                        <motion.button
                            className="flex h-[5vw] w-[30%] justify-start"
                            {...appearAnimation}
                            onClick={handleCountryPrevious}
                            disabled={countries == null}
                        >
                            <img
                                className={`ml-[4vw] h-full ${countries != null && countryIndex > 0 ? "opacity-100" : "opacity-50"}`}
                                src={LeftIcon}
                            />
                        </motion.button>
                        <motion.div
                            className="flex h-full w-[40%] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img
                                className="h-full"
                                src={getCountryImage(
                                    countries != null
                                        ? countries[countryIndex]
                                        : ""
                                )}
                                alt={
                                    countries != null
                                        ? countries[countryIndex]
                                        : ""
                                }
                            />
                        </motion.div>
                        <motion.button
                            className="flex h-[5vw] w-[30%] justify-end"
                            {...appearAnimation}
                            onClick={handleCountryNext}
                            disabled={countries == null}
                        >
                            <img
                                className={`mr-[4vw] h-full ${countries != null && countryIndex < countries.length - 1 ? "opacity-100" : "opacity-50"}`}
                                src={RightIcon}
                            />
                        </motion.button>
                    </div>
                    <div className="mb-[4vw] flex h-[58.5vw]">
                        {filteredTeams != null && (
                            <TeamSlider
                                teams={filteredTeams}
                                cardIndex={teamIndex}
                                setCardIndex={setTeamIndex}
                            />
                        )}
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full">
                            {filteredTeams != null &&
                                (dreamTeam.teamProfile == undefined ||
                                (teamIndex != -1 &&
                                    dreamTeam.teamProfile.key !==
                                        filteredTeams[teamIndex].key) ? (
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={handleTeamSelect}
                                        {...appearTextAnimation}
                                    >
                                        <img
                                            className="h-full"
                                            src={GoldButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                                Select
                                            </p>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        className="relative flex h-full w-full justify-center"
                                        {...appearTextAnimation}
                                    >
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-gold">
                                                Selected
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
