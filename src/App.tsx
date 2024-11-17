import { AppRoot } from "@telegram-apps/telegram-ui";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { TutorialModal } from "./components/TutorialModal";
import { login } from "./helpers/lambda.helpers";
import { routes } from "./setup/navigation/routes";

const App = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [finishedTutorial, setFinishedTutorial] = useState(false);


  tonConnectUI.onStatusChange(
    async (walletAndWalletInfo) => {
      console.log(walletAndWalletInfo)
      if(walletAndWalletInfo) {
        await login(walletAndWalletInfo?.account.address)
        console.log("I'm called");
      }
    }
  )

  return (
    <AppRoot appearance="dark">
      {!finishedTutorial && <TutorialModal close={setFinishedTutorial} />}
      <Routes>
        <Route path="/" element={<NavBar />}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AppRoot>
  );
};

export default App;
