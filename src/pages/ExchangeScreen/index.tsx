import { Layout } from "../../components/Layout";
import { PointsBanner } from "./components/PointsBanner";
import { BasicBanner } from "./components/BasicBanner";
import { ChoiceBanner } from "./components/ChoiceBanner";

export const ExchangeScreen = () => {
    return (
        <Layout>
            <PointsBanner />
            <ChoiceBanner />
            <BasicBanner />
        </Layout>
    );
};
