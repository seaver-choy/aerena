import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { TournamentBanner } from "./components/TournamentBanner";
import { LineupSection } from "./components/LineupSection";

export const PlayScreen = () => {
  return (
    <Layout>
      <Header />
      <Title />
      <TournamentBanner />
      <LineupSection />
    </Layout>
  );
};
