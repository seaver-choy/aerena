import { useState } from "react";
import { friendsOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { ProfileHeader } from "./components/ProfileHeader";
import { Tabs } from "../../components/Tabs";
import { DreamTeamSection } from "./components/DreamTeamSection";
import { FriendsSection } from "./components/FriendsSection";

export const FriendsScreen = () => {
    const [friendsTab, setFriendsTab] = useState("Favorites");

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
            {friendsTab === "Friends" && <FriendsSection />}
            {friendsTab === "Favorites" && <DreamTeamSection />}
        </Layout>
    );
};
