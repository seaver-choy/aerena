import { motion } from "motion/react";
import { slideRightAnimation } from "../../helpers/animation";
import DiamondIcon from "../../assets/icon/diamond.svg";

interface TitleProps {
    title: string;
    showTitle?: boolean;
}

export const Title = ({ title, showTitle = null }: TitleProps) => {
    return ((showTitle != null && showTitle) || showTitle == null) && (
        <motion.div
            className="mt-[10vw] flex items-center justify-center gap-[2vw]"
            {...slideRightAnimation}
        >
            <img className="h-[1.5vh]" src={DiamondIcon}></img>
            <p className="-mb-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
                {title}
            </p>
            <img className="h-[1.5vh]" src={DiamondIcon}></img>
        </motion.div>
    );
};
