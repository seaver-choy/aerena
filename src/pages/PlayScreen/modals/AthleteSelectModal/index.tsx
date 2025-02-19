import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearCardAnimation,
    appearCardEmptyAnimation,
    appearModalAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { getAthletePositionFilter } from "../../../../helpers/lambda.helper";
import {
    getAthletePositionLogo,
    getBaseTeamColor,
} from "../../../../helpers/athletes";
import {
    Token,
    Tournament,
    TournamentLineup,
    TeamColor,
} from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";

import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-silver.svg";

interface AthleteSelectModalProps {
    onClose: () => void;
    onSelect: (lineup) => void;
    position: string;
    //athletes: Token[];
    tournamentLineup: TournamentLineup[];
    // playTab: string;
    tournament: Tournament;
}

export const AthleteSelectModal = ({
    onClose,
    onSelect,
    position,
    //athletes,
    tournamentLineup,
    //playTab,
    tournament,
}: AthleteSelectModalProps) => {
    const user = useUsers();
    const [displayAthletes, setDisplayAthletes] = useState<Token[]>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [showAthlete, setShowAthlete] = useState(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    // function compileAthletes() {
    //     //TODO: will have to change this code for card upgrades

    //     //filter athlete based on position
    //     const filteredPosition = athletes.filter(
    //         (obj) =>
    //             obj.position.includes(position) &&
    //             obj.packId.includes(playTab.toLowerCase())
    //     );

    //     // //reduce the array to unique values
    //     // const uniques = [
    //     //     ...new Map(
    //     //         filteredPosition.map((item) => [item["displayName"], item])
    //     //     ).values(),
    //     // ];

    //     // const completeArray = [];

    //     // //count number of same athletes
    //     // uniques.forEach((x) => {
    //     //     const count = filteredPosition.filter(
    //     //         (y) => y.displayName === x.displayName
    //     //     ).length;
    //     //     completeArray.push({ ...x, amount: count });
    //     // });

    //     // console.log(completeArray);
    //     setDisplayAthletes(filteredPosition);
    // }

    const fetchAthlete = async () => {
        const result = await getAthletePositionFilter(
            position,
            tournament.league,
            user.initDataRaw
        );
        setDisplayAthletes(result);
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
    };

    const checkAthleteExistsInLineup = (athlete) => {
        return tournamentLineup.some(
            (obj) => obj.athlete?.displayName === athlete.displayName
        );
    };

    const handleAthleteSelect = (index) => {
        setSelectedIndex(index);
        setHasSelected(true);
    };

    useEffect(() => {
        if (displayAthletes != null) {
            const timer = setTimeout(() => {
                setShowAthlete(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [displayAthletes]);

    useEffect(() => {
        fetchAthlete();
    }, []);

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
                            <img
                                className="h-full"
                                src={getAthletePositionLogo(position)}
                            />
                        </motion.div>
                    </div>
                    <div className="mb-[4vw] flex h-[66vw] flex-row flex-wrap content-start gap-[0.75vw] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {displayAthletes != null && displayAthletes?.map((athlete, index) => (
                            <div key={index}>
                                {showAthlete && (
                                    <motion.div
                                        className={`relative flex h-[27.95vw] w-[21.5vw]`}
                                        key={index}
                                        onClick={() =>
                                            handleAthleteSelect(index)
                                        }
                                        {...(index === selectedIndex && selectedIndex !== -1 ? appearCardAnimation : appearCardEmptyAnimation)}
                                    >
                                        <AthleteCard
                                            color={baseColor}
                                            ign={athlete.displayName}
                                            role={athlete.position[0]}
                                            opacity={{
                                                wave: baseColor.wave,
                                            }}
                                            id={index}
                                        />
                                    </motion.div>
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
                                onClick={
                                    hasSelected
                                        ? () =>
                                              onSelect(
                                                  displayAthletes[selectedIndex]
                                              )
                                        : () => onClose()
                                }
                                {...appearTextAnimation}
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
