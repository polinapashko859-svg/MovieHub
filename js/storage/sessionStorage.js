export const sessionStorageService = {

    saveLastSearch(query) {
        sessionStorage.setItem('lastSearchQuery', query);
    },

    getLastSearch() {
        return sessionStorage.getItem('lastSearchQuery') || '';
    },

    saveCurrentPage(page) {
        sessionStorage.setItem('currentPage', page);
    },

    getCurrentPage() {
        return parseInt(sessionStorage.getItem('currentPage')) || 1;
    }
};