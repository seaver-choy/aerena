import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { Tabs } from "../../components/Tabs";
import { CollectionSection } from "./CollectionSection";
import { collectionOptions } from "../../helpers/tabs";

export const CollectionScreen = () => {
  const [collectionTab, setCollectionTab] = useState("Collection");

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
      <CollectionSection />
    </Layout>
  );
};
