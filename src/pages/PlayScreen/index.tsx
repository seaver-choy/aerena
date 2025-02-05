import { useEffect, useState } from "react";
import { tournamentOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { Title } from "../../components/Title";
import { TournamentBanner } from "./components/TournamentBanner";
import { TournamentSection } from "./components/TournamentSection";
import { LineupSection } from "./components/LineupSection";
import { PersonalLineup } from "./components/PersonalLineup";
import { Tournament } from "../../helpers/interfaces";

export const PlayScreen = () => {
    const [playTab, setPlayTab] = useState("Play Free");
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

    return (
        <>
            <Layout>
                <Tabs
                    options={tournamentOptions}
                    onToggle={(selected) => {
                        console.log("Selected Option:", selected);
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
                    <TournamentSection playTab={playTab} showTournament={showTournament}/>
                    <LineupSection
                        ongoingTournament={ongoingTournament}
                        updateLineup={handleUpdatePersonalLineup}
                        showTournament={showTournament}
                        playTab={playTab}
                    />
                    <Title title="My Lineups" showTitle={showTournament}/>
                    <PersonalLineup
                        key={keyRemount}
                        ongoingTournament={ongoingTournament}
                        showTournament={showTournament}
                        playTab={playTab}
                    />
                </div>
            </Layout>
        </>
    );
};
