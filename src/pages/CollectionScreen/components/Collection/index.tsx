import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import {
    getAthletePositionLogo,
    getAthletePositionBackground,
} from "../../../../helpers/athletes";
import { Token } from "../../../../helpers/interfaces";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";

export const Collection = () => {
    const user = useUsers();
    const navigate = useNavigate();
    const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [maxLength] = useState<number>(positionList.length - 1);
    const [displayAthletes, setDisplayAthletes] = useState<Token[]>(null);
    const [showAthlete, setShowAthlete] = useState(false);

    const handlePurchase = () => {
        navigate(`/exchange`);
    };

    const handlePreviousCategory = () => {
        if (positionIndex > 0) {
            setPositionIndex(positionIndex - 1);
        }
    };

    const handleNextCategory = () => {
        if (positionIndex < maxLength) {
            setPositionIndex(positionIndex + 1);
        }
    };

    // function compileAthletes(position: string) {
    //     console.log("Compiling athletes");
    //     const filteredPosition = user.tokens.filter((obj) =>
    //         obj.position.includes(position)
    //     );

    //     const sorted = filteredPosition.sort((a, b) => {
    //         const teamA = a.team.toUpperCase();
    //         const teamB = b.team.toUpperCase();

    //         const nameA = a.displayName;
    //         const nameB = b.displayName;

    //         const teamOrder = teamA.localeCompare(teamB);
    //         const nameOrder = nameA.localeCompare(nameB);

    //         return teamOrder || nameOrder;
    //     });
    //     console.log(sorted);
    //     setDisplayAthletes(sorted);
    // }

    useEffect(() => {
        let timer;
        if (user.tokens.length > 0) {
            // compileAthletes(positionList[positionIndex]); //TODO: temporary, just to display the no skins message since no 'skins implementation' yet
            setDisplayAthletes([]);
            setShowAthlete(false);

            timer = setTimeout(() => {
                setShowAthlete(true);
            }, 1000);
        } else {
            setShowAthlete(false);
            setDisplayAthletes([]);
        }

        return () => clearTimeout(timer);
    }, [positionIndex, user.tokens]);

    return (
        <div className="mt-[10vw] h-[193vw]">
            <div className="relative flex">
                <img
                    className="h-full w-full"
                    src={getAthletePositionBackground(
                        positionList[positionIndex]
                    )}
                />
                <div className="absolute flex h-[25vw] w-full px-[4vw] pt-[11vw]">
                    <div className="flex h-full w-[50%] items-center pl-[4vw]">
                        <motion.p
                            className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                            {...slideRightTextAnimation}
                        >
                            Personal Collection
                        </motion.p>
                    </div>
                    <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
                        <motion.button
                            className="relative flex h-[7vw] items-center justify-center"
                            onClick={handlePurchase}
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex">
                                <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
                                    Purchase
                                </p>
                            </div>
                            <img
                                className="h-[100%]"
                                src={FunctionButton}
                            ></img>
                        </motion.button>
                    </div>
                    <img
                        className="absolute bottom-0 left-0 w-full"
                        src={GoldLine}
                    ></img>
                </div>
                <div className="absolute mt-[29vw] flex h-[13vw] w-full justify-center px-[4vw]">
                    <button
                        onClick={handlePreviousCategory}
                        className="flex w-[8%] items-center justify-end"
                    >
                        <img
                            className={`h-[6vw] ${positionIndex === 0 || user.tokens.length === 0 ? "cursor-default opacity-50" : "opacity-100"}`}
                            src={LeftIcon}
                        />
                    </button>
                    <div className="flex w-[84%] items-center justify-center">
                        <img
                            className="h-[10vw]"
                            src={getAthletePositionLogo(
                                positionList[positionIndex]
                            )}
                        />
                    </div>
                    <button
                        onClick={handleNextCategory}
                        className="flex w-[8%] items-center justify-end"
                    >
                        <img
                            className={`h-[6vw] ${positionIndex === positionList.length - 1 || user.tokens.length === 0 ? "cursor-default opacity-50" : "opacity-100"}`}
                            src={RightIcon}
                        />
                    </button>
                </div>
                <div className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]">
                    <div className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
                        {displayAthletes?.length > 0 ? (
                            displayAthletes?.map((athlete, index) =>
                                showAthlete ? (
                                    <motion.button
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                        key={index}
                                        {...appearCardAnimation}
                                    >
                                        <img
                                            className="h-full w-full"
                                            src={athlete.img}
                                            alt={athlete.displayName}
                                        />
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                        {...pulseAnimation}
                                    >
                                        <img
                                            className="h-full w-full"
                                            src={AthleteSonner}
                                        />
                                    </motion.div>
                                )
                            )
                        ) : (
                            <div className="mt-[2vw] px-[5vw]">
                                <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-russoone text-[4vw] font-normal text-transparent">
                                    You do not have skins for{" "}
                                    {positionList[positionIndex]}. Purchase
                                    packs to obtain skins.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
