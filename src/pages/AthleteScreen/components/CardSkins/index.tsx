import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearCardEmptyAnimation,
    pulseAnimation,
} from "../../../../helpers/animation";
import { SameAthlete } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";

import AthleteSonner from "../../../../assets/sonner/athlete-silver.svg";

interface Props {
    sameAthletes: SameAthlete[];
}
export const CardSkins = ({ sameAthletes }: Props) => {
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCard(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="disable-scrollbar mx-[4vw] mt-[8vw] flex flex-row flex-wrap content-start gap-[2vw] overflow-y-auto pl-[2vw]">
            {sameAthletes?.map((athlete) => {
                return (
                    <>
                        {showCard ? (
                            <motion.div
                                className="h-[36.4vw] w-[28vw]"
                                {...appearCardEmptyAnimation} //TODO: Add differentiation between owned and unowned cards
                            >
                                <AthleteCard
                                    color={athlete.teamData.colors}
                                    ign={athlete.player}
                                    opacity={{
                                        wave: athlete.teamData.colors.wave,
                                    }}
                                    role={athlete.position[0]}
                                    type={"basic"}
                                    league={athlete.league}
                                />
                            </motion.div>
                        ) : (
                            <div className="h-[36.4vw] w-[28vw]">
                                <motion.div
                                    className="relative"
                                    {...pulseAnimation}
                                >
                                    <img
                                        className="h-full w-full"
                                        src={AthleteSonner}
                                    ></img>
                                </motion.div>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
};
