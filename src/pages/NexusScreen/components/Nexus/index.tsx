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
import { Loading } from "../../../../components/Loading";

export const Nexus = () => {
    const user = useUsers();
    const [leagueTypes, setLeagueTypes] = useState<string[]>(null);
    const [chosenLeagueType, setChosenLeagueType] = useState<string>(null);
    const [teams, setTeams] = useState<Team[]>(null);
    const [scheduleGroup, setScheduleGroup] = useState<ScheduleGroup>(null);

    const fetchData = async () => {
        const schedulesResult = await getNearestSchedules(
            chosenLeagueType,
            user.initDataRaw
        );
        const transformedGroups = schedulesResult.map((group) => ({
            league: group._id.league,
            week: group._id.week,
            schedules: group.schedules,
        }));
        setScheduleGroup([...transformedGroups][0]);
        const teamsResult = await getTeams(leagueTypes, user.initDataRaw);
        setTeams(teamsResult);
    };

    useEffect(() => {
        async function fetchAllLeagueTypes() {
            const res = await getLeagues(user.initDataRaw);
            const sortedLeagues = [...sortLeagues(res, user.country)];
            setLeagueTypes(sortedLeagues);
            setChosenLeagueType(sortedLeagues[0]);
        }
        fetchAllLeagueTypes();
    }, []);

    useEffect(() => {
        if (scheduleGroup != null && chosenLeagueType != null) fetchData();
    }, [chosenLeagueType]);

    useEffect(() => {
        if (leagueTypes != null) fetchData();
    }, [leagueTypes]);

    return (
        <div>
            <FunctionSection
                title="Filter Options"
                leagueTypes={leagueTypes}
                chosenLeagueType={chosenLeagueType}
                setChosenLeagueType={setChosenLeagueType}
                showLeagueButton={true}
            />
            {scheduleGroup != null ? (
                <FeaturedSchedule scheduleGroup={scheduleGroup} teams={teams} />
            ) : (
                <div className="mt-[25vh] flex items-center justify-center">
                    <Loading />
                </div>
            )}
        </div>
    );
};
