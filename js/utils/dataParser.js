import { API_CONFIG } from '../api/config.js';

export const createMovieElement = (movie) => {
    const posterUrl = movie.poster_path 
        ? `${API_CONFIG.imgUrl}${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    const div = document.createElement('div');
    div.className = 'movie-card'; 
    div.style.backgroundImage = `url('${posterUrl}')`;
    
    div.innerHTML = `
        <div class="ticket-content" style="background: rgba(0,0,0,0.7); opacity: 0; transition: 0.3s; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 12px;">
            <strong style="color: white; text-align: center; padding: 10px; font-size: 1.1rem;">${movie.title}</strong>
            <button class="fav-btn" style="background: #e50914; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold;">❤ В ИЗБРАННОЕ</button>
        </div>
    `;

    div.onmouseenter = () => div.querySelector('.ticket-content').style.opacity = '1';
    div.onmouseleave = () => div.querySelector('.ticket-content').style.opacity = '0';

    return div;
};