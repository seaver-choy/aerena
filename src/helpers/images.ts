import PH14Sticker from "../assets/sticker/ph14.svg";
import MSC2024Sticker from "../assets/sticker/msc2024.svg";
import M6Sticker from "../assets/sticker/m6.svg";
import SPS6Sticker from "../assets/sticker/sps6.svg";
import PH15Sticker from "../assets/sticker/ph15.svg";
import ID15Sticker from "../assets/sticker/id15.svg";
import AllSticker from "../assets/sticker/all-leagues.svg";

import ChinaSticker from "../assets/sticker/china.svg";
import CambodiaSticker from "../assets/sticker/cambodia.svg";
import IndonesiaSticker from "../assets/sticker/indonesia.svg";
import MalaysiaSticker from "../assets/sticker/malaysia.svg";
import MyanmarSticker from "../assets/sticker/myanmar.svg";
import PhilippinesSticker from "../assets/sticker/philippines.svg";
import SingaporeSticker from "../assets/sticker/singapore.svg";

import PH15ChoicePack from "../assets/pack/choice-ph15.svg";
import ID15ChoicePack from "../assets/pack/choice-id15.svg";

export function getStickerImage(league: string) {
    switch (league) {
        case "PH14":
            return PH14Sticker;
        case "MSC2024":
            return MSC2024Sticker;
        case "M6":
            return M6Sticker;
        case "SPS6 APAC CF":
            return SPS6Sticker;
        case "PH15":
            return PH15Sticker;
        case "ID15":
            return ID15Sticker;
        case "ALL":
            return AllSticker;
        default:
            return null;
    }
}

export function getCountryImage(country: string) {
    switch (country) {
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
