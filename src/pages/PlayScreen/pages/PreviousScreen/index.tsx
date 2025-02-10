import { useState, useEffect } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { useLocation } from "react-router-dom";
import { Tournament } from "../../../../helpers/interfaces";
import { getPreviousTournaments } from "../../../../helpers/lambda.helper";
import { Layout } from "../../../../components/Layout";
import { Title } from "../../../../components/Title";
import { TournamentListBanner } from "../../components/TournamentListBanner";

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
            {previousTournaments != null &&
                previousTournaments.map((tournament) => (
                    <TournamentListBanner
                        classification="PREVIOUS"
                        tournament={tournament}
                    />
                ))}
            {previousTournaments != null &&
                previousTournaments.length === 0 && (
                    <div className="mt-[30vh]">
                        <p className="items-center bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[5vw] font-bold text-transparent">
                            No Previous Tournaments
                        </p>
                        <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                            Please check again later.
                        </p>
                    </div>
                )}
        </Layout>
    );
};
