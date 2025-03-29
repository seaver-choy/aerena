export function isIOS() {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent);
}

export function getCountryCode(country: string) {
    switch (country) {
        case "China":
            return "CN";
        case "Cambodia":
            return "KH";
        case "Indonesia":
            return "ID";
        case "Malaysia":
            return "MY";
        case "Myanmar":
            return "MM";
        case "Philippines":
            return "PH";
        case "Singapore":
            return "SG";
        default:
            return "ALL";
    }
}
export function getCountryFull(code: string) {
    switch (code) {
        case "CN":
            return "China";
        case "KH":
            return "Cambodia";
        case "ID":
            return "Indonesia";
        case "MY":
            return "Malaysia";
        case "MM":
            return "Myanmar";
        case "PH":
            return "Philippines";
        case "SG":
            return "Singapore";
        default:
            return "ALL";
    }
}
