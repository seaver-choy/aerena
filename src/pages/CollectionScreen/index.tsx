import { Layout } from "../../components/Layout";
import { TitleSection } from "../../components/TitleSection";
import { FunctionSection } from "../../components/FunctionSection";
import { Collection } from "./components/Collection";

export const CollectionScreen = () => {
    return (
        <Layout>
            <TitleSection title="Collection" />
            {/* <Tabs
                options={collectionOptions}
                onToggle={(selected) => {
                    setCollectionTab(selected);
                }}
                selectedTab={collectionTab}
            />
            {collectionTab === "Collection" && <Collection />}
            {collectionTab === "Catalog" && <Catalog />} */}
            <FunctionSection title="My Skins" showBuyButton={true} />
            <Collection />
        </Layout>
    );
};
