import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useUsers } from "../../../../hooks/useUser";
import { dateFormat, dateRangeFormat } from "../../../../hooks/dateFormat";
import { Tournament } from "../../../../helpers/interfaces";
import { getTournament } from "../../../../helpers/lambda.helper";
import {
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { Layout } from "../../../../components/Layout";
import { PointsSystem } from "../../components/PointsSystem";
import { Winners } from "../../components/Winners";

import TournamentSonner from "../../../../assets/sonner/tournament.svg";
import FreeTournamentBackground from "../../../../assets/background/tournament-free.svg";
import PremiumTournamentBackground from "../../../../assets/background/tournament-premium.svg";
import TGStar from "../../../../assets/icon/tg-star-white.svg";

interface TournamentScreenProps {
    tournamentId: number;
}

const formatTime = (time: number) => String(time).padStart(2, "0");

export const TournamentScreen = ({ tournamentId }: TournamentScreenProps) => {
    const user = useUsers();
    const { tournamentId: paramTournamentId } = useParams();
    const [tournament, setTournament] = useState<Tournament>(null);
    const [showTournament, setShowTournament] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const location = useLocation();
    const classification =
        location.state?.classification === undefined
            ? ""
            : location.state?.classification;

    const fetchTournament = async () => {
        try {
            const result = await getTournament(
                paramTournamentId,
                user.initDataRaw
            );
            setTournament(result);
            console.log(result);
        } catch (e) {
            setTournament(null);
        }
        setShowTournament(true);
    };

    useEffect(() => {
        if (
            tournament != null &&
            classification != undefined &&
            classification === ""
        ) {
            const calculateTimeLeft = () => {
                const now = new Date();
                const difference =
                    new Date(tournament.tournamentEndSubmissionDate).getTime() -
                    now.getTime();
                if (difference > 0) {
                    setTimeLeft({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60),
                    });
                } else {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            };

            const timer = setInterval(calculateTimeLeft);

            return () => clearInterval(timer);
        }
    }, [tournament]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowTournament(true);
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        console.log(tournamentId);
        fetchTournament();
    }, []);

    return (
        <Layout>
            {tournament != null && (
                <div>
                    {showTournament ? (
                        <div
                            className={`h-[58.4vw] ${tournament.type == "free" ? "" : "bg-graydark"}`}
                        >
                            <div className="relative flex justify-center">
                                <img
                                    className="h-full w-full"
                                    src={
                                        tournament.type == "free"
                                            ? FreeTournamentBackground
                                            : PremiumTournamentBackground
                                    }
                                />
                                <motion.div
                                    className="absolute top-[5vw] flex"
                                    {...appearTextAnimation}
                                >
                                    <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                        {tournament.tournamentName}
                                    </p>
                                </motion.div>
                                {tournament.type != "free" && (
                                    <motion.div
                                        className="absolute top-[23vw] flex"
                                        {...appearTextAnimation}
                                    >
                                        <img
                                            src={TGStar}
                                            className="mr-[2vw] mt-[2.5vw] h-[7vw]"
                                        />
                                        <p className="text-nowrap font-russoone text-[9vw] font-normal text-white">
                                            {tournament.prizePool.toLocaleString()}
                                        </p>
                                    </motion.div>
                                )}
                                <motion.div
                                    className="absolute bottom-[8vw] flex h-[10vw] w-[70%]"
                                    {...appearTextAnimation}
                                >
                                    <div className="flex h-full w-[100%] flex-col items-center justify-center">
                                        {classification != undefined &&
                                            classification != "" &&
                                            dateRangeFormat(
                                                tournament.tournamentStartSubmissionDate,
                                                tournament.tournamentEndSubmissionDate,
                                                tournament.type
                                            )}
                                        {classification != undefined &&
                                            classification === "" && (
                                                <div className="flex flex-col items-center">
                                                    {dateFormat(
                                                        tournament.tournamentEndSubmissionDate,
                                                        tournament.type
                                                    )}
                                                    <p
                                                        className={`font-montserrat text-[2vw] ${tournament.type == "free" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"} ${timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0 ? "hidden" : ""}`}
                                                    >
                                                        Closes in{" "}
                                                        {`${formatTime(timeLeft.days)} : ${formatTime(timeLeft.hours)} : ${formatTime(timeLeft.minutes)} : ${formatTime(timeLeft.seconds)}`}
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[58.4vw] bg-loading">
                            <motion.div
                                className="relative"
                                {...pulseAnimation}
                            >
                                <img
                                    className="h-full w-full"
                                    src={TournamentSonner}
                                />
                            </motion.div>
                        </div>
                    )}
                    {classification != "PREVIOUS" ? <PointsSystem /> : ""}
                    {classification == "PREVIOUS" ? <Winners /> : ""}
                </div>
            )}
        </Layout>
    );
};
