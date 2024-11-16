import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { StrictMode, type FC } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";


export const Root: FC = () => {

    return (
      <TonConnectUIProvider manifestUrl={"https://main.d1r2ipy4ocn1iz.amplifyapp.com/ton-connect-manifest.json"}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </TonConnectUIProvider>
    )
  }