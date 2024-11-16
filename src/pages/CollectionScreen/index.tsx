import { useState } from "react";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { Collection } from "./components/Collection";
import { collectionOptions } from "../../helpers/tabs";

export const CollectionScreen = () => {
  const [collectionTab, setCollectionTab] = useState("Collection");

  console.log(collectionTab);

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
