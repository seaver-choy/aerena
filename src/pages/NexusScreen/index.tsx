import { useState } from "react";
import { nexusOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { Nexus } from "./components/Nexus";
import { Schedule } from "./components/Schedule";
import { Players } from "./components/Players";
import { Rankings } from "./components/Rankings";

export const NexusScreen = () => {
    const [nexusTab, setNexusTab] = useState("Nexus");

    return (
        <Layout>
            <Tabs
                options={nexusOptions}
                onToggle={(selected) => {
                    setNexusTab(selected);
                }}
                selectedTab={nexusTab}
            />
            {nexusTab === "Nexus" && <Nexus />}
            {nexusTab === "Schedule" && <Schedule />}
            {nexusTab === "Players" && <Players />}
            {nexusTab === "Rankings" && <Rankings />}
        </Layout>
    );
};
