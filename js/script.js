import { validateEmail, validateName, showError, clearErrors, getRecommendationByRating } from './utils/helpers.js';
import { openTrailer, showAdvancedRecommendation } from './components/modal.js';

const logAppStatus = (message) => console.log(`[MovieHub Log]: ${message}`);

document.addEventListener('DOMContentLoaded', () => {
    
    logAppStatus("Интерактивная система MovieHub запущена.");

    const logo = document.querySelector('.header__logo');
    if (logo) logo.textContent = 'MovieHub Pro';

    const firstCard = document.querySelector('.movie-card');
    if (firstCard) {
        const newBadge = document.createElement('span');
        newBadge.className = 'movie-badge';
        newBadge.textContent = 'NEW';
        newBadge.style.cssText = 'background: #F40007; color: white; padding: 5px 10px; position: absolute; z-index: 10; border-radius: 4px; font-size: 10px; top: 10px; left: 10px; font-family: Inter;';
        firstCard.style.position = 'relative';
        firstCard.prepend(newBadge);
    }

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
                alert(`Оценка ${val}/5 сохранена для фильма ${movieId}`);
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

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('email');
        
        nameInput.addEventListener('blur', () => {
            clearErrors(nameInput);
            if (!validateName(nameInput.value.trim())) {
                showError(nameInput, "Имя должно содержать только буквы (мин. 2)");
            }
        });

        emailInput.addEventListener('blur', () => {
            clearErrors(emailInput);
            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, "Неверный формат почты");
            }
        });

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            clearErrors(nameInput);
            clearErrors(emailInput);

            const isNameValid = validateName(nameInput.value.trim());
            const isEmailValid = validateEmail(emailInput.value.trim());

            if (isNameValid && isEmailValid) {
                alert(`Поздравляем, ${nameInput.value.toUpperCase()}! Вы успешно подписаны.`);
                profileForm.reset(); 
            } else {
                if (!isNameValid) showError(nameInput, "Проверьте правильность имени");
                if (!isEmailValid) showError(emailInput, "Проверьте правильность почты");
                alert("Пожалуйста, исправьте ошибки в форме.");
            }
        });
    }

    const watchBtn = document.querySelector('.hero__btn--primary');
    if (watchBtn && watchBtn.textContent === 'СМОТРЕТЬ') {
        watchBtn.addEventListener('click', () => {
            openTrailer('https://www.youtube.com/embed/n9xhJrPXop4'); 
        });
    }

    const mainTrailerBtn = document.querySelector('.hero__btns .hero__btn--outline');
    if (mainTrailerBtn && mainTrailerBtn.textContent === 'ТРЕЙЛЕР') {
        mainTrailerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openTrailer('https://www.youtube.com/embed/n9xhJrPXop4');
        });
    }

    const burgerBtn = document.querySelector('.burger-menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeMenu');

    if (burgerBtn && sideMenu) burgerBtn.addEventListener('click', () => sideMenu.classList.add('side-menu--open'));
    if (closeBtn && sideMenu) closeBtn.addEventListener('click', () => sideMenu.classList.remove('side-menu--open'));
    
    document.querySelector('.notify-bell')?.addEventListener('click', () => alert("У вас нет новых уведомлений"));
});