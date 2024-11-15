import { useState } from "react";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { collectionOptions } from "../../helpers/tabs";
import { CollectionSection } from "./CollectionSection";

export const CollectionScreen = () => {
  const [setCollectionTab] = useState("Collection");

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
