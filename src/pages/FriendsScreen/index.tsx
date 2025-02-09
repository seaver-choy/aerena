import { useState } from "react";
import { friendsOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { ProfileHeader } from "./components/ProfileHeader";
import { Tabs } from "../../components/Tabs";
import { DreamTeamSection } from "./components/DreamTeamSection";

export const FriendsScreen = () => {
    const [friendsTab, setFriendsTab] = useState("Dream Team");

    return (
        <Layout>
            <ProfileHeader />
            <Tabs
                options={friendsOptions}
                onToggle={(selected) => {
                    setFriendsTab(selected);
                }}
                selectedTab={friendsTab}
            />
            <DreamTeamSection />
        </Layout>
    );
};
