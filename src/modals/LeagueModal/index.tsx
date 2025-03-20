import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
    appearTextAnimation,
} from "../../helpers/animation";
import { getStickerImage } from "../../helpers/images";
import { ImageSlider } from "../../components/ImageSlider";

import SmallModal from "../../assets/modal/small.svg";
import GoldButton from "../../assets/button/gold.svg";
import CloseIcon from "../../assets/icon/close.svg";

interface LeagueModalProps {
    onClose: () => void;
    leagueTypes: string[];
    chosenLeagueType: string;
    setChosenLeagueType: (chosenLeagueTypes: string) => void;
}

export const LeagueModal = ({
    onClose,
    leagueTypes,
    chosenLeagueType,
    setChosenLeagueType,
}: LeagueModalProps) => {
    const [leagueSlide, setLeagueSlide] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);

    const handleSelect = () => {
        setChosenLeagueType(leagueTypes[leagueSlide]);
        onClose();
    };

    const fetchImages = async () => {
        const leagueImages = await Promise.all(
            leagueTypes.map(async (league) => {
                return getStickerImage(league);
            })
        );
        setImages(leagueImages);
    };

    useEffect(() => {
        fetchImages();
        if (chosenLeagueType != null)
            setLeagueSlide(
                leagueTypes.findIndex((item) => item === chosenLeagueType)
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
                                Catalog Filter
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
                            className="mt-[4vw] flex h-[41.5vw] w-full justify-center"
                            {...appearAnimation}
                        >
                            <ImageSlider
                                images={images}
                                imageIndex={leagueSlide}
                                setImageIndex={setLeagueSlide}
                            />
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            {chosenLeagueType != null &&
                            leagueTypes[leagueSlide] === chosenLeagueType ? (
                                <motion.div
                                    className="relative flex h-full w-full justify-center"
                                    {...appearTextAnimation}
                                >
                                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                        <p className="mt-[0.2vw] font-russoone text-[4vw] font-normal text-gray opacity-50">
                                            Selected
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.button
                                    className="relative flex h-full w-full justify-center"
                                    onClick={handleSelect}
                                    {...appearTextAnimation}
                                >
                                    <img className="h-full" src={GoldButton} />
                                    <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                        <p className="-mt-[0.2vw] font-russoone text-[3.2vw] font-normal text-white">
                                            Select
                                        </p>
                                    </div>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
