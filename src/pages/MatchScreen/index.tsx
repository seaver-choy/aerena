import { useState } from "react";
import { matchOptions, gameOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { GameSummary } from "./GameSummary";
import { GameDetails } from "./GameDetails";

export const MatchScreen = () => {
    const [matchTab, setMatchTab] = useState("Game 1");
    const [gameTab, setGameTab] = useState("Summary");

    return (
        <Layout>
            <Tabs
                options={matchOptions}
                onToggle={(selected) => {
                    setMatchTab(selected);
                }}
                selectedTab={matchTab}
            />
            <Tabs
                options={gameOptions}
                onToggle={(selected) => {
                    setGameTab(selected);
                }}
                selectedTab={gameTab}
            />
            {gameTab === "Summary" && <GameSummary />}
            {gameTab === "Team 1" && <GameDetails />}
            {gameTab === "Team 2" && <GameDetails />}
        </Layout>
    );
};
