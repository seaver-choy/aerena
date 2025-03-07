import AllIcon from "../assets/icon/all.svg";
import RoamIcon from "../assets/icon/roam.svg";
import MidIcon from "../assets/icon/mid.svg";
import JungleIcon from "../assets/icon/jungle.svg";
import GoldIcon from "../assets/icon/gold.svg";
import EXPIcon from "../assets/icon/exp.svg";

import AllBackground from "../assets/background/all.svg";
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

import ID15 from "../assets/card/id15.svg";
import ID14 from "../assets/card/id14.svg";
import ID13 from "../assets/card/id13.svg";
import ID12 from "../assets/card/id12.svg";
import ID11 from "../assets/card/id11.svg";
import ID10 from "../assets/card/id10.svg";
import ID9 from "../assets/card/id9.svg";
import ID8 from "../assets/card/id8.svg";
import ID7 from "../assets/card/id7.svg";
import ID6 from "../assets/card/id6.svg";
import ID5 from "../assets/card/id5.svg";
import ID4 from "../assets/card/id4.svg";
import ID3 from "../assets/card/id3.svg";
import ID2 from "../assets/card/id2.svg";
import ID1 from "../assets/card/id1.svg";
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
        case "All":
            return AllIcon;
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
        case "All":
            return AllBackground;
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
        case "ID15":
            return ID15;
        case "ID14":
            return ID14;
        case "ID13":
            return ID13;
        case "ID12":
            return ID12;
        case "ID11":
            return ID11;
        case "ID10":
            return ID10;
        case "ID9":
            return ID9;
        case "ID8":
            return ID8;
        case "ID7":
            return ID7;
        case "ID6":
            return ID6;
        case "ID5":
            return ID5;
        case "ID4":
            return ID4;
        case "ID3":
            return ID3;
        case "ID2":
            return ID2;
        case "ID1":
            return ID1;
        case "SPS6 APAC CF":
            return SPS6;
    }
}

export function getBaseTeamColor() {
    return {
        main: "#333333",
        light: "#5C5C5C",
        dark: "#212121",
        wings: "#212121",
        accent: "#5C5C5C",
        details: "#F5F1EE",
        wave: "0.15",
    };
}

export function sortList (list, country) {
    const sortedList = list.sort((a, b) => {
        if (a.tournamentEndSubmissionDate && b.tournamentEndSubmissionDate) {
            const dateA = new Date(a.tournamentEndSubmissionDate);
            const dateB = new Date(b.tournamentEndSubmissionDate);
            const now = new Date();
            const timeToA = dateA.getTime() - now.getTime();
            const timeToB = dateB.getTime() - now.getTime();
            if (timeToA !== timeToB) {
                if (timeToA > 0 && timeToB <= 0) return -1;
                if (timeToB > 0 && timeToA <= 0) return 1;
                
                return Math.abs(timeToA) - Math.abs(timeToB);
            }
        }
        const aHasMatch = a.league.includes(country);
        const bHasMatch = b.league.includes(country);

        if (aHasMatch !== bHasMatch)
            return bHasMatch ? 1 : -1;

        return 0;
        });
    return sortedList;
}

export function sortLeagues (leagues, country) {
    const sortedLeagues = leagues.sort((a, b) => {
        const aHasMatch = a.includes(country)
        const bHasMatch = b.includes(country)

        if (aHasMatch !== bHasMatch)
            return bHasMatch ? 1 : -1;
        else
            return 0;
        });
    return sortedLeagues;
}

