import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { TasksSection } from "./components/TasksSection";
import { questsOptions } from "../../helpers/tabs";

export const QuestsScreen = () => {
    const [questsTab, setQuestsTab] = useState("Main");
    return (
        <Layout>
            <Tabs
                options={questsOptions}
                onToggle={(selected) => {
                    setQuestsTab(selected);
                }}
                selectedTab={questsTab}
            />
            <TasksSection />
        </Layout>
    );
};
