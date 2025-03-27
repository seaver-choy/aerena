import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUser";
import { Tournament } from "../../helpers/interfaces";
import { tournamentOptions } from "../../helpers/tabs";
import UsernameModal from "../../components/UsernameModal";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { Title } from "../../components/Title";
import { TournamentBanner } from "./components/TournamentBanner";
import { TournamentSection } from "./components/TournamentSection";
import { LineupSection } from "./components/LineupSection";
import { PersonalLineup } from "./components/PersonalLineup";

export const PlayScreen = () => {
    const user = useUsers();
    const [playTab, setPlayTab] = useState("");
    const [showTournament, setShowTournament] = useState<boolean>(false);
    const [keyRemount, setKeyRemount] = useState<number>(0);
    const [ongoingTournament, setOngoingTournament] =
        useState<Tournament>(null);

    /*
        Runs after a successful lineup submission, in order to update Personal Lineups
    */
    const handleUpdatePersonalLineup = (ongoingTournament) => {
        // setTimeout(() => {
        //     console.log("Timeout");
        //     setKeyRemount(keyRemount + 1);
        // }, 1500);
        setKeyRemount(keyRemount + 1);
        setOngoingTournament(ongoingTournament);
    };

    useEffect(() => {
        setShowTournament(false);
    }, [playTab]);

    useEffect(() => {
        if (user.id != 0) {
            if (user.country == "PH") setPlayTab("Play Premium");
            else if (user.country == "ID") setPlayTab("Play Basic");
            else setPlayTab("Play Basic");
        }
    }, [user.country]);

    return (
        <>
            <Layout>
                {user.id != 0 && user.username == "" && playTab != "" && (
                    <UsernameModal />
                )}
                {user.id != 0 && user.username != "" && playTab != "" && (
                    <div>
                        <Tabs
                            options={tournamentOptions}
                            onToggle={(selected) => {
                                setPlayTab(selected);
                            }}
                            selectedTab={playTab}
                        />
                        <div>
                            <TournamentBanner
                                ongoingTournament={ongoingTournament}
                                setOngoingTournament={setOngoingTournament}
                                showTournament={showTournament}
                                setShowTournament={setShowTournament}
                                playTab={playTab}
                            />
                            <TournamentSection
                                playTab={playTab}
                                showTournament={showTournament}
                            />
                            <LineupSection
                                ongoingTournament={ongoingTournament}
                                updateLineup={handleUpdatePersonalLineup}
                                showTournament={showTournament}
                            />
                            <Title
                                title="My Lineups"
                                showTitle={showTournament}
                            />
                            <PersonalLineup
                                key={keyRemount}
                                ongoingTournament={ongoingTournament}
                                showTournament={showTournament}
                                playTab={playTab}
                            />
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
};
