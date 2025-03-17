import { useState } from "react";
import { useLocation } from "react-router-dom";
import { athleteOptions } from "../../../../helpers/tabs";
import { Layout } from "../../../../components/Layout";
import { Tabs } from "../../../../components/Tabs";
import { AthleteHeader } from "../../components/AthleteHeader";
import { PlayerProfile } from "../../components/PlayerProfile";
import { StatsSection } from "../../components/StatsSection";
import { CardSkins } from "../../components/CardSkins";

export const AthleteScreen = () => {
    const [athleteTab, setAthleteTab] = useState("Player Profile");
    const location = useLocation();
    // const averageStats = location.state?.averageStats;
    const athlete = location.state?.athlete;
    const sameAthletes = location.state?.sameAthletes;

    const [resetLocal, setResetLocal] = useState<boolean>(false);
    const [resetGlobal, setResetGlobal] = useState<boolean>(false);

    const handleResetLocal = () => {
        setResetLocal(false);
    };
    const handleResetGlobal = () => {
        setResetGlobal(false);
    };
    return (
        <Layout>
            <AthleteHeader athlete={athlete} />
            <Tabs
                options={athleteOptions}
                onToggle={(selected) => {
                    setAthleteTab(selected);
                    if (selected === "Local Stats") setResetLocal(true);
                    if (selected === "Global Stats") setResetGlobal(true);
                }}
                selectedTab={athleteTab}
            />
            {athleteTab === "Player Profile" && (
                <PlayerProfile athlete={athlete} />
            )}
            {athleteTab === "Local Stats" && (
                <StatsSection
                    athlete={athlete}
                    sameAthletes={sameAthletes.filter(
                        (athlete) => athlete.type === "regional"
                    )}
                    reset={resetLocal}
                    handleReset={handleResetLocal}
                    competitionType={"regional"}
                />
            )}
            {athleteTab === "Global Stats" && (
                <StatsSection
                    athlete={athlete}
                    sameAthletes={sameAthletes.filter(
                        (athlete) => athlete.type === "international"
                    )}
                    reset={resetGlobal}
                    handleReset={handleResetGlobal}
                    competitionType={"international"}
                />
            )}
            {athleteTab === "Card Skins" && (
                <CardSkins sameAthletes={sameAthletes} />
            )}
        </Layout>
    );
};
