class LocalStorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    set(key, value) {
        const item = {
            data: value,
            timestamp: Date.now()
        };
        this.storage.setItem(key, JSON.stringify(item));
    }

    get(key, maxAge = 3600000) {
        const raw = this.storage.getItem(key);
        if (!raw) return null;

        const item = JSON.parse(raw);
        const now = Date.now();

        if (maxAge !== Infinity && (now - item.timestamp > maxAge)) {
            this.storage.removeItem(key);
            return null;
        }

        return item.data;
    }

    saveFavorite(movie) {
        const favorites = this.get('favorites', Infinity) || [];
        if (!favorites.find(m => m.id === movie.id)) {
            favorites.push(movie);
            this.set('favorites', favorites);
        }
    }
}

export const localStore = new LocalStorageService();