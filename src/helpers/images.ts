import PH14Sticker from "../assets/sticker/ph14.svg";
import MSC2024Sticker from "../assets/sticker/msc2024.svg";
import M6Sticker from "../assets/sticker/m6.svg";
import SPS6Sticker from "../assets/sticker/sps6.svg";
import PH15Sticker from "../assets/sticker/ph15.svg";
import ID15Sticker from "../assets/sticker/id15.svg";

import PhilippinesSticker from "../assets/sticker/philippines.svg";
import IndonesiaSticker from "../assets/sticker/indonesia.svg";
import MalaysiaSticker from "../assets/sticker/malaysia.svg";

export function getStickerImage(leagueType: string) {
    switch (leagueType) {
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
        default:
            return null;
    }
}

export function getCountryImage(country: string) {
    switch (country) {
        case "Philippines":
            return PhilippinesSticker;
        case "Indonesia":
            return IndonesiaSticker;
        case "Malaysia":
            return MalaysiaSticker;
        default:
            return null;
    }
}
