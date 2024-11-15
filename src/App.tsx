import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./setup/navigation/routes";
import { NavBar } from "./components/NavBar";
import { AppRoot } from "@telegram-apps/telegram-ui";

const App = () => {
  return (
    <AppRoot appearance="dark">
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
