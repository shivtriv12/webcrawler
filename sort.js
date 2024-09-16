function sortPagesByCount(pages) {
    const sortedPages = {
        internal: {},
        external: {},
        invalid: {}
    };

    sortedPages.internal = Object.entries(pages.internal).sort((a, b) => b[1] - a[1]);

    sortedPages.external = Object.entries(pages.external).sort((a, b) => b[1] - a[1]);

    sortedPages.invalid = Object.entries(pages.invalid).sort((a, b) => b[1] - a[1]);

    return sortedPages;
}

export { sortPagesByCount };