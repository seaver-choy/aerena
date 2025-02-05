import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    appearCardAnimation,
    appearCardEmptyAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { AthleteCard } from "../../../../components/AthleteCard";

import AthleteSonner from "../../../../assets/sonner/athlete-silver.svg";

export const CardSkins = () => {
    const [showCard, setShowCard] = useState(false);

    const athlete = {
        ign: "KELRA",
        role: "Gold",
    };

    const team = {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };

    const ign = athlete.ign;
    const role = athlete.role;

    const color = {
        main: team.main,
        light: team.light,
        dark: team.dark,
        accent: team.accent,
        details: team.details,
        wave: team.wave,
    };

    const opacity = {
        wave: team.wave,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCard(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="disable-scrollbar mx-[4vw] mt-[8vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
            {showCard ? (
                <motion.div
                    className="h-[36.4vw] w-[28vw]"
                    {...appearCardEmptyAnimation}
                >
                    <AthleteCard
                        color={color}
                        ign={ign}
                        opacity={opacity}
                        role={role}
                    />
                </motion.div>
            ) : (
                <div className="h-[36.4vw] w-[28vw]">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full w-full" src={AthleteSonner} />
                    </motion.div>
                </div>
            )}
            {showCard ? (
                <motion.div
                    className="h-[36.4vw] w-[28vw]"
                    {...appearCardAnimation}
                >
                    <AthleteCard
                        color={color}
                        ign={ign}
                        opacity={opacity}
                        role={role}
                    />
                </motion.div>
            ) : (
                <div className="h-[36.4vw] w-[28vw]">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full w-full" src={AthleteSonner} />
                    </motion.div>
                </div>
            )}
            {showCard ? (
                <motion.div
                    className="h-[36.4vw] w-[28vw]"
                    {...appearCardEmptyAnimation}
                >
                    <AthleteCard
                        color={color}
                        ign={ign}
                        opacity={opacity}
                        role={role}
                    />
                </motion.div>
            ) : (
                <div className="h-[36.4vw] w-[28vw]">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img className="h-full w-full" src={AthleteSonner} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
