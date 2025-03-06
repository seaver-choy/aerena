import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

import {
    appearAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";

import StatsBackground from "../../../../assets/background/stats.svg";
interface Props {
    text: string;
    value: number;
    isTotal?: boolean;
    noStats?: boolean;
}
export const FullDetails = ({
    text = "",
    value = 0,
    isTotal,
    noStats,
}: Props) => {
    const mv = useMotionValue(0);
    const stat = useTransform(() =>
        isTotal ? mv.get().toFixed(0) : mv.get().toFixed(2)
    );

    useEffect(() => {
        const control = animate(mv, value, {
            duration: 0,
        });

        return () => {
            control.stop();
        };
    }, [mv, value]);

    useEffect(() => {
        if (!noStats) {
            const control = animate(
                "pre",
                { scale: [0.8, 0.8, 1.05, 1] },
                {
                    duration: 0.3,
                    ease: [0.4, 0, 0.6, 1],
                    times: [0, 0.1, 0.8, 1],
                }
            );
            return () => {
                control.stop();
            };
        }
    }, [mv, value]);

    return (
        <motion.div
            className={`h-full w-[27vw] overflow-hidden`}
            {...appearAnimation}
        >
            <div className="relative flex h-full w-full">
                <img
                    className="h-full w-full will-change-transform backface-hidden"
                    src={StatsBackground}
                />
                <div className="absolute flex h-full w-full flex-col items-center justify-center">
                    <p
                        className={`mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.2vw] font-normal text-transparent will-change-transform backface-hidden`}
                    >
                        {text}
                    </p>
                    <motion.pre
                        id={"stat-value"}
                        className={`-mt-[1vw] font-russoone text-[5vw] font-normal text-white`}
                        {...appearTextAnimation}
                    >
                        {noStats ? "-" : stat}
                    </motion.pre>
                </div>
            </div>
        </motion.div>
    );
};
