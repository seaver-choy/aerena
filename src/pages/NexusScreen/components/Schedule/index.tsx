import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import { appearTextAnimation } from "../../../../helpers/animation";
import { ScheduleGroup, Team } from "../../../../helpers/interfaces";
import { getCountryCode, getCountryFull } from "../../../../helpers/utilities";
import {
    getActiveSchedules,
    getCountries,
    getFilteredLeaguesWithSchedule,
    getTeams,
} from "../../../../helpers/lambda.helper";
import { FunctionSection } from "../../../../components/FunctionSection";
import { TitleSection } from "../../../../components/TitleSection";
import { MatchBanner } from "../../../../components/MatchBanner";

export const Schedule = () => {
    const user = useUsers();
    const [scheduleGroups, setScheduleGroups] = useState<ScheduleGroup[]>(null);
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>(null);
    const [regions, setRegions] = useState<string[]>(null);
    const [chosenRegion, setChosenRegion] = useState<string>(null);
    const [scheduleIndex, setScheduleIndex] = useState<number>(0);
    const [teams, setTeams] = useState<Team[]>(null);

    const fetchInitialData = async () => {
        const regionsResult = await getCountries(user.initDataRaw);
        setRegions([/*"ALL",*/ ...regionsResult]);
        setChosenRegion(getCountryFull(user.country));
    };

    const updateRegions = async () => {
        setScheduleGroups(null);
        setTeams(null);
        const leaguesResult = await getFilteredLeaguesWithSchedule(
            getCountryCode(chosenRegion),
            user.initDataRaw
        );
        setLeagueTypes([/*"ALL",*/ ...leaguesResult]);
        setChosenLeagueType(leaguesResult[0]);
    };

    const updateScheduleGroups = async () => {
        const schedulesResult = await getActiveSchedules(
            chosenLeagueType,
            user.initDataRaw
        );
        const transformedGroups = schedulesResult.map((group) => ({
            league: group._id.league,
            week: group._id.week,
            schedules: group.schedules,
        }));
        setScheduleGroups(
            [...transformedGroups].sort((a, b) => a.week - b.week)
        );
        setScheduleIndex(0);
        const teamsResult = await getTeams(
            [chosenLeagueType],
            user.initDataRaw
        );
        setTeams(teamsResult);
    };

    const changeSchedule = async (index) => {
        setScheduleIndex(index);
    };

    useEffect(() => {
        if (chosenRegion != null) updateRegions();
    }, [chosenRegion]);

    useEffect(() => {
        if (chosenLeagueType != null) updateScheduleGroups();
    }, [chosenLeagueType]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div>
            <FunctionSection
                title="Filter Options"
                regions={regions}
                chosenRegion={chosenRegion}
                setChosenRegion={setChosenRegion}
                leagueTypes={leagueTypes}
                chosenLeagueType={chosenLeagueType}
                setChosenLeagueType={setChosenLeagueType}
                showRegionButton={true}
                showLeagueButton={true}
            />
            <div className="mx-[6vw] mt-[4vw] flex h-[8vw] flex-row gap-[1vw] overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none]">
                {scheduleGroups != null &&
                    scheduleGroups.map((group, index) => (
                        <button
                            key={index}
                            className={`items-center justify-center ${index == scheduleIndex ? "bg-graydark" : ""} px-[2vw]`}
                            onClick={() => changeSchedule(index)}
                        >
                            <motion.p
                                className={`text-nowrap font-russoone text-[3.5vw] ${index == scheduleIndex ? "text-white" : "text-gold"}`}
                                {...appearTextAnimation}
                            >
                                WEEK {group.week}
                            </motion.p>
                        </button>
                    ))}
            </div>
            {scheduleGroups != null &&
                scheduleGroups.map((group, index) => {
                    let dayNumber = 1;
                    let initialDay;
                    if (index === scheduleIndex) {
                        return group.schedules.map(
                            (schedule, scheduleIndex) => {
                                const oldDay =
                                    scheduleIndex === 0
                                        ? schedule.day
                                        : group.schedules[scheduleIndex - 1]
                                              .day;
                                const currentDay = schedule.day;
                                const isSameDay = oldDay == currentDay;
                                dayNumber =
                                    oldDay == currentDay
                                        ? dayNumber
                                        : dayNumber + 1;
                                initialDay = scheduleIndex === 0 ? true : false;
                                return (
                                    <div key={scheduleIndex}>
                                        {(initialDay || !isSameDay) && (
                                            <TitleSection
                                                title={`Day ${dayNumber}`}
                                            />
                                        )}
                                        <MatchBanner
                                            schedule={schedule}
                                            teams={teams}
                                        />
                                    </div>
                                );
                            }
                        );
                    }
                })}
        </div>
    );
};
