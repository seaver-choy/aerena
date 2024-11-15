import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { Tabs } from "../../components/Tabs";
import { Collection } from "./components/Collection";
import { collectionOptions } from "../../helpers/tabs";
import { AthleteModal } from "./modals/AthleteModal";

export const CollectionScreen = () => {
  const [collectionTab, setCollectionTab] = useState("Collection");
  const [showAthleteModal, setShowAthleteModal] = useState<boolean>(false);

  const closeAthleteModal = () => {
    setShowAthleteModal(false);
  };

  const openAthleteModal = () => {
    setShowAthleteModal(true);
  };

  return (
    <Layout>
      <Header />
      <Tabs
        options={collectionOptions}
        onToggle={(selected) => {
          console.log("Selected Option:", selected);
          setCollectionTab(selected);
        }}
      />
      <Collection />
    </Layout>
  );
};
