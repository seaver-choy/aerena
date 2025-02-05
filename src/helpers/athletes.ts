import RoamIcon from "../assets/icon/roam.svg";
import MidIcon from "../assets/icon/mid.svg";
import JungleIcon from "../assets/icon/jungle.svg";
import GoldIcon from "../assets/icon/gold.svg";
import EXPIcon from "../assets/icon/exp.svg";

import RoamBackground from "../assets/background/roam.svg";
import MidBackground from "../assets/background/mid.svg";
import JungleBackground from "../assets/background/jungle.svg";
import GoldBackground from "../assets/background/gold.svg";
import EXPBackground from "../assets/background/exp.svg";

import RoamEmpty from "../assets/card/roam-empty.svg";
import MidEmpty from "../assets/card/mid-empty.svg";
import JungleEmpty from "../assets/card/jungle-empty.svg";
import GoldEmpty from "../assets/card/gold-empty.svg";
import EXPEmpty from "../assets/card/exp-empty.svg";

export function getAthletePositionLogo(position: string) {
    switch (position) {
        case "Roam":
            return RoamIcon;
        case "Mid":
            return MidIcon;
        case "Jungle":
            return JungleIcon;
        case "Gold":
            return GoldIcon;
        case "EXP":
            return EXPIcon;
    }
}

export function getAthletePositionBackground(position: string) {
    switch (position) {
        case "Roam":
            return RoamBackground;
        case "Mid":
            return MidBackground;
        case "Jungle":
            return JungleBackground;
        case "Gold":
            return GoldBackground;
        case "EXP":
            return EXPBackground;
    }
}

export function getEmptyAthleteCard(position: string) {
    switch (position) {
        case "Roam":
            return RoamEmpty;
        case "Mid":
            return MidEmpty;
        case "Jungle":
            return JungleEmpty;
        case "Gold":
            return GoldEmpty;
        case "EXP":
            return EXPEmpty;
    }
}

export function getBaseTeamColor() {
    return {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };
}
