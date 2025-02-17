// import { useState } from "react";
// import { friendsOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
// import { ProfileHeader } from "./components/ProfileHeader";
// import { Tabs } from "../../components/Tabs";
// import { DreamTeamSection } from "./components/DreamTeamSection";
// import { FriendsSection } from "./components/FriendsSection";
import Upgrading from "../../assets/others/upgrading.svg";

export const FriendsScreen = () => {
    // const [friendsTab, setFriendsTab] = useState("Favorites");

    return (
        <Layout>
            {/* <ProfileHeader />
            <Tabs
                options={friendsOptions}
                onToggle={(selected) => {
                    setFriendsTab(selected);
                }}
                selectedTab={friendsTab}
            />
            {friendsTab === "Friends" && <FriendsSection />}
            {friendsTab === "Favorites" && <DreamTeamSection />} */}
            <div className="flex h-full items-center justify-center">
                <img className="h-[80vw] w-[80vw]" src={Upgrading} />
            </div>
        </Layout>
    );
};
