import { ComponentType } from "react";
import { ProfileScreen } from "../../pages/ProfileScreen";
import { NexusScreen } from "../../pages/NexusScreen";
import { PlayScreen } from "../../pages/PlayScreen";
import { ExchangeScreen } from "../../pages/ExchangeScreen";
import { QuestsScreen } from "../../pages/ProfileScreen/pages/QuestsScreen";
import { TournamentScreen } from "../../pages/PlayScreen/pages/TournamentScreen";
import { PreviousScreen } from "../../pages/PlayScreen/pages/PreviousScreen";
import { UpcomingScreen } from "../../pages/PlayScreen/pages/UpcomingScreen";
import { CommunityLineupsScreen } from "../../pages/PlayScreen/pages/CommunityLineupsScreen";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
}

export const routes: Route[] = [
    { path: "/", Component: PlayScreen },
    { path: "/profile", Component: ProfileScreen, title: "Profile Screen" },
    { path: "/nexus", Component: NexusScreen, title: "Nexus Screen" },
    { path: "/quests", Component: QuestsScreen, title: "Quests Screen" },
    { path: "/exchange", Component: ExchangeScreen, title: "Exchange Screen" },
    {
        path: "/tournament/:tournamentId",
        Component: TournamentScreen,
        title: "Tournament Screen",
    },
    { path: "/previous", Component: PreviousScreen, title: "Previous Screen" },
    { path: "/upcoming", Component: UpcomingScreen, title: "Upcoming Screen" },
    {
        path: "/community-lineups",
        Component: CommunityLineupsScreen,
        title: "Community Lineups Screen",
    },
];
