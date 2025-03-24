import { useState } from "react";
import { rankingsOptions } from "../../../../helpers/tabs";
import { FunctionSection } from "../../../../components/FunctionSection";
import { Tabs } from "../../../../components/Tabs";
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
            <RankLeaderboard category="KILLS" subCategory="AVERAGES" />
            <RankLeaderboard category="KILLS" subCategory="TOTALS" />
            <RankLeaderboard category="KILLS" subCategory="IN A GAME" />
        </div>
    );
};
