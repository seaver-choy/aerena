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
    getAthleteAverageStats,
    getTeamInfo,
    getSameAthletes,
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
} from "../../../../helpers/interfaces";
import { useUsers } from "../../../../hooks/useUser";
interface AthleteModalProps {
    athlete: Athlete;
    onClose: () => void;
}

export const AthleteModal = ({ athlete, onClose }: AthleteModalProps) => {
    const user = useUsers();
    const navigate = useNavigate();

    const [sameAthletes, setSameAthletes] = useState<SameAthlete[]>([]);
    const [averageStats, setAverageStats] = useState<AverageStats>({
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
        averagePoints: 0,
    });
    const [skinTitle, setSkinTitle] = useState<string>("Default Card");
    const handleViewPlayerProfile = () => {
        navigate(`athlete`, {
            state: {
                athlete,
                sameAthletes,
                averageStats,
            },
        });
    };
    const [teamInfo, setTeamInfo] = useState<Team>();

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
            const res = await getAthleteAverageStats(
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
            setSameAthletes(res.athletes);
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
                        {teamInfo !== undefined ? (
                            <div
                                key={sameAthletes.length}
                                className="mb-[4vw] flex h-[55vw] flex-col items-center"
                            >
                                <Slider
                                    athletes={sameAthletes}
                                    onCardIndexChange={onCardIndexChange}
                                />
                                <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    {skinTitle}
                                </p>
                            </div>
                            )
                            : (
                                <div className="mb-[4vw] flex h-[55vw] flex-col items-center"/>
                            )
                        }
                    <div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Purchase
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
