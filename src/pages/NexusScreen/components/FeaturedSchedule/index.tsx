import { ScheduleGroup, Team } from "../../../../helpers/interfaces";
import { TitleSection } from "../../../../components/TitleSection";
import { MatchBanner } from "../MatchBanner";

interface FeaturedScheduleProps {
    scheduleGroup: ScheduleGroup;
    teams: Team[];
}

export const FeaturedSchedule = ({
    scheduleGroup = null,
    teams,
}: FeaturedScheduleProps) => {
    return (
        scheduleGroup != null && (
            <div>
                {scheduleGroup.schedules.map((schedule, scheduleIndex) => {
                    const oldDay =
                        scheduleIndex === 0
                            ? schedule.day
                            : scheduleGroup.schedules[scheduleIndex - 1].day;
                    const currentDay = schedule.day;
                    const isSameDay = oldDay == currentDay;
                    return (
                        <div key={scheduleIndex}>
                            {(scheduleIndex == 0 || !isSameDay) && (
                                <TitleSection title={`Day ${schedule.day}`} />
                            )}
                            <MatchBanner
                                week={schedule.week}
                                league={schedule.league}
                                schedule={schedule}
                                teams={teams}
                            />
                        </div>
                    );
                })}
            </div>
        )
    );
};
