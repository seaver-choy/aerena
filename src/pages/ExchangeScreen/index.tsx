import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { StarterBanner } from "./components/StarterBanner";
import { MythicBanner } from "./components/MythicBanner";

export const ExchangeScreen = () => {
  return (
    <Layout>
      <Header />
      <StarterBanner />
      <MythicBanner />
    </Layout>
  );
};
