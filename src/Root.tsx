import TelegramAnalytics from '@telegram-apps/analytics';
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { type FC, useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary/index.tsx";
import { UserProvider } from "./hooks/useUser.tsx";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
    <div>
        <p>An unhandled error occurred:</p>
        <blockquote>
            <code>
                {error instanceof Error
                    ? error.message
                    : typeof error === "string"
                      ? error
                      : JSON.stringify(error)}
            </code>
        </blockquote>
    </div>
);

if(import.meta.env.VITE_ENVIRONMENT == "prod") {
    TelegramAnalytics.init({
        token: 'eyJhcHBfbmFtZSI6ImFlcmVuYV9ib3QiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2FlcmVuYV9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9tYWluLmQxcjJpcHk0b2NuMWl6LmFtcGxpZnlhcHAuY29tLyJ9!Kk+TUtACO7B+fC96vRz26KiH8fuKg7cvBdrC8OZW2is=',
        appName: 'aerena_bot',
    });
}

console.log(process.env.ENVIRONMENT)
console.log(TelegramAnalytics)


const Inner: FC = () => {
    const debug = useLaunchParams().startParam === "debug";
    const manifestUrl = useMemo(() => {
        return new URL(
            "tonconnect-manifest.json",
            window.location.href
        ).toString();
    }, []);

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        if (debug) {
            import("eruda").then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <SDKProvider acceptCustomStyles debug={debug}>
                <UserProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </UserProvider>
            </SDKProvider>
        </TonConnectUIProvider>
    );
};

export const Root: FC = () => (
    <ErrorBoundary fallback={ErrorBoundaryError}>
        <Inner />
    </ErrorBoundary>
);
