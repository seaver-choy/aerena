import { ComponentType } from "react";
import { FriendsScreen } from "../../pages/FriendsScreen";
import { QuestsScreen } from "../../pages/QuestsScreen";
import { PlayScreen } from "../../pages/PlayScreen";
import { CollectionScreen } from "../../pages/CollectionScreen";
import { ExchangeScreen } from "../../pages/ExchangeScreen";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
}

export const routes: Route[] = [
  { path: "/friends", Component: FriendsScreen },
  { path: "/quests", Component: QuestsScreen },
  { path: "/", Component: PlayScreen },
  { path: "/collection", Component: CollectionScreen },
  { path: "/exchange", Component: ExchangeScreen },
];
