import IconRoam from "../assets/icon-roam.svg";
import IconMid from "../assets/icon-mid.svg";
import IconJungle from "../assets/icon-jungle.svg";
import IconGold from "../assets/icon-gold.svg";
import IconEXP from "../assets/icon-exp.svg";

import BackgroundRoam from "../assets/background-roam.svg";
import BackgroundMid from "../assets/background-mid.svg";
import BackgroundJungle from "../assets/background-jungle.svg";
import BackgroundGold from "../assets/background-gold.svg";
import BackgroundEXP from "../assets/background-exp.svg";

export function getAthletePositionLogo(position: string) {
  switch (position) {
    case "Roam":
      return IconRoam;
    case "Mid":
      return IconMid;
    case "Jungle":
      return IconJungle;
    case "Gold":
      return IconGold;
    case "EXP":
      return IconEXP;
  }
}

export function getAthletePositionBackground(position: string) {
  switch (position) {
    case "Roam":
      return BackgroundRoam;
    case "Mid":
      return BackgroundMid;
    case "Jungle":
      return BackgroundJungle;
    case "Gold":
      return BackgroundGold;
    case "EXP":
      return BackgroundEXP;
  }
}
