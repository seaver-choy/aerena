import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { ReferralModal } from "./components/ReferralModal";
import { FriendsBanner } from "./components/FriendsBanner";
import { FriendsSection } from "./components/FriendsSection";

export const FriendsScreen = () => {
  const [showReferralPopup, setShowReferralPopup] = useState<boolean>(false);

  const handleCopyClick = () => {
    setShowReferralPopup(true);
  };

  return (
    <Layout>
      <Header />
      {showReferralPopup && (
        <ReferralModal onClose={() => setShowReferralPopup(false)} />
      )}
      <FriendsBanner onClick={handleCopyClick} />
      <FriendsSection />
    </Layout>
  );
};
