import { ComponentType } from "react";
import { CollectionScreen } from "../../pages/CollectionScreen";
import { PlayScreen } from "../../pages/PlayScreen";
import { ExchangeScreen } from "../../pages/ExchangeScreen";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
}

export const routes: Route[] = [
  { path: "/collection", Component: CollectionScreen },
  { path: "/", Component: PlayScreen },
  { path: "/exchange", Component: ExchangeScreen },
];
