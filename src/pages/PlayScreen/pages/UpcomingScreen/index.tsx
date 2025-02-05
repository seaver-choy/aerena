import { Tournament } from "../../../../helpers/interfaces";
import { Layout } from "../../../../components/Layout";
import { Title } from "../../../../components/Title";
import { TournamentListBanner } from "../../components/TournamentListBanner";
import { getUpcomingTournaments } from "../../../../helpers/lambda.helper";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUser";

export const UpcomingScreen = () => {
    const user = useUsers();
    const location = useLocation();
    const playTab = location.state?.playTab;
    const [upcomingTournaments, setUpcomingTournaments] =
        useState<Tournament[]>(null);

    const fetchUpcomingTournaments = async () => {
        try {
            const result = await getUpcomingTournaments(
                playTab.split(" ")[1],
                user.initDataRaw
            );
            setUpcomingTournaments(result);
            console.log(result);
        } catch (e) {
            setUpcomingTournaments(null);
        }
    };

    useEffect(() => {
        fetchUpcomingTournaments();
    }, [playTab]);

    return (
        <Layout>
            <Title title="Upcoming Tournaments" />
            {upcomingTournaments != null &&
                upcomingTournaments.map((tournament) => (
                    <TournamentListBanner
                        classification="UPCOMING"
                        tournament={tournament}
                    />
                ))}
            {upcomingTournaments != null &&
                upcomingTournaments.length === 0 && (
                    <div className="mt-[30vh]">
                        <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-bold text-transparent">
                            No Upcoming Tournaments
                        </p>
                        <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                            Please check again later.
                        </p>
                    </div>
                )}
        </Layout>
    );
};
