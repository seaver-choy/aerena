import { Tournament } from "../../../../helpers/interfaces";
import { Layout } from "../../../../components/Layout";
import { Title } from "../../../../components/Title";
import { TournamentListBanner } from "../../components/TournamentListBanner";
import { getPreviousTournaments } from "../../../../helpers/lambda.helper";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUser";

export const PreviousScreen = () => {
    const user = useUsers();
    const location = useLocation();
    const playTab = location.state?.playTab;
    const [previousTournaments, setPreviousTournaments] =
        useState<Tournament[]>(null);
    const fetchPreviousTournaments = async () => {
        try {
            const result = await getPreviousTournaments(
                playTab.split(" ")[1],
                user.initDataRaw
            );
            setPreviousTournaments(result);
        } catch (e) {
            setPreviousTournaments(null);
        }
    };

    useEffect(() => {
        fetchPreviousTournaments();
    }, [playTab]);

    return (
        <Layout>
            {/* sample button for back, needs useNavigate above */}
            {/* <button onClick={() => navigate(-1)} className="text-black">Back</button> */}
            
            <Title title="Previous Tournaments" />
            {
                previousTournaments != null && (
                    previousTournaments.map((tournament) => (
                <TournamentListBanner classification="PREVIOUS" tournament={tournament} />
                ))
                )
            }
            {
                previousTournaments != null && previousTournaments.length === 0 && (
                    <p>No Previous Tournaments</p>
                )
            }
        </Layout>
    );
};
