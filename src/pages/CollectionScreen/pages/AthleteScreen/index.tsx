import { useState } from "react";
import { athleteOptions } from "../../../../helpers/tabs";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../components/Layout";
import { Tabs } from "../../../../components/Tabs";
import { AthleteHeader } from "../../components/AthleteHeader";
import { PlayerProfile } from "../../components/PlayerProfile";
import { Stats } from "../../components/Stats";
import { CardSkins } from "../../components/CardSkins";

export const AthleteScreen = () => {
    const [athleteTab, setAthleteTab] = useState("Player Profile");
    const location = useLocation();
    // const averageStats = location.state?.averageStats;
    const athlete = location.state?.athlete;
    const sameAthletes = location.state?.sameAthletes;
    return (
        <Layout>
            <AthleteHeader athlete={athlete} />
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
            {athleteTab === "Local Stats" && (
                <Stats
                    athlete={athlete}
                    sameAthletes={sameAthletes.filter(
                        (athlete) => athlete.type === "regional"
                    )}
                    competitionType={"regional"}
                />
            )}
            {athleteTab === "Global Stats" && (
                <Stats
                    athlete={athlete}
                    sameAthletes={sameAthletes.filter(
                        (athlete) => athlete.type === "international"
                    )}
                    competitionType={"international"}
                />
            )}
            {athleteTab === "Card Skins" && (
                <CardSkins sameAthletes={sameAthletes} />
            )}
        </Layout>
    );
};
