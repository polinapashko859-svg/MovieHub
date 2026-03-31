import { apiService } from './api/apiService.js';
import { API_CONFIG } from './api/config.js';
import { localStore } from './storage/localStorage.js';
import { createMovieElement } from './utils/dataParser.js';

function initPlayer() {
    const playBtn = document.getElementById('welcomeBtn');
    if (!playBtn) return;
    playBtn.addEventListener('click', () => {
        const playerOverlay = document.createElement('div');
        playerOverlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: black; z-index: 2000; display: flex; justify-content: center; align-items: center; cursor: pointer;`;
        playerOverlay.innerHTML = `<div style="width: 0; height: 0; border-top: 50px solid transparent; border-left: 80px solid white; border-bottom: 50px solid transparent;"></div>`;
        document.body.appendChild(playerOverlay);
        playerOverlay.onclick = () => playerOverlay.remove();
    });
}

async function loadMovies() {
    // ВАЖНО: У тебя в HTML класс "movie-grid", используем его
    const grid = document.querySelector('.movie-grid');
    if (!grid) return;

    const cacheKey = 'movies_cache';
    const cached = localStore.get(cacheKey);

    if (cached) {
        render(cached, grid);
    } else {
        try {
            const data = await apiService.get(API_CONFIG.movie.endpoints.popular);
            localStore.set(cacheKey, data.results);
            render(data.results, grid);
        } catch (e) {
            grid.innerHTML = '<p style="color:white;">Ошибка загрузки API</p>';
        }
    }
}

function render(movies, container) {
    container.innerHTML = ''; 
    movies.forEach(movie => {
        const el = createMovieElement(movie);
        el.querySelector('.fav-btn').onclick = (e) => {
            e.stopPropagation();
            localStore.saveFavorite(movie);
            alert('Сохранено в избранное!');
        };
        container.appendChild(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPlayer();
    loadMovies();
});