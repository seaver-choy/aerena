import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { getQuests } from "../../../../helpers/lambda.helper";
import { questsOptions } from "../../../../helpers/tabs";
import { Layout } from "../../../../components/Layout";
import { Tabs } from "../../../../components/Tabs";
import { TasksSection } from "../../components/TaskSection";

export const QuestsScreen = () => {
    const [quests, setQuests] = useState(null);
    const [questsTab, setQuestsTab] = useState("Main");
    const user = useUsers();

    async function fetchQuests() {
        let result = await getQuests(user.initDataRaw);
        result = result.map((quest) => ({
            ...quest,
            isClaimable: false,
            isClaimed: false,
        }));
        setQuests(result);
    }

    useEffect(() => {
        fetchQuests();
    }, []);

    return (
        <Layout>
            <Tabs
                options={questsOptions}
                onToggle={(selected) => {
                    if (selected !== "Weekly")
                        //temporary
                        setQuestsTab(selected);
                }}
                selectedTab={questsTab}
            />
            <TasksSection questTab={questsTab} quests={quests} />
        </Layout>
    );
};
