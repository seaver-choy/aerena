import PH1Sticker from "../assets/sticker/ph1.svg";
import PH2Sticker from "../assets/sticker/ph2.svg";
import PH3Sticker from "../assets/sticker/ph3.svg";
import PH4Sticker from "../assets/sticker/ph4.svg";
import PH5Sticker from "../assets/sticker/ph5.svg";
import PH6Sticker from "../assets/sticker/ph6.svg";
import PH7Sticker from "../assets/sticker/ph7.svg";
import PH8Sticker from "../assets/sticker/ph8.svg";
import PH9Sticker from "../assets/sticker/ph9.svg";
import PH10Sticker from "../assets/sticker/ph10.svg";
import PH11Sticker from "../assets/sticker/ph11.svg";
import PH12Sticker from "../assets/sticker/ph12.svg";
import PH13Sticker from "../assets/sticker/ph13.svg";
import PH14Sticker from "../assets/sticker/ph14.svg";
import PH15Sticker from "../assets/sticker/ph15.svg";

import MSC2024Sticker from "../assets/sticker/msc2024.svg";
import M6Sticker from "../assets/sticker/m6.svg";
import SPS6Sticker from "../assets/sticker/sps6.svg";
import ID15Sticker from "../assets/sticker/id15.svg";
import AllLeaguesSticker from "../assets/sticker/all-leagues.svg";

import ChinaSticker from "../assets/sticker/china.svg";
import CambodiaSticker from "../assets/sticker/cambodia.svg";
import IndonesiaSticker from "../assets/sticker/indonesia.svg";
import MalaysiaSticker from "../assets/sticker/malaysia.svg";
import MyanmarSticker from "../assets/sticker/myanmar.svg";
import PhilippinesSticker from "../assets/sticker/philippines.svg";
import SingaporeSticker from "../assets/sticker/singapore.svg";
import AllRegionsSticker from "../assets/sticker/all-regions.svg";

import PH15ChoicePack from "../assets/pack/choice-ph15.svg";
import ID15ChoicePack from "../assets/pack/choice-id15.svg";

export function getStickerImage(league: string) {
    switch (league) {
        case "MSC2024":
            return MSC2024Sticker;
        case "M6":
            return M6Sticker;
        case "SPS6 APAC CF":
            return SPS6Sticker;
        case "PH1":
            return PH1Sticker;
        case "PH2":
            return PH2Sticker;
        case "PH3":
            return PH3Sticker;
        case "PH4":
            return PH4Sticker;
        case "PH5":
            return PH5Sticker;
        case "PH6":
            return PH6Sticker;
        case "PH7":
            return PH7Sticker;
        case "PH8":
            return PH8Sticker;
        case "PH9":
            return PH9Sticker;
        case "PH10":
            return PH10Sticker;
        case "PH11":
            return PH11Sticker;
        case "PH12":
            return PH12Sticker;
        case "PH13":
            return PH13Sticker;
        case "PH14":
            return PH14Sticker;
        case "PH15":
            return PH15Sticker;
        case "ID15":
            return ID15Sticker;
        case "ALL":
            return AllLeaguesSticker;
        default:
            return null;
    }
}

export function getCountryImage(country: string) {
    switch (country) {
        case "ALL":
            return AllRegionsSticker;
        case "China":
            return ChinaSticker;
        case "Cambodia":
            return CambodiaSticker;
        case "Indonesia":
            return IndonesiaSticker;
        case "Malaysia":
            return MalaysiaSticker;
        case "Myanmar":
            return MyanmarSticker;
        case "Philippines":
            return PhilippinesSticker;
        case "Singapore":
            return SingaporeSticker;
        default:
            return null;
    }
}

export function getChoicePackImage(league: string) {
    switch (league) {
        case "PH15":
            return PH15ChoicePack;
        case "ID15":
            return ID15ChoicePack;
        default:
            return null;
    }
}
