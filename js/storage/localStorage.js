// js/storage/localStorage.js
const FAVORITES_KEY = 'moviehub_favorites';
const CACHE_KEY_PREFIX = 'moviehub_cache_';

export const movieStorage = {

    getFavorites() {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    },

    addToFavorites(movie) {
        const favorites = this.getFavorites();
        if (!favorites.some(m => m.id === movie.id)) {
            favorites.push(movie);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            return true;
        }
        return false;
    },

    removeFromFavorites(movieId) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(m => m.id !== movieId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    },

    isFavorite(movieId) {
        return this.getFavorites().some(m => m.id === movieId);
    },

    saveCache(key, data, ttlMinutes = 30) {
        const cacheItem = {
            data: data,
            timestamp: Date.now(),
            ttl: ttlMinutes * 60 * 1000
        };
        localStorage.setItem(`${CACHE_KEY_PREFIX}${key}`, JSON.stringify(cacheItem));
    },

    getCache(key) {
        const item = localStorage.getItem(`${CACHE_KEY_PREFIX}${key}`);
        if (!item) return null;

        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > parsed.ttl) {
            localStorage.removeItem(`${CACHE_KEY_PREFIX}${key}`);
            return null;
        }
        return parsed.data;
    }
};