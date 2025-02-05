import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { slideUpAnimation } from "../../../../helpers/animation";

import LeftIcon from "../../../../assets/icon/left-white.svg";
import RightIcon from "../../../../assets/icon/right-white.svg";

interface TournamentSectionProps {
    playTab: string;
    showTournament: boolean;
}

export const TournamentSection = ({
    playTab,
    showTournament,
}: TournamentSectionProps) => {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate(`/previous`, { state: { playTab } });
    };

    const handleUpcoming = () => {
        navigate(`/upcoming`, { state: { playTab } });
    };

    return (
        showTournament && (
            <div className="mx-[4vw] mt-[4vw] flex flex-row gap-[2vw]">
                <motion.button
                    className="flex h-[12vw] w-full rounded-[2.5vw] bg-gray px-[2vw]"
                    onClick={handlePrevious}
                    {...slideUpAnimation}
                >
                    <div className="flex h-full w-[20%] items-center justify-center">
                        <img src={LeftIcon} className="h-[4vw]" />
                    </div>
                    <div className="flex h-full w-[80%] flex-col items-center justify-center gap-[-10%]">
                        <p className="font-russoone text-[3.5vw] text-white">
                            Previous
                        </p>
                        <p className="-mt-[1vw] font-russoone text-[2.5vw] text-white">
                            Tournaments
                        </p>
                    </div>
                </motion.button>
                <motion.button
                    className="flex h-[12vw] w-full rounded-[2.5vw] bg-gray px-[2vw]"
                    onClick={handleUpcoming}
                    {...slideUpAnimation}
                >
                    <div className="flex h-full w-[80%] flex-col items-center justify-center">
                        <p className="font-russoone text-[3.5vw] text-white">
                            Upcoming
                        </p>
                        <p className="-mt-[1vw] font-russoone text-[2.5vw] text-white">
                            Tournaments
                        </p>
                    </div>
                    <div className="flex h-full w-[20%] items-center justify-center">
                        <img src={RightIcon} className="h-[4vw]" />
                    </div>
                </motion.button>
            </div>
        )
    );
};
