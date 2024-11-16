import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { Tabs } from "../../components/Tabs";
import { QuestsSection } from "./components/QuestsSection";
import { questsOptions } from "../../helpers/tabs";

export const QuestsScreen = () => {
  const [questsTab, setQuestsTab] = useState("Weekly");

  console.log(questsTab);

  return (
    <Layout>
      <Header />
      <Tabs
        options={questsOptions}
        onToggle={(selected) => {
          console.log("Selected Option:", selected);
          setQuestsTab(selected);
        }}
      />
      <QuestsSection />
    </Layout>
  );
};
