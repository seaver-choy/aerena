import { Layout } from "../../components/Layout";
import { PointsBanner } from "./components/PointsBanner";
import { ChoiceBanner } from "./components/ChoiceBanner";

export const ExchangeScreen = () => {
    return (
        <Layout>
            <PointsBanner />
            <ChoiceBanner />
        </Layout>
    );
};
