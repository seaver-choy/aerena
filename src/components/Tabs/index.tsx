import { useState } from "react";
import { motion } from "motion/react";
import { slideLeftAnimation } from "../../helpers/animation";

import BattlePointsIcon from "../../assets/icon/battle-points-gold.svg";
import TGStarsIcon from "../../assets/icon/tg-star-gold.svg";

interface TabsProps {
    options: string[];
    onToggle?: (selectedOption: string) => void;
    selectedTab: string;
    disabled?: boolean;
}
export const Tabs = ({
    options,
    onToggle,
    selectedTab,
    disabled = false,
}: TabsProps) => {
    const [selectedOption, setSelectedOption] = useState(selectedTab);

    const handleToggle = (option) => {
        if (!disabled) {
            setSelectedOption(option);
            if (onToggle) onToggle(option);
        }
    };

    return (
        <motion.div
            className="mx-[4vw] mt-[4vw] flex justify-center gap-[2vw] rounded-[2.5vw] bg-graydark p-[1.5vw] will-change-transform backface-hidden"
            {...slideLeftAnimation}
        >
            {options.map((option) => (
                <motion.div
                    key={option}
                    className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[2vw] p-[2vw] text-white ${
                        selectedOption === option
                            ? "bg-graylight"
                            : "opacity-20"
                    }`}
                    onClick={() => handleToggle(option)}
                >
                    {option === "Play Basic" && (
                        <img
                            className="mr-[1.5vw] mt-[0.5vw] h-[3.5vw]"
                            src={BattlePointsIcon}
                            alt=""
                        />
                    )}
                    {option === "Play Premium" && (
                        <img
                            className="mr-[1.5vw] h-[3.5vw]"
                            src={TGStarsIcon}
                            alt=""
                        />
                    )}
                    <p className="mt-[0.4vw] text-center font-russoone text-[3.5vw] font-normal leading-tight">
                        {option}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
};
