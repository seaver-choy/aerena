import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearCardEmptyAnimation,
    appearModalAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-silver.svg";

import { DreamTeam, TeamColor, TeamProfile, Token, TournamentLineup } from "../../../../helpers/interfaces";
import { getAthletePositionLogo, getBaseTeamColor } from "../../../../helpers/athletes";
import { useUsers } from "../../../../hooks/useUser";
import { getAthletePositionFilter } from "../../../../helpers/lambda.helper";
import { AthleteCard } from "../../../../components/AthleteCard";

interface AthleteSelectModalProps {
    dreamTeam: DreamTeam;
    dreamTeamLineup: TournamentLineup[];
    position: string;
    positionIndex: number;
    onSelect: (teamProfile: TeamProfile, tokens: Token[], index?: number) => void;
    onClose: () => void;
}

export const AthleteSelectModal = ({ dreamTeam, dreamTeamLineup, position, positionIndex, onSelect, onClose }: AthleteSelectModalProps) => {
    const user = useUsers();
    const [displayAthletes, setDisplayAthletes] = useState<Token[]>(null);
    const [filteredAthletes, setFilteredAthletes] = useState<Token[]>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [showAthlete, setShowAthlete] = useState(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [searchName, setSearchName] = useState<string>("");
    const handleTeamSelect = async() => {
        if(hasSelected){
            const newLineup = [...dreamTeamLineup];
            newLineup[positionIndex] = {...newLineup[positionIndex], athlete: filteredAthletes[selectedIndex]};
            const athletes = newLineup.map(position => position.athlete);
            onSelect(dreamTeam.teamProfile, athletes, positionIndex);
        }
        onClose();
    }

    const checkAthleteExistsInLineup = (athlete) => {
        return dreamTeamLineup.some(
            (obj) => obj.athlete?.displayName === athlete.displayName
        );
    };
    
    const fetchAthletes = async () => {
        const result = await getAthletePositionFilter(
            position,
            "",
            user.initDataRaw
        );
        setDisplayAthletes(result);
        setFilteredAthletes(result);
        let foundIndex = -1;
        for (let i = 0; i < result.length; i++) {
            const athlete = result[i];
            if (foundIndex === -1) {
                if (checkAthleteExistsInLineup(athlete)) {
                    foundIndex = i;
                    break;
                }
            }
        }
        if (foundIndex !== -1) {
            setSelectedIndex(foundIndex);
            setHasSelected(true);
        }
        setShowAthlete(true);
    };
    
    const filterAthletes = () => {
        const newFilteredAthletes = displayAthletes.filter(token => 
            token.player?.toLowerCase().includes(searchName.toLowerCase()) ?? false
          );
        setFilteredAthletes(newFilteredAthletes);
        setShowAthlete(true);
    };

    const handleAthleteSelect = (index) => {
        setSelectedIndex(index);
        setHasSelected(true);
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };
    
    useEffect(() => {
        setShowAthlete(false);
        if(searchName !== "")
            filterAthletes();
        else {
            setFilteredAthletes(displayAthletes);
            setShowAthlete(true);
        }
    }, [searchName]);
    
    useEffect(() => {
        setShowAthlete(false);
        fetchAthletes();
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
                                Select Player
                            </p>
                        </motion.div>
                        <motion.button
                            className="absolute right-0 top-0 h-[5vw] w-[5vw]"
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full w-full" src={CloseIcon} />
                        </motion.button>
                    </div>
                    <div className="mb-[4vw] flex h-[6.5vw]">
                        <motion.div
                            className="flex w-[100%] items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-full" src={getAthletePositionLogo(position)} />
                        </motion.div>
                    </div>
                    <motion.div
                        className="mx-[2vw] mb-[4vw] h-[10vw] rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                        {...appearTextAnimation}
                    >
                        <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[4vw]">
                            <input
                                className="flex w-full bg-transparent font-russoone text-[3.5vw] font-normal text-white focus:outline-none"
                                type="text"
                                placeholder="Search..."
                                maxLength={12}
                                value={searchName}
                                onChange={handleSearchChange}
                            ></input>
                        </div>
                    </motion.div>
                    <div className="mb-[4vw] flex h-[52vw] flex-row flex-wrap content-start gap-[0.75vw] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {
                            filteredAthletes?.map((athlete, index) => (
                                <div>
                                    {showAthlete && (
                                        <div>
                                            {index !== selectedIndex && (
                                                <motion.div
                                                    className="relative flex h-[27.95vw] w-[21.5vw] opacity-50"
                                                    key={index}
                                                    onClick={() =>
                                                        handleAthleteSelect(index)
                                                    }
                                                    {...appearCardEmptyAnimation}
                                                >
                                                    {/* <img
                                                        className="h-full w-full"
                                                        src={athlete.img}
                                                        alt={athlete.displayName}
                                                    /> */}
    
                                                    <AthleteCard
                                                        color={dreamTeam.teamProfile.teamId != undefined ? dreamTeam.teamProfile.baseTeamColors : baseColor}
                                                        ign={athlete.displayName}
                                                        role={athlete.position[0]}
                                                        opacity={{
                                                            wave: dreamTeam.teamProfile.teamId != undefined ? dreamTeam.teamProfile.baseTeamColors.wave : baseColor.wave,
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                            {index === selectedIndex && (
                                                <motion.div
                                                    className="relative flex h-[27.95vw] w-[21.5vw] opacity-100"
                                                    key={index}
                                                    onClick={() =>
                                                        handleAthleteSelect(index)
                                                    }
                                                    {...appearCardAnimation}
                                                >
                                                    {/* <img
                                                        className="h-full w-full"
                                                        src={athlete.img}
                                                        alt={athlete.displayName}
                                                    /> */}
    
                                                    <AthleteCard
                                                        color={dreamTeam.teamProfile.teamId != undefined ? dreamTeam.teamProfile.baseTeamColors : baseColor}
                                                        ign={athlete.displayName}
                                                        role={athlete.position[0]}
                                                        opacity={{
                                                            wave: dreamTeam.teamProfile.teamId != undefined ? dreamTeam.teamProfile.baseTeamColors.wave : baseColor.wave,
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                    {!showAthlete && (
                                        <motion.div
                                            className="relative flex h-[27.95vw] w-[21.5vw]"
                                            {...pulseAnimation}
                                        >
                                            <img
                                                className="h-full w-full"
                                                src={AthleteSonner}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleTeamSelect}
                                {...appearTextAnimation}
                                disabled={!showAthlete}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Select
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
