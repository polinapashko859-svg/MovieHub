
import { validateEmail, showError, clearErrors, getRecommendationByRating } from './utils/helpers.js';
import { openTrailer, showAdvancedRecommendation } from './components/modal.js';


function logAppStatus(message) {
    console.log(`[MovieHub Log]: ${message}`);
}


function openSimpleOverlay() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: black; z-index: 10000; display: flex;
        justify-content: center; align-items: center; cursor: pointer;
    `;
    overlay.innerHTML = `
        <div style="width: 0; height: 0; border-top: 40px solid transparent; border-left: 70px solid white; border-bottom: 40px solid transparent;"></div>
        <p style="position:absolute; bottom:50px; color:#9C8A73; font-family: 'Iceland'; letter-spacing: 2px;">Нажмите, чтобы закрыть</p>
    `;
    document.body.appendChild(overlay);
    overlay.onclick = () => overlay.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    logAppStatus("Интерактивная система MovieHub запущена.");

    
    const starContainers = document.querySelectorAll('.rating-stars');
    
    starContainers.forEach(container => {
        const movieId = container.dataset.movieId;
        const stars = container.querySelectorAll('.star');

        
        const highlight = (rating) => {
            stars.forEach(s => {
                if (parseInt(s.dataset.value) <= rating) {
                    s.classList.add('star--active');
                } else {
                    s.classList.remove('star--active');
                }
            });
        };

        
        const savedRating = localStorage.getItem(`rating-${movieId}`) || 0;
        highlight(savedRating);

        
        container.addEventListener('mouseover', (e) => {
            const star = e.target.closest('.star');
            if (star) highlight(star.dataset.value);
        });

        
        container.addEventListener('mouseleave', () => {
            const currentSaved = localStorage.getItem(`rating-${movieId}`) || 0;
            highlight(currentSaved);
        });

        
        container.addEventListener('click', (e) => {
            const star = e.target.closest('.star');
            if (star) {
                const val = star.dataset.value;
                localStorage.setItem(`rating-${movieId}`, val);
                highlight(val);
                logAppStatus(`Фильм "${movieId}" получил оценку ${val}`);
            }
        });
    });

    
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
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

    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            clearErrors(emailInput);
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, "Неверный формат почты");
            }
        });
    }

    
    const sideMenu = document.getElementById('sideMenu');
    const burgerBtn = document.querySelector('.burger-menu');
    const closeBtn = document.getElementById('closeMenu');
    const notifyBtn = document.querySelector('.notify-bell');

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => sideMenu.classList.add('side-menu--open'));
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => sideMenu.classList.remove('side-menu--open'));
    }
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => alert("У вас нет новых уведомлений"));
    }

    
    const playMain = document.querySelector('.hero__btn--primary');
    if (playMain) {
        playMain.addEventListener('click', openSimpleOverlay);
    }

    
    const trailerMain = document.querySelector('.hero__btn--outline');
    if (trailerMain) {
        trailerMain.addEventListener('click', () => {
            openTrailer('https://www.youtube.com/embed/n9xhJrPXop4');
        });
    }
});