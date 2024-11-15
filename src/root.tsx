import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { StrictMode, useMemo, type FC } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";


export const Root: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL(
        "tonconnect-manifest.json",
        window.location.href
    ).toString();
  }, []);

    return (
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </TonConnectUIProvider>
    )
  }