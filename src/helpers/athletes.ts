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

import PH15 from "../assets/card/ph15.svg";
import PH14 from "../assets/card/ph14.svg";
import PH13 from "../assets/card/ph13.svg";
import PH12 from "../assets/card/ph12.svg";
import PH11 from "../assets/card/ph11.svg";
import PH10 from "../assets/card/ph10.svg";
import PH9 from "../assets/card/ph9.svg";
import PH8 from "../assets/card/ph8.svg";
import PH7 from "../assets/card/ph7.svg";
import PH6 from "../assets/card/ph6.svg";
import PH5 from "../assets/card/ph5.svg";
import PH4 from "../assets/card/ph4.svg";
import PH3 from "../assets/card/ph3.svg";
import PH2 from "../assets/card/ph2.svg";
import PH1 from "../assets/card/ph1.svg";
import SPS6 from "../assets/card/sps6.svg";

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

export function getAthleteSticker(league: string) {
    console.log(league);
    switch (league) {
        case "PH15":
            return PH15;
        case "PH14":
            return PH14;
        case "PH13":
            return PH13;
        case "PH12":
            return PH12;
        case "PH11":
            return PH11;
        case "PH10":
            return PH10;
        case "PH9":
            return PH9;
        case "PH8":
            return PH8;
        case "PH7":
            return PH7;
        case "PH6":
            return PH6;
        case "PH5":
            return PH5;
        case "PH4":
            return PH4;
        case "PH3":
            return PH3;
        case "PH2":
            return PH2;
        case "PH1":
            return PH1;
        case "SPS6 APAC CF":
            return SPS6;
    }
}

export function getBaseTeamColor() {
    return {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        wings: "#D8A956",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };
}
