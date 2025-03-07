import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useUsers } from "../../../../hooks/useUser";
import {
    isTournamentClosed,
    isTournamentUpcoming,
} from "../../../../hooks/dates";
import { Tournament } from "../../../../helpers/interfaces";
import {
    getOngoingTournaments,
    getLatestPreviousTournament,
} from "../../../../helpers/lambda.helper";
import { getStickerImage } from "../../../../helpers/images";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { LeagueModal } from "../../modals/LeagueModal";

import TournamentSonner from "../../../../assets/sonner/tournament.svg";
import BasicTournamentBackground from "../../../../assets/background/tournament-basic.svg";
import PremiumTournamentBackground from "../../../../assets/background/tournament-premium.svg";
import ChangeIcon from "../../../../assets/icon/change-white.svg";
import ChangeGoldIcon from "../../../../assets/icon/change-gold.svg";
import TGStarIcon from "../../../../assets/icon/tg-star-white.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import Closed from "../../../../assets/others/closed.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import { sortList } from "../../../../helpers/athletes";

interface TournamentBannerProps {
    ongoingTournament: Tournament;
    setOngoingTournament: (tournament: Tournament) => void;
    showTournament: boolean;
    setShowTournament: (showTournament: boolean) => void;
    playTab: string;
}

const formatTime = (time: number) => String(time).padStart(2, "0");

export const TournamentBanner = ({
    ongoingTournament,
    setOngoingTournament,
    showTournament,
    setShowTournament,
    playTab,
}: TournamentBannerProps) => {
    const user = useUsers();
    const navigate = useNavigate();
    const [showLeagueModal, setShowLeagueModal] = useState<boolean>(false);
    const [ongoingTournaments, setOngoingTournaments] =
        useState<Tournament[]>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentTournamentType, setCurrentTournamentType] =
        useState<string>("basic");

    const fetchOngoingTournament = async () => {
        try {
            const result = await getOngoingTournaments(
                playTab.split(" ")[1], //current strings are Play Basic & Play Premium, hence the split
                user.initDataRaw
            );
            const sortedResult = sortList(result, user.country);
            setOngoingTournaments(sortedResult);
            if (result.length > 0) setOngoingTournament(sortedResult[0]);
            else {
                const previousTournamentResult =
                    await getLatestPreviousTournament(
                        playTab.split(" ")[1],
                        user.initDataRaw
                    );
                const sortedResult = sortList(previousTournamentResult, user.country);
                setOngoingTournaments(sortList(sortedResult, user.country));
                setOngoingTournament(sortedResult[0]);
            }
        } catch (e) {
            setOngoingTournaments(null);
            setOngoingTournament(null);
        }
        setShowTournament(true);
    };

    function formatDate(dateString) {
        const isoDate = new Date(dateString);
        const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
        const day = isoDate.getDate().toString().padStart(2, "0");
        const year = isoDate.getFullYear();
        const hours = isoDate.getHours();
        const minutes = isoDate.getMinutes().toString().padStart(2, "0");
        const ampm = isoDate.getHours() < 12 ? "AM" : "PM";

        const formattedHours = hours > 12 ? hours - 12 : hours;
        return (
            <p
                className={`font-montserrat text-[3vw] ${currentTournamentType == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3vw] text-transparent" : "text-white"}`}
            >
                {month}
                <span className="font-montagu">{" / "}</span>
                {day}
                <span className="font-montagu">{" / "}</span>
                {year}
                <span className="font-montagu">{" • "}</span>
                {formattedHours}:{minutes} {ampm}
            </p>
        );
    }

    const calculateTimeLeft = () => {
        const now = new Date();
        if (ongoingTournament != null) {
            const difference =
                new Date(
                    isTournamentUpcoming(ongoingTournament)
                        ? ongoingTournament.tournamentStartSubmissionDate
                        : ongoingTournament.tournamentEndSubmissionDate
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
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    const handleViewDetails = () => {
        if (ongoingTournament) {
            navigate(`/tournament/${ongoingTournament.tournamentId}`);
        }
    };

    useEffect(() => {
        setOngoingTournaments(null);
        setCurrentTournamentType(playTab.split(" ")[1].toLowerCase());
        fetchOngoingTournament();
    }, [playTab]);

    useEffect(() => {
        if (ongoingTournament != null) {
            const timer = setInterval(calculateTimeLeft);
            return () => clearInterval(timer);
        }
    }, [ongoingTournament]);

    const displayLeagueModal = () => {
        setShowLeagueModal(true);
    };

    const closeLeagueModal = () => {
        setShowLeagueModal(false);
    };

    return (
        <div>
            {ongoingTournament != null && showTournament ? (
                <div
                    className={`mt-[4vw] h-[58.4vw] ${currentTournamentType == "basic" ? "" : "bg-graydark"}`}
                >
                    <div className="relative flex justify-center">
                        <img
                            className="h-full w-full"
                            src={
                                currentTournamentType == "basic"
                                    ? BasicTournamentBackground
                                    : PremiumTournamentBackground
                            }
                        />
                        <motion.button
                            className="absolute right-[2vw] top-[2vw] h-[15vw] w-[15vw]"
                            onClick={displayLeagueModal}
                            disabled={
                                ongoingTournaments != null &&
                                ongoingTournaments.length < 2
                            }
                            {...appearAnimation}
                        >
                            <img
                                className="h-full w-full will-change-transform backface-hidden"
                                src={getStickerImage(ongoingTournament.league)}
                            />
                            {ongoingTournaments != null &&
                                ongoingTournaments.length > 1 && (
                                    <div className="relative flex">
                                        <img
                                            src={
                                                currentTournamentType == "basic"
                                                    ? ChangeGoldIcon
                                                    : ChangeIcon
                                            }
                                            className="absolute bottom-0 right-0 h-[4.5vw]"
                                        />
                                    </div>
                                )}
                        </motion.button>
                        {showLeagueModal && (
                            <LeagueModal
                                onClose={closeLeagueModal}
                                ongoingTournament={ongoingTournament}
                                ongoingTournaments={ongoingTournaments}
                                setOngoingTournament={setOngoingTournament}
                            />
                        )}
                        <motion.div
                            className="absolute top-[5vw] flex"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                {ongoingTournament.tournamentName}
                            </p>
                        </motion.div>
                        <motion.div
                            className="absolute top-[23vw] flex"
                            {...appearTextAnimation}
                        >
                            {currentTournamentType === "basic" ? (
                                <img
                                    src={BattlePointsIcon}
                                    className="mr-[2vw] mt-[2.8vw] h-[7vw]"
                                />
                            ) : ongoingTournament.prizeCurrency === "stars" ? (
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
                                    {ongoingTournament.prizeCurrency === "php"
                                        ? "PHP"
                                        : ""}
                                    &nbsp;
                                </p>
                            )}
                            <p
                                className={`text-nowrap font-russoone text-[9vw] font-normal ${currentTournamentType == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3vw] text-transparent" : "text-white"}`}
                            >
                                {ongoingTournament.prizePool.toLocaleString()}
                            </p>
                        </motion.div>
                        {ongoingTournament != null &&
                            (isTournamentClosed(ongoingTournament) ||
                                isTournamentUpcoming(ongoingTournament)) && (
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
                        <div className="absolute bottom-[7vw] flex h-[10vw] w-[70%]">
                            <motion.div
                                className="flex h-full w-[60%] flex-col items-start justify-center"
                                {...appearTextAnimation}
                            >
                                <div>
                                    {formatDate(
                                        isTournamentUpcoming(ongoingTournament)
                                            ? ongoingTournament.tournamentStartSubmissionDate
                                            : ongoingTournament.tournamentEndSubmissionDate
                                    )}
                                </div>
                                {ongoingTournament != null &&
                                isTournamentClosed(ongoingTournament) ? (
                                    <p
                                        className={`font-montserrat text-[2.8vw] ${currentTournamentType == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"}`}
                                    >
                                        {ongoingTournament.resultsTallied
                                            ? ""
                                            : "Calculating Results"}
                                    </p>
                                ) : (
                                    <p
                                        className={`font-montserrat text-[2.8vw] ${currentTournamentType == "basic" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-transparent" : "text-white"} ${timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0 ? "hidden" : ""}`}
                                    >
                                        {isTournamentUpcoming(ongoingTournament)
                                            ? "Opens in "
                                            : "Closes in "}
                                        {`${formatTime(timeLeft.days)} : ${formatTime(timeLeft.hours)} : ${formatTime(timeLeft.minutes)} : ${formatTime(timeLeft.seconds)}`}
                                    </p>
                                )}
                            </motion.div>
                            <motion.div
                                className="flex h-full w-[40%] items-center justify-end"
                                {...appearTextAnimation}
                            >
                                <button
                                    className="relative flex h-[7vw] justify-center"
                                    onClick={handleViewDetails}
                                >
                                    <img className="h-full" src={GoldButton} />
                                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                        <p className="mt-[0.2vw] font-russoone text-[2.6vw] font-normal text-white">
                                            View Details
                                        </p>
                                    </div>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-[4vw] h-[58.4vw] bg-loading">
                    <motion.div className="relative flex" {...pulseAnimation}>
                        <img className="h-full w-full" src={TournamentSonner} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
