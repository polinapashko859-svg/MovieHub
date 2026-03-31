import { API_CONFIG } from './config.js';

class ApiService {
    constructor() {
        this.baseURL = API_CONFIG.movie.url;
        this.apiKey = API_CONFIG.movie.apiKey;
    }

    async get(endpoint, params = {}) {
        try {
            const searchParams = new URLSearchParams({
                api_key: this.apiKey,
                language: 'ru-RU',
                ...params
            });

            const response = await fetch(`${this.baseURL}${endpoint}?${searchParams}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('ApiService Error:', error);
            throw error;
        }
    }
}

export const apiService = new ApiService();