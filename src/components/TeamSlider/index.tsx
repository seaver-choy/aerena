import { motion, useMotionValue } from "motion/react";
import { appearAnimation } from "../../helpers/animation";
import { TeamProfile } from "../../helpers/interfaces";
import { TeamCard } from "../TeamCard";

const buffer = 30;
const transition = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

interface TeamSliderProps {
    teams: TeamProfile[];
    cardIndex: number;
    setCardIndex: (index: number) => void;
}

export const TeamSlider = ({ teams, cardIndex, setCardIndex }: TeamSliderProps) => {
    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -buffer && cardIndex < teams.length - 1) {
            setCardIndex(cardIndex + 1);
        } else if (x >= buffer && cardIndex > 0) {
            setCardIndex(cardIndex - 1);
        }
    };

    return (
        <motion.div
            className="relative flex h-full w-full justify-center overflow-hidden"
            {...appearAnimation}
        >
            <motion.div
                className="flex w-[60%] items-center"
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{ x: dragX }}
                animate={{ translateX: `-${cardIndex * 100}%` }}
                transition={transition}
                onDragEnd={onDragEnd}
            >
                {/* {images.map((imageSource, index) => (
                    <motion.div
                        key={index}
                        className="flex w-full shrink-0 justify-center"
                        animate={{
                            scale: imageIndex === index ? 0.95 : 0.8,
                            opacity: imageIndex === index ? 1 : 0.5,
                        }}
                        transition={transition}
                    >
                        <img
                            className="w-full"
                            src={imageSource}
                            draggable={false}
                        />
                    </motion.div>
                ))} */}
                {teams.map((teamProfile, index) => {
                    const teamColors = teamProfile.baseTeamColors;
                    return (
                        <motion.div
                            key={index}
                            className="flex h-full w-full shrink-0 justify-center"
                            animate={{
                                scale: cardIndex === index ? 0.95 : 0.8,
                                opacity: cardIndex === index ? 1 : 0.5,
                            }}
                            transition={transition}
                        >
                            <TeamCard
                                color={teamColors}
                                team={teamProfile.key}
                                opacity={{ wave: teamColors.wave }}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};
