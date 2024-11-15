import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { StarterBanner } from "./components/StarterBanner";
import { MythicBanner } from "./components/MythicBanner";
import { EpicBanner } from "./components/EpicBanner";
import { WarriorBanner } from "./components/WarriorBanner";

export const ExchangeScreen = () => {
  return (
    <Layout>
      <Header />
      <StarterBanner />
      <MythicBanner />
      <EpicBanner />
      <WarriorBanner />
    </Layout>
  );
};
