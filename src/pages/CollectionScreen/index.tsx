import { useState } from "react";
import { collectionOptions } from "../../helpers/tabs";
import { Layout } from "../../components/Layout";
import { Tabs } from "../../components/Tabs";
import { Collection } from "./components/Collection";
import { Catalog } from "./components/Catalog";

export const CollectionScreen = () => {
    const [collectionTab, setCollectionTab] = useState("Catalog");

    return (
        <Layout>
            <Tabs
                options={collectionOptions}
                onToggle={(selected) => {
                    setCollectionTab(selected);
                }}
                selectedTab={collectionTab}
            />
            {collectionTab === "Collection" && <Collection />}
            {collectionTab === "Catalog" && <Catalog />}
        </Layout>
    );
};
