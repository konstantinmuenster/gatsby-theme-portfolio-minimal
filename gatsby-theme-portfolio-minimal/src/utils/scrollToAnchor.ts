export function scrollToAnchor(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element !== null) {
        window.scrollTo({ top: element.getBoundingClientRect().top - 60 });
    }
}
