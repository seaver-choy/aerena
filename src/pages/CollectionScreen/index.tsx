import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { getAthletes } from "../../helpers/lambda.helpers";
import { collectionOptions } from "../../helpers/tabs";
import { Collection } from "./components/Collection";

export const CollectionScreen = () => {
  const [collectionTab, setCollectionTab] = useState("Collection");
  const [athletes, setAthletes] = useState([]);


  const getAllAthletes = async () => {
    const athletesRes = await getAthletes();
    setAthletes(athletesRes)
  }

  useEffect(() => {
    if(!(athletes.length > 0)) {
      getAllAthletes()
    }
  })

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
      <Collection athletes={athletes}/>
    </Layout>
  );
};
