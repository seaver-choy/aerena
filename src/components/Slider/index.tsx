import { useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";
import { appearAnimation } from "../../helpers/animation";
import { SameAthlete, TeamColor } from "../../helpers/interfaces";
import { getBaseTeamColor } from "../../helpers/athletes";
import { AthleteCard } from "../AthleteCard";

const buffer = 30;
const transition = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

interface Props {
    athletes: SameAthlete[];
    onCardIndexChange: (title: string) => void;
}

interface Cards {
    color: TeamColor;
    ign: string;
    opacity: {
        wave: string;
    };
    role: string;
    league: string;
    title: string;
    type: string;
}

export const Slider = ({ athletes, onCardIndexChange }: Props) => {
    //const [imageIndex, setImageIndex] = useState(0);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [cards, setCards] = useState<Cards[]>([]);
    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();
        if (x <= -buffer && cardIndex < cards.length - 1) {
            setCardIndex((pv) => pv + 1);
            onCardIndexChange(cards[cardIndex + 1].title);
        } else if (x >= buffer && cardIndex > 0) {
            setCardIndex((pv) => pv - 1);
            onCardIndexChange(cards[cardIndex - 1].title);
        }
    };

    useEffect(() => {
        if (athletes !== undefined && athletes.length > 0) {
            const baseCard = {
                color: getBaseTeamColor(),
                ign: athletes[0].player,
                opacity: { wave: getBaseTeamColor().wave },
                role: athletes[0].position[0],
                league: athletes[0].league,
                title: "BASIC SKIN",
                type: "default",
            };
            const skinCards = athletes.map((athlete) => {
                return {
                    color: athlete.teamData.colors,
                    ign: athlete.player,
                    opacity: { wave: athlete.teamData.colors.wave },
                    role: athlete.position[0],
                    league: athlete.league,
                    title: athlete.team,
                    type: "basic",
                };
            });
            setCards([baseCard, ...skinCards]);
        }
    }, []);

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
                {cards.map((card, index) => {
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
                            <AthleteCard
                                color={card.color}
                                ign={card.ign}
                                opacity={{ wave: card.opacity.wave }}
                                role={card.role}
                                league={card.league}
                                type={card.type}
                                id={index}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};
