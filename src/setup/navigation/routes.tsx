import { ComponentType } from "react";
import { FriendsScreen } from "../../pages/FriendsScreen";
import { QuestsScreen } from "../../pages/QuestsScreen";
import { PlayScreen } from "../../pages/PlayScreen";
//import { CollectionScreen } from "../../pages/CollectionScreen";
import { ExchangeScreen } from "../../pages/ExchangeScreen";
import { TournamentScreen } from "../../pages/PlayScreen/pages/TournamentScreen";
import { PreviousScreen } from "../../pages/PlayScreen/pages/PreviousScreen";
import { UpcomingScreen } from "../../pages/PlayScreen/pages/UpcomingScreen";
import { CommunityLineupsScreen } from "../../pages/PlayScreen/pages/CommunityLineupsScreen";
//import { AthleteScreen } from "../../pages/CollectionScreen/pages/AthleteScreen";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
}

export const routes: Route[] = [
    { path: "/", Component: PlayScreen },
    { path: "/friends", Component: FriendsScreen, title: "Friends Screen" },
    { path: "/quests", Component: QuestsScreen, title: "Quests Screen" },
    // {
    //     path: "/collection",
    //     Component: CollectionScreen,
    //     title: "Collection Screen",
    // },
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
    // {
    //     path: "/athlete",
    //     Component: AthleteScreen,
    //     title: "Athlete Screen",
    // },
];
