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
import { Athlete, Skin } from "../../../../helpers/interfaces";

import FunctionButton from "../../../../assets/button/function.svg";
import GoldLine from "../../../../assets/others/line-gold.svg";
import LeftIcon from "../../../../assets/icon/left-gold.svg";
import RightIcon from "../../../../assets/icon/right-gold.svg";
import AthleteSonner from "../../../../assets/sonner/athlete-gold.svg";
import { AthleteCard } from "../../../../components/AthleteCard";
import { AthleteModal } from "../../modals/AthleteModal";
import { getAthlete } from "../../../../helpers/lambda.helper";

export const Collection = () => {
    const user = useUsers();
    const navigate = useNavigate();
    const positionList = ["Roam", "Mid", "Jungle", "Gold", "EXP"];
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [maxLength] = useState<number>(positionList.length - 1);
    const [displaySkins, setDisplaySkins] = useState<Skin[]>(null);
    const [showSkin, setShowSkin] = useState(false);
    const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);
    const [selectedSkin, setSelectedSkin] = useState<Skin>(null);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete>(null);

    const handlePurchase = () => {
        navigate(`/exchange`);
    };
    
    const fetchAthlete = async (skin) => {
        const result = await getAthlete(skin.athleteId, user.initDataRaw);
        if(result) {
            setSelectedAthlete(result);
            setSelectedSkin(skin);
            setShowAthleteModal(true);
        }
    }
    const displayAthleteModal = (skin: Skin) => {
        fetchAthlete(skin);
    };

    const closeAthleteModal = () => {
        setSelectedSkin(null);
        setShowAthleteModal(false);
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

    function compileSkins(position: string) {
        const filteredPosition = user.skins.filter((obj) =>
            obj.position.includes(position)
        );

        const sorted = filteredPosition.sort((a, b) => {
            // const teamA = a.team.toUpperCase();
            // const teamB = b.team.toUpperCase();

            const nameA = a.player;
            const nameB = b.player;

            // const teamOrder = teamA.localeCompare(teamB);
            const nameOrder = nameA.localeCompare(nameB);

            // return teamOrder || nameOrder;
            return nameOrder;
        });
        setDisplaySkins(sorted);
        setShowSkin(true);
    }

    useEffect(() => {
        if (user.skins.length > 0) {
            setShowSkin(false);
            compileSkins(positionList[positionIndex]);
        } else {
            setShowSkin(false);
            setDisplaySkins([]);
        }
    }, [positionIndex, user.skins]);

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
                                <p className="font-russoone text-[2.4vw] font-normal tracking-wide text-white">
                                    Buy
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
                            className={`h-[6vw] ${positionIndex === 0 || user.skins.length === 0 ? "cursor-default opacity-50" : "opacity-100"}`}
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
                            className={`h-[6vw] ${positionIndex === positionList.length - 1 || user.skins.length === 0 ? "cursor-default opacity-50" : "opacity-100"}`}
                            src={RightIcon}
                        />
                    </button>
                </div>
                <div className="absolute mb-[4vw] mt-[46vw] flex h-[135vw]">
                    <div className="disable-scrollbar m-[4vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
                        {displaySkins?.length > 0 ? (
                            displaySkins?.map((athlete, index) =>
                                showSkin ? (
                                    <motion.button
                                        className="relative flex h-[36.4vw] w-[28vw]"
                                        key={index}
                                        onClick={() => {
                                            displayAthleteModal(athlete);
                                        }}
                                        {...appearCardAnimation}
                                    >
                                        <AthleteCard
                                            color={athlete.teamData.colors}
                                            ign={athlete.player}
                                            opacity={{wave: athlete.teamData.colors.wave}}
                                            role={athlete.position[0]}
                                            type={"basic"}
                                            league={athlete.league}
                                            id={index}
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
            {showAthleteModal && (
                <AthleteModal
                    athlete={selectedAthlete}
                    onClose={closeAthleteModal}
                    skin={selectedSkin}
                />
            )}
        </div>
    );
};
