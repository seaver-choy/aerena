import { useState, useEffect } from "react";
import { athleteOptions } from "../../../../helpers/tabs";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../components/Layout";
import { Tabs } from "../../../../components/Tabs";
import { AthleteHeader } from "../../components/AthleteHeader";
import { PlayerProfile } from "../../components/PlayerProfile";
import { LocalStats } from "../../components/LocalStats";
import { GlobalStats } from "../../components/GlobalStats";
import { CardSkins } from "../../components/CardSkins";

export const AthleteScreen = () => {
    const [athleteTab, setAthleteTab] = useState("Player Profile");
    const location = useLocation();
    const averageStats = location.state?.averageStats;
    const athlete = location.state?.athlete;

    return (
        <Layout>
            <AthleteHeader athlete={athlete} averageStats={averageStats} />
            <Tabs
                options={athleteOptions}
                onToggle={(selected) => {
                    setAthleteTab(selected);
                }}
                selectedTab={athleteTab}
            />
            {athleteTab === "Player Profile" && (
                <PlayerProfile athlete={athlete} />
            )}
            {athleteTab === "Local Stats" && <LocalStats />}
            {athleteTab === "Global Stats" && <GlobalStats />}
            {athleteTab === "Card Skins" && <CardSkins />}
        </Layout>
    );
};
