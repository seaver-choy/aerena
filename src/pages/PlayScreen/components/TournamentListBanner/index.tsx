import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { Tournament } from "../../../../helpers/interfaces";
import { getStickerImage } from "../../../../helpers/packs";
import { dateRangeFormat } from "../../../../hooks/dateFormat";

import TournamentListSonner from "../../../../assets/sonner/tournament-list.svg";
import FreeTournamentListBackground from "../../../../assets/background/tournament-list-free.svg";
import PremiumTournamentListBackground from "../../../../assets/background/tournament-list-premium.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface TournamentListBannerProps {
    classification: string;
    tournament: Tournament;
}

export const TournamentListBanner = ({
    classification,
    tournament,
}: TournamentListBannerProps) => {
    const navigate = useNavigate();
    const [showTournament, setShowTournament] = useState(false);

    const handleViewDetails = () => {
        if (tournament) {
            navigate(`/tournament/${tournament.tournamentId}`, {
                state: { classification },
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTournament(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {showTournament ? (
                <div className="mx-[4vw] mt-[4vw] h-[30.6vw]">
                    <div className="relative flex justify-center bg-graydark">
                        <img
                            className="h-full w-full"
                            src={
                                tournament.type == "free"
                                    ? FreeTournamentListBackground
                                    :PremiumTournamentListBackground
                                }
                        />
                        <motion.div
                            className="absolute top-[0.3vw] flex"
                            {...appearTextAnimation}
                        >
                            <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                {classification}
                            </p>
                        </motion.div>
                        <motion.div
                            className="absolute right-[1vw] top-[1vw] h-[15vw] w-[15vw]"
                            {...appearAnimation}
                        >
                            <img
                                src={getStickerImage(tournament.league)}
                                className="h-full w-full"
                            />
                        </motion.div>
                        <motion.div
                            className="absolute top-[6vw] flex"
                            {...appearTextAnimation}
                        >
                            <p className="text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                {tournament.tournamentName}
                            </p>
                        </motion.div>
                        <motion.div
                            className="absolute top-[13vw] flex"
                            {...appearTextAnimation}
                        >
                            {dateRangeFormat(
                                tournament.tournamentStartSubmissionDate,
                                tournament.tournamentEndSubmissionDate,
                                tournament.type,
                            )}
                        </motion.div>
                        <motion.div
                            className="absolute bottom-[2.5vw] flex"
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
            ) : (
                <div className="mx-[4vw] mt-[4vw] h-[30.6vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={TournamentListSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
