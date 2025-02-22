import { Layout } from "../../components/Layout";
import { PointsBanner } from "./components/PointsBanner";
import { BasicBanner } from "./components/BasicBanner";

export const ExchangeScreen = () => {
    return (
        <Layout>
            <PointsBanner />
            <BasicBanner />
        </Layout>
    );
};
