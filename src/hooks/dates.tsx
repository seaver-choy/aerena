export function dateFormat(dateString, tournamentType = null) {
    const isoDate = new Date(dateString);
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const day = isoDate.getDate().toString().padStart(2, "0");
    const year = isoDate.getFullYear();
    const hours = isoDate.getHours();
    const minutes = isoDate.getMinutes().toString().padStart(2, "0");
    const ampm = isoDate.getHours() < 12 ? "AM" : "PM";

    const formattedHours = hours > 12 ? hours - 12 : hours;
    return (
        <p className={`font-montserrat text-[3vw] ${tournamentType != null && tournamentType == "free" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3vw] text-transparent" : "text-white"}`}>
            {month}
            <span className="font-montagu">{" / "}</span>
            {day}
            <span className="font-montagu">{" / "}</span>
            {year}
            <span className="font-montagu">{" • "}</span>
            {formattedHours}:{minutes} {ampm}
        </p>
    );
}

export function dateRangeFormat(date1, date2, tournamentType = null) {
    const startDate = new Date(date1);
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const startDay = startDate.getDate().toString().padStart(2, "0");
    const startYear = startDate.getFullYear();
    const endDate = new Date(date2);
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const endDay = endDate.getDate().toString().padStart(2, "0");
    const endYear = endDate.getFullYear();

    return (
        <p className={`font-montserrat text-[3vw] ${tournamentType != null && tournamentType == "free" ? "bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3vw] text-transparent" : "text-white"}`}>
            {startMonth}
            <span className="font-montagu">{" / "}</span>
            {startDay}
            <span className="font-montagu">{" / "}</span>
            {startYear}
            &nbsp;&nbsp;-&nbsp;&nbsp;
            {endMonth}
            <span className="font-montagu">{" / "}</span>
            {endDay}
            <span className="font-montagu">{" / "}</span>
            {endYear}
        </p>
    );
}

export function isTournamentClosed(tournament){
    if (tournament !== null) {
        if (
            Date.now() >
            new Date(
                tournament.tournamentEndSubmissionDate
            ).getTime()
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};
