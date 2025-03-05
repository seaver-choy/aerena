import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

import { appearAnimation } from "../../helpers/animation";

import StatsBackground from "../../assets/background/stats.svg";

interface Props {
    text: string;
    value: number;
    isTotal?: boolean;
    fromStats?: boolean;
    fromFullDetails?: boolean;
    noStats?: boolean;
}
export const StatsDisplay = ({
    text = "",
    value = 0,
    isTotal,
    fromStats,
    fromFullDetails,
    noStats,
}: Props) => {
    const mv = useMotionValue(0);
    const stat = useTransform(() =>
        isTotal ? mv.get().toFixed(0) : mv.get().toFixed(2)
    );

    useEffect(() => {
        const control = animate(mv, value, {
            duration: fromFullDetails ? 0 : 2,
        });

        return () => {
            control.stop();
        };
    }, [mv, value]);

    return (
        <motion.div
            className={`${fromStats ? "h-[13.14vw] w-[24vw]" : fromFullDetails ? "h-full w-[27vw]" : "h-full w-[21.5vw]"} overflow-hidden`}
            {...appearAnimation}
        >
            <div className="relative flex h-full w-full">
                <img
                    className="h-full w-full will-change-transform backface-hidden"
                    src={StatsBackground}
                />
                <div className="absolute flex h-full w-full flex-col items-center justify-center">
                    <p
                        className={`mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone ${fromFullDetails ? "text-[3.2vw]" : "text-[2.5vw]"} font-normal text-transparent will-change-transform backface-hidden`}
                    >
                        {text}
                    </p>
                    <motion.pre
                        className={`-mt-[1vw] font-russoone ${fromFullDetails ? "text-[5vw]" : "text-[4.5vw]"} font-normal text-white`}
                    >
                        {noStats ? "-" : stat}
                    </motion.pre>
                </div>
            </div>
        </motion.div>
    );
};
