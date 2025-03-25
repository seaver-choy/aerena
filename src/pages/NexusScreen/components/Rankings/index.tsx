import { useState } from "react";
import { rankingsOptions } from "../../../../helpers/tabs";
import { FunctionSection } from "../../../../components/FunctionSection";
import { Tabs } from "../../../../components/Tabs";
import { TitleSection } from "../../../../components/TitleSection";
import { RankLeaderboard } from "../RankLeaderboard";

export const Rankings = () => {
    const [rankingsTab, setRankingsTab] = useState("Kills");

    return (
        <div>
            <FunctionSection
                title="Filter Options"
                showRegionButton={true}
                showLeagueButton={true}
            />
            <Tabs
                options={rankingsOptions}
                onToggle={(selected) => {
                    setRankingsTab(selected);
                }}
                selectedTab={rankingsTab}
            />
            <TitleSection title="AVERAGES" />
            <RankLeaderboard />
            <TitleSection title="TOTALS" />
            <RankLeaderboard />
            <TitleSection title="GAME HIGH" />
            <RankLeaderboard />
        </div>
    );
};
