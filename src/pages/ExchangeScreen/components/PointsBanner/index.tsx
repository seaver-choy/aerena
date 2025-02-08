import { useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import {
    appearAnimation,
    slideUpAnimation,
} from "../../../../helpers/animation";

import PointsHeaderBackground from "../../../../assets/background/points-header.svg";
import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import InventoryIcon from "../../../../assets/icon/inventory.svg";

export const PointsBanner = () => {
    const user = useUsers();
    const count = useMotionValue(0);
    const amount = useTransform(count, (latest) => {
        const roundedValue = Math.round(latest);
        return roundedValue.toLocaleString("en-US");
    });

    useEffect(() => {
        if (user.id != 0) {
            const controls = animate(count, user.points, { duration: 2 });
            return () => controls.stop();
        }
    }, [user]);

    return (
        <div className="mt-[4vw] h-[19.8vw]">
            <div className="relative flex h-full w-full justify-center">
                <motion.div
                    className="h-[16vw] w-[90vw] rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                    {...slideUpAnimation}
                >
                    <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[6vw] py-[4vw]">
                        <div className="flex h-full w-[80%] items-center gap-[1.5vw]">
                            <motion.div {...appearAnimation}>
                                <img
                                    className="mb-[0.5vw] h-[6vw]"
                                    src={BattlePointsIcon}
                                />
                            </motion.div>
                            <motion.pre className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[6vw] font-extrabold text-transparent">
                                {amount}
                            </motion.pre>
                        </div>
                        <motion.button
                            className="flex h-full w-[20%] items-center justify-end"
                            disabled
                            {...appearAnimation}
                        >
                            <img className="h-[6vw]" src={InventoryIcon} />
                        </motion.button>
                    </div>
                </motion.div>
                <div className="absolute bottom-0 h-[9.6vw] w-[100vw]">
                    <img
                        className="h-full w-full"
                        src={PointsHeaderBackground}
                    />
                </div>
            </div>
        </div>
    );
};
