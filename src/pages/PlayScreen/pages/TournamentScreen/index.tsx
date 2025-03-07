import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { Tournament, Ranking } from "../../../../helpers/interfaces";
import {
    getTournament,
    getTournamentResults,
} from "../../../../helpers/lambda.helper";
import {
    dateFormat,
    dateRangeFormat,
    isTournamentClosed,
    isTournamentUpcoming,
} from "../../../../hooks/dates";
import { Layout } from "../../../../components/Layout";
import { PointsSystem } from "../../components/PointsSystem";
import { Winners } from "../../components/Winners";

import TournamentSonner from "../../../../assets/sonner/tournament.svg";
import BasicTournamentBackground from "../../../../assets/background/tournament-basic.svg";
import PremiumTournamentBackground from "../../../../assets/background/tournament-premium.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import Closed from "../../../../assets/others/closed.svg";

const formatTime = (time: number) => String(time).padStart(2, "0");

export const TournamentScreen = () => {
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
    const [rankings, setRankings] = useState<Ranking[]>(null);
    const fetchTournament = async () => {
        try {
            const result = await getTournament(
                paramTournamentId,
                user.initDataRaw
            );
            setTournament(result);
        } catch (e) {
            setTournament(null);
        }
        setShowTournament(true);
    };

    const handleTournamentResults = async () => {
        try {
            const result = await getTournamentResults(
                paramTournamentId,
                user.initDataRaw
            );
            setRankings(result.rankings);
        } catch (e) {
            console.log("error");
        }
    };

    useEffect(() => {
        if (
            tournament != null &&
            classification != undefined &&
            classification === "" &&
            !tournament.resultsTallied
        ) {
            const calculateTimeLeft = () => {
                const now = new Date();
                const difference =
                    new Date(
                        isTournamentUpcoming(tournament)
                            ? tournament.tournamentStartSubmissionDate
                            : tournament.tournamentEndSubmissionDate
                    ).getTime() - now.getTime();
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
        } else if (
            tournament != null &&
            classification != undefined &&
            (classification === "PREVIOUS" || tournament.resultsTallied)
        ) {
            handleTournamentResults();
        }
    }, [tournament]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowTournament(true);
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        fetchTournament();
    }, []);

    return (
        <Layout>
            {tournament != null && (
                <div>
                    {showTournament ? (
                        <div
                            className={`h-[58.4vw] ${tournament.type == "basic" ? "" : "bg-graydark"}`}
                        >
                            <div className="relative flex justify-center">
                                <img
                                    className="h-full w-full"
                                    src={
                                        tournament.type == "basic"
                                            ? BasicTournamentBackground
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
                                <motion.div
                                    className="absolute top-[23vw] flex"
                                    {...appearTextAnimation}
                                >
                                    {tournament.type === "basic" ? (
                                        <img
                                            src={BattlePointsIcon}
                                            className="mr-[2vw] mt-[2.5vw] h-[7vw]"
                                        />
                                    ) : tournament.prizeCurrency === "stars" ? (
                                        <img
                                            src={TGStarIcon}
                                            className="mr-[2vw] mt-[2.5vw] h-[7vw]"
                                        />
                                    ) : (
                                        <p
                                            className={
                                                "text-nowrap font-russoone text-[9vw] font-normal text-white"
                                            }
                                        >
                                            {tournament.prizeCurrency === "php"
                                                ? "PHP"
                                                : ""}
                                            &nbsp;
                                        </p>
                                    )}
                                    <p
                                        className={`text-nowrap font-russoone text-[9vw] font-normal ${tournament.type == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3vw] text-transparent" : "text-white"}`}
                                    >
                                        {tournament.prizePool.toLocaleString()}
                                    </p>
                                </motion.div>
                                {classification != undefined &&
                                    classification == "" &&
                                    (isTournamentClosed(tournament) ||
                                        isTournamentUpcoming(tournament)) && (
                                        <motion.div
                                            className="absolute left-[11.8vw] top-[32vw] h-[10vw] w-[20vw]"
                                            {...slideRightTextAnimation}
                                        >
                                            <img
                                                className="h-full w-full"
                                                src={Closed}
                                            />
                                        </motion.div>
                                    )}
                                <motion.div
                                    className="absolute bottom-[7vw] flex h-[10vw] w-[70%]"
                                    {...appearTextAnimation}
                                >
                                    <div className="flex h-full w-[100%] flex-col items-center justify-center">
                                        {classification != undefined &&
                                            classification != "" && (
                                                <div className="flex flex-col items-center">
                                                    <div>
                                                        {dateRangeFormat(
                                                            tournament.tournamentStartSubmissionDate,
                                                            tournament.tournamentEndSubmissionDate,
                                                            tournament.type
                                                        )}
                                                    </div>
                                                    {
                                                        tournament != null &&
                                                        isTournamentClosed(tournament) &&
                                                        (
                                                            <p className={`font-montserrat text-[2.8vw] ${tournament.type == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"}`}>
                                                                {tournament.resultsTallied
                                                                    ? ""
                                                                    : "Calculating Results"}
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                        {classification != undefined &&
                                            classification === "" && (
                                                <div className="flex flex-col items-center">
                                                    <div>
                                                        {dateFormat(
                                                            isTournamentUpcoming(
                                                                tournament
                                                            )
                                                                ? tournament.tournamentStartSubmissionDate
                                                                : tournament.tournamentEndSubmissionDate,
                                                            tournament.type
                                                        )}
                                                    </div>
                                                    {
                                                        tournament != null &&
                                                        isTournamentClosed(tournament) ? 
                                                        (
                                                            <p className={`font-montserrat text-[2.8vw] ${tournament.type == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"}`}>
                                                                {tournament.resultsTallied
                                                                    ? ""
                                                                    : "Calculating Results"}
                                                            </p>
                                                        )
                                                        :
                                                        (
                                                            <p className={`font-montserrat text-[2.8vw] ${tournament.type == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"} ${timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0 ? "hidden" : ""}`}>
                                                                {isTournamentUpcoming(
                                                                    tournament
                                                                )
                                                                    ? "Opens in "
                                                                    : "Closes in "}
                                                                {`${formatTime(timeLeft.days)} : ${formatTime(timeLeft.hours)} : ${formatTime(timeLeft.minutes)} : ${formatTime(timeLeft.seconds)}`}
                                                            </p>
                                                        )
                                                        }
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
                    {
                        !tournament.resultsTallied ? (
                            <PointsSystem />
                        ) : (
                            ""
                        )}
                    {
                        tournament.resultsTallied ? (
                            <Winners rankings={rankings} tournament={tournament} />
                        ) : (
                            ""
                        )}
                </div>
            )}
        </Layout>
    );
};
