import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";
import { Tournament } from "../../../../helpers/interfaces";
import { getStickerImage } from "../../../../helpers/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import { ImageSlider } from "../../../../components/ImageSlider";

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
    const [leagueSlide, setLeagueSlide] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);

    const handleSelect = () => {
        setOngoingTournament(ongoingTournaments[leagueSlide]);
        onClose();
    };

    const fetchImages = async () => {
        const leagueImages = await Promise.all(
            ongoingTournaments.map(async (tournament) => {
                return getStickerImage(tournament.league);
            })
        );
        setImages(leagueImages);
    };

    useEffect(() => {
        fetchImages();
        if (ongoingTournament != null)
            setLeagueSlide(
                ongoingTournaments.findIndex(
                    (tournament) =>
                        tournament.tournamentId ===
                        ongoingTournament.tournamentId
                )
            );
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
                        <motion.button
                            className="absolute right-0 top-0 h-[7vw] w-[7vw]"
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full w-full" src={CloseIcon} />
                        </motion.button>
                        <motion.div
                            className="mt-[4vw] flex h-[41.5vw] w-full flex-col justify-center"
                            {...appearAnimation}
                        >
                            <ImageSlider
                                images={images}
                                imageIndex={leagueSlide}
                                setImageIndex={setLeagueSlide}
                            />
                            <motion.div
                                className="self-center"
                                {...appearTextAnimation}
                            >
                                <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    {
                                        ongoingTournaments[leagueSlide]
                                            .tournamentName
                                    }
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                    {ongoingTournament != null &&
                    ongoingTournaments[leagueSlide].tournamentId ===
                        ongoingTournament.tournamentId ? (
                        <motion.div
                            className="relative flex h-full w-full justify-center"
                            {...appearTextAnimation}
                        >
                            <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                <p className="mt-[0.2vw] font-russoone text-[3.5vw] font-normal text-gold">
                                    Selected
                                </p>
                            </div>
                        </motion.div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
};
