import { tmdbAPI } from './api/apiService.js';
import { movieStorage } from './storage/localStorage.js';
import { validateEmail, validateName, showError, clearErrors, getRecommendationByRating } from './utils/helpers.js';
import { openTrailer, showAdvancedRecommendation } from './utils/modal.js';

let currentMovies = [];

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[MovieHub Log]: 6 лабораторная запущена');

    await loadPopularMovies();

    setupRatingSystem();
    setupRecommendationButton();
    setupProfileForm();
    setupTrailerButtons();
    setupMenu();
    setupSearch();
    setupFavorites();
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
        showErrorMessage(grid, "Не удалось загрузить фильмы. Проверьте интернет-соединение.");
    }
}

function showLoading(container) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#9C8A73;padding:50px;">Загрузка фильмов...</p>`;
}

function showErrorMessage(container, msg) {
    container.innerHTML = `
        <p style="grid-column:1/-1;text-align:center;color:#F40007;padding:40px;">
            ${msg}<br><br>
            <button onclick="location.reload()" style="padding:10px 20px;background:#530507;color:white;border:none;border-radius:8px;cursor:pointer;">
                Попробовать снова
            </button>
        </p>`;
}

function renderMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const isFav = movieStorage.isFavorite(movie.id);
        const poster = tmdbAPI.getPosterUrl(movie.poster_path);

        const card = document.createElement('article');
        card.className = 'movie-card';
        card.innerHTML = `
            <figure class="movie-card__figure">
                <img src="${poster}" alt="${movie.title}" class="movie-card__img">
                <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${movie.id}" title="В избранное">
                    ❤️
                </button>
                <figcaption class="movie-card__caption">
                    ${movie.title}
                    <small>${movie.release_date ? movie.release_date.slice(0,4) : ''}</small>
                    <div class="rating-stars" data-movie-id="${movie.id}"></div>
                </figcaption>
            </figure>
        `;
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
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const movie = currentMovies.find(m => m.id === id);

            if (movieStorage.isFavorite(id)) {
                movieStorage.removeFromFavorites(id);
                btn.classList.remove('active');
            } else {
                movieStorage.addToFavorites({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date
                });
                btn.classList.add('active');
            }
            renderFavoritesSection();
        });
    });
}

function renderFavoritesSection() {
    const favorites = movieStorage.getFavorites();
    console.log('%cИзбранные фильмы:', 'color:#F40007', favorites);
}



function setupSearch() {
    const nav = document.querySelector('.header__nav ul');
    if (!nav) return;

    const searchContainer = document.createElement('li');
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="Поиск фильмов..." 
               style="padding:8px 16px; border-radius:20px; border:1px solid #9C8A73; background:#1B0D0F; color:white; width:240px;">
    `;
    nav.appendChild(searchContainer);

    const input = document.getElementById('searchInput');
    input.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        const grid = document.querySelector('.catalog__grid');

        if (query.length < 2) {
            renderMovies(currentMovies, grid);
            return;
        }

        showLoading(grid);
        try {
            const data = await tmdbAPI.searchMovies(query);
            currentMovies = data.results || [];
            renderMovies(currentMovies, grid);
        } catch (err) {
            showErrorMessage(grid, "Ошибка поиска");
        }
    }, 500));
}

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}




function setupRatingSystem() {
    const starContainers = document.querySelectorAll('.rating-stars');
    starContainers.forEach(container => {
        const movieId = container.dataset.movieId;
        const stars = container.querySelectorAll('.star');

        const highlight = (rating) => {
            stars.forEach(s => {
                s.classList.toggle('star--active', parseInt(s.dataset.value) <= rating);
            });
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
                alert(`Оценка ${val}/5 сохранена для фильма "${star.closest('.movie-card__caption').textContent.trim()}"`);
            }
        });
    });
}

function setupRecommendationButton() {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    const recBtn = document.createElement('button');
    recBtn.className = 'hero__btn hero__btn--outline';
    recBtn.textContent = 'ПОДОБРАТЬ ФИЛЬМ';
    recBtn.style.marginTop = '20px';
    heroContent.appendChild(recBtn);

    recBtn.addEventListener('click', () => {
        const movie = getRecommendationByRating();
        showAdvancedRecommendation(movie, openTrailer);
    });
}

function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('email');

    // ... (твой старый код валидации остаётся без изменений)
    nameInput.addEventListener('blur', () => {
        clearErrors(nameInput);
        if (!validateName(nameInput.value.trim())) showError(nameInput, "Имя должно содержать только буквы (мин. 2)");
    });

    emailInput.addEventListener('blur', () => {
        clearErrors(emailInput);
        if (!validateEmail(emailInput.value.trim())) showError(emailInput, "Неверный формат почты");
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(nameInput);
        clearErrors(emailInput);

        if (validateName(nameInput.value.trim()) && validateEmail(emailInput.value.trim())) {
            alert(`Поздравляем, ${nameInput.value.toUpperCase()}! Вы успешно подписаны.`);
            profileForm.reset();
        } else {
            alert("Пожалуйста, исправьте ошибки в форме.");
        }
    });
}

function setupTrailerButtons() {
    const watchBtn = document.querySelector('.hero__btn--primary');
    if (watchBtn && watchBtn.textContent.includes('СМОТРЕТЬ')) {
        watchBtn.addEventListener('click', () => openTrailer('https://www.youtube.com/embed/n9xhJrPXop4'));
    }

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

    if (burgerBtn && sideMenu) burgerBtn.addEventListener('click', () => sideMenu.classList.add('side-menu--open'));
    if (closeBtn && sideMenu) closeBtn.addEventListener('click', () => sideMenu.classList.remove('side-menu--open'));
}