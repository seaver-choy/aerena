import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { FriendsBanner } from "./FriendsBanner";
import { FriendsSection } from "./FriendsSection";

export const FriendsScreen = () => {
  return (
    <Layout>
      <Header />
      <FriendsBanner />
      <FriendsSection />
    </Layout>
  );
};
