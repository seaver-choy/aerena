import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Tournament } from "../../../../helpers/interfaces";
import { getStickerImage } from "../../../../helpers/packs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface LeagueModalProps {
    onClose: () => void;
    ongoingTournament: Tournament;
    ongoingTournaments: Tournament[];
    setOngoingTournament: (tournament: Tournament) => void;
}

export const LeagueModal = ({
    onClose,
    ongoingTournament,
    ongoingTournaments,
    setOngoingTournament,
}: LeagueModalProps) => {
    const sliderRef = useRef(null);
    const [leagueSlide, setLeagueSlide] = useState<number>(
        ongoingTournaments.findIndex(
            (tournament) =>
                tournament.tournamentId === ongoingTournament?.tournamentId
        )
    );
    const settings = {
        centerMode: true,
        centerPadding: "20%",
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        afterChange: (index: number) => {
            setLeagueSlide(index);
        },
        initialSlide: leagueSlide,
    };

    const handleSelect = () => {
        const selectedTournament = ongoingTournaments[leagueSlide];
        console.log("Selected tournament:", selectedTournament);
        console.log("League slide:", leagueSlide);
        setOngoingTournament(ongoingTournaments[leagueSlide]);
        onClose();
    };

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
                    className="absolute z-40 h-[82.5vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={SmallModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col justify-center">
                    <div className="mb-[4vw] flex h-[55vw] flex-col items-center justify-center px-[4vw]">
                        <motion.div
                            className="mt-[4vw] flex h-[5.5vw] flex-row gap-[2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                                Select Tournament
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[4vw] flex h-[41.5vw] w-full justify-center"
                            {...appearAnimation}
                        >
                            <Slider
                                ref={(slider) => (sliderRef.current = slider)}
                                className="w-full"
                                {...settings}
                            >
                                {ongoingTournaments.map((tournament) => (
                                    <div
                                        key={tournament.tournamentId}
                                        className="mt-[7vw] h-full px-[2vw]"
                                    >
                                        <img
                                            className="w-full"
                                            src={getStickerImage(
                                                tournament.league
                                            )}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleSelect}
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
