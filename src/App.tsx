import { AppRoot } from "@telegram-apps/telegram-ui";
import { useTonWallet } from "@tonconnect/ui-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { TutorialModal } from "./components/TutorialModal";
import { routes } from "./setup/navigation/routes";

const App = () => {
  const wallet = useTonWallet();

  return (
    <AppRoot appearance="dark">
      {wallet && <TutorialModal />}
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
