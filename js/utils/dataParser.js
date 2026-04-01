import { tmdbAPI } from '../api/apiService.js';

export const createMovieElement = (movie) => {
    const posterUrl = tmdbAPI.getPosterUrl(movie.poster_path);

    const card = document.createElement('article');
    card.className = 'movie-card';
    card.innerHTML = `
        <figure class="movie-card__figure">
            <img src="${posterUrl}" alt="${movie.title}" class="movie-card__img">
            <button class="favorite-btn" data-id="${movie.id}" title="В избранное">♡</button>
            <figcaption class="movie-card__caption">
                ${movie.title}
                <small>${movie.release_date ? movie.release_date.slice(0,4) : '—'}</small>
                <div class="rating-stars" data-movie-id="${movie.id}"></div>
            </figcaption>
        </figure>
    `;
    return card;
};