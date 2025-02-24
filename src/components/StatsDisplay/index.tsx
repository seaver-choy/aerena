import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

import {
    appearAnimation,
    appearCardAnimation,
    pulseAnimation,
    slideRightTextAnimation,
} from "../../helpers/animation";

import StatsBackground from "../../assets/background/stats.svg";

interface Props {
    statText: string;
    statValue: number;
}
export const StatsDisplay = ({ statText, statValue }: Props) => {
    const mv = useMotionValue(0);

    const stat = useTransform(() => mv.get().toFixed(2));

    useEffect(() => {
        const control = animate(mv, statValue, {
            duration: 2,
        });

        return () => {
            control.stop();
        };
    }, []);

    return (
        <motion.div className="h-full w-[21.5vw]" {...appearAnimation}>
            <div className="relative flex h-full w-full">
                <img className="h-full w-full" src={StatsBackground} />
                <div className="absolute flex h-full w-full flex-col items-center justify-center">
                    <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                        {statText}
                    </p>
                    <motion.pre className="-mt-[1vw] font-russoone text-[4.5vw] font-normal text-white">
                        {stat}
                    </motion.pre>
                </div>
            </div>
        </motion.div>
    );
};
