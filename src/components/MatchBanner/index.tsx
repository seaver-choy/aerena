import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    pulseAnimation,
} from "../../helpers/animation";
import { getBaseTeamColor } from "../../helpers/athletes";
import { ScheduleInfo, Team } from "../../helpers/interfaces";
import { matchDateFormat, matchTimeFormat } from "../../hooks/dates";
import { TeamCard } from "../TeamCard";

import MatchBackground from "../../assets/background/match.svg";
import MatchSonner from "../../assets/sonner/match.svg";
import MatchButton from "../../assets/button/match.svg";
import WinLeft from "../../assets/others/win-left.svg";
import WinRight from "../../assets/others/win-right.svg";
import LoseLeft from "../../assets/others/lose-left.svg";
import LoseRight from "../../assets/others/lose-right.svg";
import AerenaLogo from "../../assets/logo/aerena.svg";

interface MatchBannerProps {
    schedule: ScheduleInfo;
    teams: Team[];
    noButton?: boolean;
}

export const MatchBanner = ({
    schedule = null,
    teams = null,
    noButton = false,
}: MatchBannerProps) => {
    const navigate = useNavigate();
    const [showMatchBanner, setShowMatchBanner] = useState<boolean>(false);

    const handleViewDetails = () => {
        navigate(`/match`, {
            state: {
                schedule,
                teams,
            },
        });
    };

    useEffect(() => {
        setShowMatchBanner(false);
        if (schedule != null && teams != null)
            setTimeout(() => setShowMatchBanner(true), 500);
    }, [schedule, teams]);

    useEffect(() => {
        setTimeout(() => setShowMatchBanner(true), 500);
    }, []);

    return (
        schedule != null &&
        teams != null && (
            <div className={`${noButton ? "" : "mt-[4vw]"}`}>
                {showMatchBanner ? (
                    <div className="relative flex h-[42vw] w-full justify-center bg-graydark">
                        <img className="h-full w-full" src={MatchBackground} />
                        <div className="absolute top-[4vw] flex flex-col items-center">
                            <motion.div {...appearTextAnimation}>
                                <p className="text-nowrap font-russoone text-[5vw] font-normal text-white">
                                    Match {schedule.matchNumber}
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[0.5vw]"
                                {...appearTextAnimation}
                            >
                                <p className="text-nowrap font-russoone text-[2.6vw] font-normal text-white">
                                    {schedule.matchWeekName}
                                </p>
                            </motion.div>
                            <motion.div
                                className="mt-[2.2vw]"
                                {...appearTextAnimation}
                            >
                                {schedule.matchDate &&
                                    matchDateFormat(schedule.matchDate)}
                            </motion.div>
                            <motion.div
                                className="mt-[1.5vw] bg-graylight px-[1.5vw] py-[0.5vw]"
                                {...appearTextAnimation}
                            >
                                {schedule.matchDate &&
                                    matchTimeFormat(schedule.matchDate)}
                            </motion.div>
                            {noButton && (
                                <motion.div className="mt-[4vw] h-[6vw] w-[6vw]">
                                    <img
                                        className="h-full w-full"
                                        src={AerenaLogo}
                                    />
                                </motion.div>
                            )}
                        </div>
                        <motion.div
                            className="absolute left-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <TeamCard
                                color={
                                    teams.find(
                                        (team) => team.key === schedule.team1
                                    )?.colors ?? getBaseTeamColor()
                                }
                                team={schedule.team1}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-[12vw] left-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pl-[5vw]"
                            {...appearAnimation}
                        >
                            {Array.from({
                                length:
                                    Math.floor(schedule.boType / 2) +
                                    1 -
                                    schedule.score1,
                            }).map((_, index) => (
                                <img
                                    key={`lose-${schedule.team1}-${index}`}
                                    className={`${schedule.score1 < Math.floor(schedule.boType / 2) + 1 && index == 0 ? "" : "-ml-[2vw]"} h-full will-change-transform backface-hidden`}
                                    src={LoseLeft}
                                />
                            ))}
                            {Array.from({ length: schedule.score1 }).map(
                                (_, index) => (
                                    <img
                                        key={`win-${schedule.team1}-${index}`}
                                        className={`${schedule.score1 == Math.floor(schedule.boType / 2) + 1 && index == 0 ? "" : "-ml-[2vw]"} h-full will-change-transform backface-hidden`}
                                        src={WinLeft}
                                    />
                                )
                            )}
                        </motion.div>
                        <motion.div
                            className="absolute right-[6vw] top-[12vw] h-[10vw] w-[26vw] overflow-hidden"
                            {...appearAnimation}
                        >
                            <TeamCard
                                color={
                                    teams.find(
                                        (team) => team.key === schedule.team2
                                    )?.colors ?? getBaseTeamColor()
                                }
                                team={schedule.team2}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-[12vw] right-[6vw] flex h-[6vw] w-[26vw] justify-center overflow-hidden pr-[5vw]"
                            {...appearAnimation}
                        >
                            {Array.from({ length: schedule.score2 }).map(
                                (_, index) => (
                                    <img
                                        key={`win-${schedule.team2}-${index}`}
                                        className={`${schedule.score2 > 0 && index == 0 ? "" : "-ml-[2vw]"} h-full will-change-transform backface-hidden`}
                                        src={WinRight}
                                    />
                                )
                            )}
                            {Array.from({
                                length:
                                    Math.floor(schedule.boType / 2) +
                                    1 -
                                    schedule.score2,
                            }).map((_, index) => (
                                <img
                                    key={`lose-${schedule.team2}-${index}`}
                                    className={`${schedule.score2 == 0 && index == 0 ? "" : "-ml-[2vw]"} h-full will-change-transform backface-hidden`}
                                    src={LoseRight}
                                />
                            ))}
                        </motion.div>
                        {!noButton && (
                            <motion.div
                                className="absolute bottom-[3vw] flex"
                                {...appearTextAnimation}
                            >
                                <button
                                    className="relative flex h-[7vw] justify-center"
                                    onClick={handleViewDetails}
                                >
                                    <img className="h-full" src={MatchButton} />
                                    <div className="absolute flex h-full w-full items-center justify-center">
                                        <p className="font-russoone text-[2.8vw] font-normal text-white">
                                            View Details
                                        </p>
                                    </div>
                                </button>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="h-[42vw] bg-loading">
                        <motion.div className="relative" {...pulseAnimation}>
                            <img className="h-full w-full" src={MatchSonner} />
                        </motion.div>
                    </div>
                )}
            </div>
        )
    );
};
