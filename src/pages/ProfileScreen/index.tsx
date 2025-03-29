import { useState } from "react";
import { profileOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { ProfileHeader } from "./components/ProfileHeader";
import { Tabs } from "../../components/Tabs";
import { FriendsSection } from "./components/FriendsSection";
import { DreamTeamSection } from "./components/DreamTeamSection";

export const ProfileScreen = () => {
    const [profileTab, setProfileTab] = useState("Friends");

    return (
        <Layout>
            <ProfileHeader />
            <Tabs
                options={profileOptions}
                onToggle={(selected) => {
                    setProfileTab(selected);
                }}
                selectedTab={profileTab}
                disabled={true} //TODO: temporary
            />
            {profileTab === "Friends" && <FriendsSection />}
            {profileTab === "Favorites" && <DreamTeamSection />}
        </Layout>
    );
};
