import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { getAthletes, getUserAthletesApi } from "../../helpers/lambda.helpers";
import { collectionOptions } from "../../helpers/tabs";
import { Collection } from "./components/Collection";

export const CollectionScreen = () => {
  const [collectionTab, setCollectionTab] = useState("Collection");
  const [athletes, setAthletes] = useState([]);
  const [userAthletes, setUserAthletes] = useState([]);
  const [tonConnectUI] = useTonConnectUI();

  const getAllAthletes = async () => {
    const athletesRes = await getAthletes();
    setAthletes(athletesRes)
  }

  const getUserAthletes = async () => {
    const res = await getUserAthletesApi(tonConnectUI.account?.address!);
    setUserAthletes(res);
  }

  useEffect(() => {
    if(!(athletes.length > 0)) {
      getAllAthletes()
    }
    if(!(userAthletes.length > 0)) {
      getUserAthletes()
    }
  },[])

  return (
    <Layout>
      <Header />
      <Tabs
        options={collectionOptions}
        onToggle={(selected) => {
          setCollectionTab(selected);
        }}
      />
      <Collection athletes={collectionTab == "Collection" ? userAthletes : athletes} showMintButton={collectionTab == "Collection" ? true : false}/>
    </Layout>
  );
};
