import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    pulseAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { Athlete, AthleteProfile } from "../../../../helpers/interfaces";
import { getAthleteProfile } from "../../../../helpers/lambda.helper";
import { DateTime } from "luxon";
import dobToAge from "dob-to-age";

import AthleteDetailsSonner from "../../../../assets/sonner/athlete-details.svg";
import AthleteDetailsBackground from "../../../../assets/background/athlete-details.svg";

interface Props {
    athlete: Athlete;
}
export const PlayerProfile = ({ athlete }: Props) => {
    const user = useUsers();
    const [showAthleteDetails, setShowAthleteDetails] = useState(false);
    const [athleteProfile, setAthleteProfile] = useState<AthleteProfile>();
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAthleteDetails(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        async function fetchAthleteProfile() {
            const res = await getAthleteProfile(
                athlete.athleteId,
                user.initDataRaw
            );
            setAthleteProfile(res.profile);
        }
        fetchAthleteProfile();
    }, []);

    return (
        <div className="mx-[4vw] mt-[8vw] flex flex-col gap-[2vw]">
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Player Name
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    {athleteProfile.name === undefined ||
                                    athleteProfile?.name === "N/A"
                                        ? "-"
                                        : athleteProfile.name}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Nationality
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    {athleteProfile.country === undefined ||
                                    athleteProfile.country === "N/A"
                                        ? "-"
                                        : athleteProfile.country}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Born
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    {athleteProfile.birthday === undefined ||
                                    athleteProfile.birthday === "N/A"
                                        ? "-"
                                        : DateTime.fromJSDate(
                                              new Date(athleteProfile.birthday)
                                          ).toLocaleString(DateTime.DATE_MED)}
                                    <span className="font-montagu">
                                        {athleteProfile.birthday ===
                                            undefined ||
                                        athleteProfile.birthday === "N/A"
                                            ? ""
                                            : " • "}
                                    </span>
                                    {athleteProfile.birthday === undefined ||
                                    athleteProfile.birthday === "N/A"
                                        ? ""
                                        : `${
                                              dobToAge(athleteProfile.birthday)
                                                  .count
                                          } years old`}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Status
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    -
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Role
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    {athleteProfile.latestPosition ===
                                        undefined ||
                                    athleteProfile.latestPosition === "N/A"
                                        ? "-"
                                        : athleteProfile.latestPosition}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Alternate IGNs
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    {athleteProfile.alternateIgns.length > 0
                                        ? (() => {
                                              return athleteProfile.alternateIgns.join(
                                                  ", "
                                              );
                                          })()
                                        : "-"}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
            {showAthleteDetails ? (
                <div className="h-[15.2vw]">
                    <div className="relative">
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsBackground}
                        />
                        <div className="absolute left-[6vw] top-[2vw] flex h-[11.2vw] w-[80vw] flex-col justify-center">
                            <motion.div {...slideRightTextAnimation}>
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                                    Experience
                                </p>
                            </motion.div>
                            <motion.div
                                className="-mt-[1vw]"
                                {...slideRightTextAnimation}
                            >
                                <p className="font-russoone text-[4.5vw] font-normal text-white">
                                    -
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[15.2vw] bg-loading">
                    <motion.div className="relative" {...pulseAnimation}>
                        <img
                            className="h-full w-full"
                            src={AthleteDetailsSonner}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};
