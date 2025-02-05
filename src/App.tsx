import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./setup/navigation/routes";
import { NavBar } from "./components/NavBar/index";
//import { useIntegration } from "@telegram-apps/react-router-integration";
import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
    initNavigator,
    // useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
    initSwipeBehavior,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo } from "react";
const App = () => {
    //const lp = useLaunchParams();
    // console.log(lp.startParam);
    const miniApp = useMiniApp();

    const [swipeBehavior] = initSwipeBehavior();
    swipeBehavior.disableVerticalSwipe();

    const themeParams = useThemeParams();
    const viewport = useViewport();

    //edit to null and uncomment useffect for desktop restriction
    // const [isMobile, setIsMobile] = useState<boolean | null>(null);
    // const [isLandscape, setIsLandscape] = useState<boolean>(null);

    // const checkIsMobile = () => {
    //     const userAgent = navigator.userAgent;
    //     if (/Mobile|Android|iPhone|iPad|iPod/.test(userAgent)) {
    //         setIsMobile(true);
    //     } else {
    //         setIsMobile(false);
    //     }
    // };

    // // refresh page when orientation is changed
    // const checkIsLandscape = () => {
    //     const landscape = window.matchMedia("(orientation: landscape)").matches;
    //     setIsLandscape(landscape);

    //     window.location.reload();
    // };

    // useEffect(() => {
    //     // checkIsMobile();

    //     // checkIsLandscape();

    //     window.addEventListener("orientationchange", checkIsLandscape);

    //     return () => {
    //         window.removeEventListener("orientationchange", checkIsLandscape);
    //     };
    // }, []);

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    const appNavigator = useMemo(
        () => initNavigator("app-navigation-state"),
        []
    );

    useEffect(() => {
        appNavigator.attach();
        return () => appNavigator.detach();
    }, [appNavigator]);

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
