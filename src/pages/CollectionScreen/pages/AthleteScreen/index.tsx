import { useState } from "react";
import { athleteOptions } from "../../../../helpers/tabs";
import { Layout } from "../../../../components/Layout";
import { Tabs } from "../../../../components/Tabs";
import { AthleteHeader } from "../../components/AthleteHeader";
import { PlayerProfile } from "../../components/PlayerProfile";
import { LocalStats } from "../../components/LocalStats";
import { GlobalStats } from "../../components/GlobalStats";
import { CardSkins } from "../../components/CardSkins";

export const AthleteScreen = () => {
    const [athleteTab, setAthleteTab] = useState("Player Profile");

    return (
        <Layout>
            <AthleteHeader />
            <Tabs
                options={athleteOptions}
                onToggle={(selected) => {
                    setAthleteTab(selected);
                }}
                selectedTab={athleteTab}
            />
            {athleteTab === "Player Profile" && <PlayerProfile />}
            {athleteTab === "Local Stats" && <LocalStats />}
            {athleteTab === "Global Stats" && <GlobalStats />}
            {athleteTab === "Card Skins" && <CardSkins />}
        </Layout>
    );
};
