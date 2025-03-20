export function isIOS() {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent);
}
