import { motion } from "motion/react";
import { slideRightTextAnimation } from "../../../../helpers/animation";

import GoldLine from "../../../../assets/others/line-gold.svg";

interface Props {
    handleEdit: () => void;
    isTournamentClosed: boolean;
}
export const LineupTitle = ({ isTournamentClosed }: Props) => {
    return (
        <div className="absolute top-0 flex h-[20vw] w-full justify-center px-[4vw] pt-[6vw]">
            <div className="flex h-full w-[50%] items-center pl-[4vw]">
                <motion.p
                    className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent"
                    {...slideRightTextAnimation}
                >
                    Fantasy Lineup
                </motion.p>
            </div>
            <div
                className={`flex h-full w-[50%] items-center justify-end gap-[2vw] ${isTournamentClosed ? "opacity-50" : ""}`}
            ></div>
            <img className="absolute bottom-0 w-full" src={GoldLine}></img>
        </div>
    );
};
