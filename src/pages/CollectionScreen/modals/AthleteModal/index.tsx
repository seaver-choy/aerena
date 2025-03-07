import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Slider } from "../../../../components/Slider";
import {
    getAthleteLatestSeasonAverageStats,
    getTeamInfo,
    getSameAthletes,
    equipSkin,
} from "../../../../helpers/lambda.helper";
import { StatsDisplay } from "../../../../components/StatsDisplay";
import LargeModal from "../../../../assets/modal/large.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import FunctionModalButton from "../../../../assets/button/function-modal.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import {
    Athlete,
    AverageStats,
    Team,
    SameAthlete,
    Skin,
} from "../../../../helpers/interfaces";
import { useUsers } from "../../../../hooks/useUser";
interface AthleteModalProps {
    athlete: Athlete;
    onClose: () => void;
    skin?: Skin;
}

export const AthleteModal = ({
    athlete,
    onClose,
    skin = null,
}: AthleteModalProps) => {
    const user = useUsers();
    const navigate = useNavigate();

    const [sameAthletes, setSameAthletes] = useState<SameAthlete[]>([]);
    const [skinTitle, setSkinTitle] = useState<string>("");
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [equippedIndex, setEquippedIndex] = useState<number>(0);
    const [athleteSkins, setAthleteSkins] = useState<Skin[]>(null);
    const [teamInfo, setTeamInfo] = useState<Team>(null);
    const [averageStats, setAverageStats] = useState<AverageStats>({
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
        averagePoints: 0,
    });

    const handleViewPlayerProfile = () => {
        navigate(`athlete`, {
            state: {
                athlete,
                sameAthletes,
                averageStats,
            },
        });
    };

    const handleEquipSkin = async () => {
        let oldIndex = equippedIndex - 1;
        let newIndex = cardIndex - 1;

        if (oldIndex > -1) {
            oldIndex = findSkin(user.skins, oldIndex);
        }
        if (newIndex > -1) {
            newIndex = findSkin(user.skins, newIndex);
        }
        const result = await equipSkin(
            user.id,
            oldIndex,
            newIndex,
            user.initDataRaw
        );
        if (result) {
            const skins = result["skins"];
            user.dispatch({
                type: "SET_SKINS",
                payload: {
                    skins: skins,
                },
            });
            const ownedSkins = skins.filter(
                (skin) => skin.athleteId == athlete.athleteId
            );
            setAthleteSkins(ownedSkins);
            setEquippedIndex(cardIndex);
        }
    };

    const findSkin = (skins, index) => {
        return skins.findIndex(
            (skin) =>
                skin.athleteId == sameAthletes[index].athleteId &&
                skin.team == sameAthletes[index].team &&
                skin.league == sameAthletes[index].league
        );
    };

    const handlePurchase = () => {
        navigate(`/exchange`);
    };

    const onCardIndexChange = (title: string) => {
        setSkinTitle(title);
    };
    useEffect(() => {
        async function fetchTeamInfo() {
            const res = await getTeamInfo(
                athlete.team,
                athlete.league,
                athlete.type,
                user.initDataRaw
            );

            setTeamInfo(res);
        }
        fetchTeamInfo();
    }, [averageStats]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        async function fetchAthleteAverageStats() {
            const res = await getAthleteLatestSeasonAverageStats(
                athlete.athleteId,
                user.initDataRaw
            );

            if (res.average[0] !== undefined) {
                setAverageStats(res.average[0]);
            }
        }
        fetchAthleteAverageStats();
    }, []);

    useEffect(() => {
        async function fetchSameAthletes() {
            const res = await getSameAthletes(
                athlete.athleteId,
                user.initDataRaw
            );
            const athletes: SameAthlete[] = res.athletes;
            const ownedSkins = user.skins.filter(
                (skin) => skin.athleteId == athlete.athleteId
            );
            const equippedSkin = ownedSkins.filter((skin) => skin.isEquipped);
            if (equippedSkin.length > 0) {
                const index = athletes.findIndex(
                    (athlete) =>
                        athlete.team == equippedSkin[0].team &&
                        athlete.league == equippedSkin[0].league
                );
                setEquippedIndex(index + 1);
            }
            setAthleteSkins(ownedSkins);
            setSameAthletes(athletes);
            setSkinTitle("Default Card");
            if (skin != null) {
                const index = athletes.findIndex(
                    (athlete) =>
                        athlete.team == skin.team &&
                        athlete.league == skin.league
                );
                setCardIndex(index + 1);
                setSkinTitle(athletes[index].team);
            }
        }
        fetchSameAthletes();
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
                    <div className="relative flex h-[11vw] flex-col items-center">
                        <motion.div {...appearTextAnimation}>
                            <p className="font-montserrat text-[3vw] font-extrabold text-golddark">
                                {athlete.team}
                            </p>
                        </motion.div>
                        <motion.div
                            className="-mt-[1.5vw]"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] text-transparent">
                                {athlete.displayName}
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
                    <div className="mb-[2vw] flex h-[11.5vw] gap-[2vw]">
                        <StatsDisplay
                            text={"KILLS"}
                            value={averageStats.averageKills}
                        />
                        <StatsDisplay
                            text={"DEATHS"}
                            value={averageStats.averageDeaths}
                        />
                        <StatsDisplay
                            text={"ASSISTS"}
                            value={averageStats.averageAssists}
                        />
                    </div>
                    <div className="mb-[2vw] flex h-[6vw] justify-center">
                        <motion.button
                            className="relative flex h-[6vw] items-center justify-center"
                            onClick={handleViewPlayerProfile}
                            {...appearTextAnimation}
                            disabled={teamInfo == null || sameAthletes.length == 0}
                        >
                            <div className="absolute flex">
                                <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
                                    View Player Profile
                                </p>
                            </div>
                            <img
                                className="h-[100%]"
                                src={FunctionModalButton}
                            ></img>
                        </motion.button>
                    </div>
                    {teamInfo !== null ? (
                        <div
                            key={sameAthletes.length}
                            className="mb-[4vw] flex h-[55vw] flex-col items-center"
                        >
                            <Slider
                                athletes={sameAthletes}
                                cardIndex={cardIndex}
                                setCardIndex={setCardIndex}
                                onCardIndexChange={onCardIndexChange}
                            />
                            <motion.div
                                className="will-change-transform backface-hidden"
                                {...appearTextAnimation}
                            >
                                <p className="font-russoone text-[3.5vw] font-normal text-golddark">
                                    {skinTitle}
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="mb-[4vw] flex h-[55vw] flex-col items-center" />
                    )}
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full">
                            {teamInfo !== null &&
                                (cardIndex === equippedIndex ? (
                                    <motion.div
                                        className="relative flex h-full w-full justify-center"
                                        {...appearTextAnimation}
                                    >
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[3.5vw] font-normal text-gold">
                                                Equipped
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : cardIndex == 0 ||
                                  (cardIndex > 0 &&
                                      findSkin(athleteSkins, cardIndex - 1) !=
                                          -1) ? (
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={handleEquipSkin}
                                        {...appearTextAnimation}
                                    >
                                        <img
                                            className="h-full"
                                            src={GoldButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                                Equip
                                            </p>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        className="relative flex h-full w-full justify-center"
                                        onClick={handlePurchase}
                                        {...appearTextAnimation}
                                    >
                                        <img
                                            className="h-full"
                                            src={GoldButton}
                                        />
                                        <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                            <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                                Purchase
                                            </p>
                                        </div>
                                    </motion.button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
