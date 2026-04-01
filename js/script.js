import { tmdbAPI } from './api/apiService.js';
import { movieStorage } from './storage/localStorage.js';
import { sessionStorageService } from './storage/sessionStorage.js';
import { createMovieElement } from './utils/dataParser.js';
import { validateEmail, validateName, showError, clearErrors, getRecommendationByRating } from './utils/helpers.js';
import { openTrailer, showAdvancedRecommendation } from './utils/modal.js';

let currentMovies = [];

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[MovieHub Log]: Лабораторная работа №6 — финальная версия');

    await loadPopularMovies();
    
    setupSearch();                   
    setupRatingSystem();
    setupRecommendationButton();
    setupProfileForm();
    setupTrailerButtons();
    setupMenu();
    setupFavorites();
    setupOfflineMode();
});

async function loadPopularMovies() {
    const grid = document.querySelector('.catalog__grid');
    if (!grid) return;

    showLoading(grid);

    try {
        let data = movieStorage.getCache('popular_movies');
        if (!data) {
            data = await tmdbAPI.getPopular(1);
            movieStorage.saveCache('popular_movies', data, 30);
        }

        currentMovies = data.results || [];
        renderMovies(currentMovies, grid);
    } catch (err) {
        console.error(err);
        showErrorMessage(grid, "Не удалось загрузить фильмы.");
    }
}

function showLoading(container) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#9C8A73;padding:60px;">Загрузка фильмов...</p>`;
}

function showErrorMessage(container, msg) {
    container.innerHTML = `
        <p style="grid-column:1/-1;text-align:center;color:#F40007;padding:50px;">
            ${msg}<br><br>
            <button onclick="location.reload()" style="padding:12px 24px;background:#530507;color:white;border:none;border-radius:8px;cursor:pointer;">
                Попробовать снова
            </button>
        </p>`;
}

function renderMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieElement(movie);
        container.appendChild(card);
    });

    setupRatingSystem();
    setupFavoriteButtons();
}

function setupFavorites() {
    renderFavoritesSection();
}

function setupFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true)); 
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            const id = parseInt(btn.dataset.id);
            const movie = currentMovies.find(m => m.id === id);

            if (movieStorage.isFavorite(id)) {
                movieStorage.removeFromFavorites(id);
                btn.classList.remove('active');
                btn.textContent = '♡';
            } else if (movie) {
                movieStorage.addToFavorites({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date
                });
                btn.classList.add('active');
                btn.textContent = '♥';
            }
            renderFavoritesSection();
        });
    });
}

function renderFavoritesSection() {
    const favorites = movieStorage.getFavorites();
    const container = document.getElementById('favorites-grid');
    const section = document.getElementById('favorites-section');

    if (!container || !section) return;

    section.style.display = favorites.length > 0 ? 'block' : 'none';

    if (favorites.length === 0) return;

    container.innerHTML = '';
    favorites.forEach(movie => {
        const card = createMovieElement(movie);
        const favBtn = card.querySelector('.favorite-btn');
        if (favBtn) {
            favBtn.classList.add('active');
            favBtn.textContent = '♥';
        }
        container.appendChild(card);
    });

    setupRatingSystem();
    setupFavoriteButtons();
}


function setupSearch() {
    const searchContainer = document.querySelector('.header__nav ul');
    if (!searchContainer) return;

    
    if (document.getElementById('searchInput')) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="text" id="searchInput" placeholder="Поиск фильмов..." 
               style="padding:10px 18px; border-radius:30px; border:1px solid #9C8A73; 
                      background:#1B0D0F; color:white; width:260px; font-size:15px;">
    `;
    searchContainer.appendChild(li);

    const input = document.getElementById('searchInput');

    input.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        const grid = document.querySelector('.catalog__grid');
        if (!grid) return;

        if (query.length < 2) {
            renderMovies(currentMovies, grid);
            return;
        }

        showLoading(grid);

        try {
            const data = await tmdbAPI.searchMovies(query);
            currentMovies = data.results || [];
            renderMovies(currentMovies, grid);
            sessionStorageService.saveLastSearch(query);
        } catch (err) {
            showErrorMessage(grid, "Ошибка поиска. Попробуйте позже.");
        }
    }, 400));
}

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// ==================== ОСТАЛЬНЫЕ ФУНКЦИИ ====================
function setupRatingSystem() {
    const starContainers = document.querySelectorAll('.rating-stars');
    starContainers.forEach(container => {
        const movieId = container.dataset.movieId;
        const stars = container.querySelectorAll('.star');

        const highlight = (rating) => {
            stars.forEach(s => s.classList.toggle('star--active', parseInt(s.dataset.value) <= rating));
        };

        highlight(localStorage.getItem(`rating-${movieId}`) || 0);

        container.addEventListener('mouseover', (e) => {
            const star = e.target.closest('.star');
            if (star) highlight(star.dataset.value);
        });

        container.addEventListener('mouseleave', () => {
            highlight(localStorage.getItem(`rating-${movieId}`) || 0);
        });

        container.addEventListener('click', (e) => {
            const star = e.target.closest('.star');
            if (star) {
                const val = star.dataset.value;
                localStorage.setItem(`rating-${movieId}`, val);
                highlight(val);
            }
        });
    });
}

function setupRecommendationButton() {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    let recBtn = heroContent.querySelector('.rec-btn');
    if (!recBtn) {
        recBtn = document.createElement('button');
        recBtn.className = 'hero__btn hero__btn--outline rec-btn';
        recBtn.textContent = 'ПОДОБРАТЬ ФИЛЬМ';
        recBtn.style.marginTop = '25px';
        heroContent.appendChild(recBtn);
    }

    recBtn.onclick = () => {
        const movie = getRecommendationByRating();
        showAdvancedRecommendation(movie, openTrailer);
    };
}

function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('email');

    nameInput?.addEventListener('blur', () => {
        clearErrors(nameInput);
        if (!validateName(nameInput.value.trim())) showError(nameInput, "Имя должно содержать только буквы (мин. 2 символа)");
    });

    emailInput?.addEventListener('blur', () => {
        clearErrors(emailInput);
        if (!validateEmail(emailInput.value.trim())) showError(emailInput, "Неверный формат email");
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(nameInput);
        clearErrors(emailInput);

        if (validateName(nameInput?.value.trim()) && validateEmail(emailInput?.value.trim())) {
            alert(`Поздравляем, ${nameInput.value}! Вы успешно подписаны.`);
            profileForm.reset();
        }
    });
}

function setupTrailerButtons() {
    const watchBtn = document.querySelector('.hero__btn--primary');
    watchBtn?.addEventListener('click', () => openTrailer('https://www.youtube.com/embed/n9xhJrPXop4'));

    const trailerBtn = document.querySelector('.hero__btns .hero__btn--outline');
    if (trailerBtn && trailerBtn.textContent === 'ТРЕЙЛЕР') {
        trailerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openTrailer('https://www.youtube.com/embed/n9xhJrPXop4');
        });
    }
}

function setupMenu() {
    const burgerBtn = document.querySelector('.burger-menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeMenu');

    burgerBtn?.addEventListener('click', () => sideMenu.classList.add('side-menu--open'));
    closeBtn?.addEventListener('click', () => sideMenu.classList.remove('side-menu--open'));
}

function setupOfflineMode() {
    window.addEventListener('offline', () => {
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:90px;left:0;right:0;background:#530507;color:white;text-align:center;padding:14px;z-index:9999;';
        banner.textContent = '🌐 Оффлайн-режим • Работает кэш и избранное';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 4000);
    });
}