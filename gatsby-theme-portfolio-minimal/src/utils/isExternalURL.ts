export function isExternalURL(url: string) {
    if (typeof window === 'undefined') return false;
    return new URL(url, window.location.href).origin !== location.origin;
}
