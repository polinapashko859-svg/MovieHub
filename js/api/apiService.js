import { TMDB_CONFIG } from './config.js';

export const tmdbAPI = {

    async getPopular(page = 1) {
        try {
            const url = `${TMDB_CONFIG.BASE_URL}/movie/popular?language=${TMDB_CONFIG.LANGUAGE}&page=${page}&api_key=${TMDB_CONFIG.API_KEY}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки популярных фильмов:', error);
            throw error;
        }
    },

    async searchMovies(query, page = 1) {
        try {
            const url = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}&api_key=${TMDB_CONFIG.API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка поиска фильмов:', error);
            throw error;
        }
    },

    async getMovieDetails(movieId) {
        try {
            const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?language=${TMDB_CONFIG.LANGUAGE}&append_to_response=videos&api_key=${TMDB_CONFIG.API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка получения деталей фильма:', error);
            throw error;
        }
    },

    getPosterUrl(posterPath, size = 'w500') {
        if (!posterPath) return TMDB_CONFIG.DEFAULT_POSTER;
        return `${TMDB_CONFIG.IMAGE_BASE_URL}${size}${posterPath}`;
    }
};