import { useEffect, useState } from "react";
import { FunctionSection } from "../../../../components/FunctionSection";
import { FeaturedSchedule } from "../FeaturedSchedule";
import {
    getLeagues,
    getNearestSchedules,
    getTeams,
} from "../../../../helpers/lambda.helper";
import { sortLeagues } from "../../../../helpers/athletes";
import { useUsers } from "../../../../hooks/useUser";
import { ScheduleGroup, Team } from "../../../../helpers/interfaces";

export const Nexus = () => {
    const user = useUsers();
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>(null);
    const [teams, setTeams] = useState<Team[]>(null);
    const [scheduleGroups, setScheduleGroups] = useState<ScheduleGroup[]>(null);
    const [filteredScheduleGroup, setFilteredScheduleGroup] =
        useState<ScheduleGroup>(null);

    const filterSchedules = () => {
        if (!scheduleGroups || !chosenLeagueType) return null;
        setFilteredScheduleGroup(
            scheduleGroups.find((group) => group.league === chosenLeagueType)
        );
    };

    const fetchData = async () => {
        const schedulesResult = await getNearestSchedules(
            leagueTypes,
            user.initDataRaw
        );
        const transformedGroups = schedulesResult.map((group) => ({
            league: group._id.league,
            week: group._id.week,
            schedules: group.schedules,
        }));
        setScheduleGroups(
            [...transformedGroups].sort((a, b) => b.week - a.week)
        );
        const teamsResult = await getTeams(leagueTypes, user.initDataRaw);
        setTeams(teamsResult);
        setChosenLeagueType(leagueTypes[0]);
    };

    useEffect(() => {
        async function fetchAllLeagueTypes() {
            const res = await getLeagues(user.initDataRaw);
            setLeagueTypes([...sortLeagues(res, user.country)]);
        }
        fetchAllLeagueTypes();
    }, []);

    useEffect(() => {
        if (scheduleGroups != null && chosenLeagueType != null)
            filterSchedules();
    }, [chosenLeagueType]);

    useEffect(() => {
        if (leagueTypes != null) fetchData();
    }, [leagueTypes]);

    return (
        scheduleGroups != null && (
            <div>
                <FunctionSection
                    title="Filter Options"
                    leagueTypes={leagueTypes}
                    chosenLeagueType={chosenLeagueType}
                    setChosenLeagueType={setChosenLeagueType}
                    showLeagueButton={true}
                />
                <FeaturedSchedule
                    scheduleGroup={filteredScheduleGroup}
                    teams={teams}
                />
            </div>
        )
    );
};
