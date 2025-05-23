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
    fromMatchScreen?: boolean;
    fromGameTeamStats?: boolean;
    fromRankings?: boolean;
    noStats?: boolean;
}
export const StatsDisplay = ({
    text = "",
    value = 0,
    isTotal,
    fromStats,
    fromFullDetails,
    fromMatchScreen,
    fromGameTeamStats,
    fromRankings,
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

    useEffect(() => {
        if (!noStats && fromFullDetails) {
            const control = animate(
                "main",
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
            className={`${fromMatchScreen ? "mt-[4.4vw] h-[17.5vw] w-[32vw]" : fromStats || fromGameTeamStats ? "h-[13.14vw] w-[24vw]" : fromRankings ? "w-[20vw h-[11vw]" : fromFullDetails ? "h-full w-[27vw]" : "h-full w-[21.5vw]"} overflow-hidden`}
            {...appearAnimation}
        >
            <div className="relative flex h-full w-full">
                <img
                    className="h-full w-full will-change-transform backface-hidden"
                    src={StatsBackground}
                />
                <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden">
                    <p
                        className={`${fromRankings ? "mt-[1.2vw]" : "mt-[0.8vw]"} bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone ${fromMatchScreen ? "text-[3.5vw]" : fromRankings ? "text-[2vw]" : fromFullDetails ? "text-[3.2vw]" : "text-[2.5vw]"} font-normal text-transparent will-change-transform backface-hidden`}
                    >
                        {text}
                    </p>
                    {fromFullDetails ? (
                        <motion.main
                            id={"stat-value"}
                            className={`${fromMatchScreen ? "-mt-[1.5vw]" : "-mt-[1vw]"} font-russoone ${fromMatchScreen ? "text-[5.5vw]" : "text-[5vw]"} font-normal ${(text === "POINTS" || text === "PPG") && !fromRankings ? "text-goldlight" : "text-white"}`}
                        >
                            {noStats ? "-" : stat}
                        </motion.main>
                    ) : (
                        <motion.pre
                            id={"stat-value"}
                            className={`${fromMatchScreen ? "-mt-[1.5vw]" : "-mt-[1vw]"} font-russoone ${fromMatchScreen ? "text-[5.5vw]" : fromRankings ? "text-[4.2vw]" : fromFullDetails ? "text-[5vw]" : "text-[4.5vw]"} font-normal ${(text === "POINTS" || text === "PPG") && !fromRankings ? "text-goldlight" : "text-white"}`}
                        >
                            {noStats ? "-" : stat}
                        </motion.pre>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
