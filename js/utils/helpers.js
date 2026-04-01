
const recommendationsDB = {
    "default": {
        title: "10 причин моей ненависти",
        year: "1999",
        genre: "Комедия / Мелодрама",
        img: "https://th.bing.com/th/id/OIP.m2hp4Wvod249wttYXCAWtAHaK5?w=122&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        trailer: "https://www.youtube.com/embed/AWmjzCZr0Jw"
    },
    "438631": {  
        title: "Дюна: Часть вторая",
        year: "2024",
        genre: "Фантастика / Приключения",
        img: "https://image.tmdb.org/t/p/w500/1XDDXPXGiStG15wdN3p4y8f1c8x.jpg",
        trailer: "https://www.youtube.com/embed/8g1a6q5z0bM"
    },
    "693134": {  
        title: "Дюна",
        year: "2021",
        genre: "Фантастика",
        img: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        trailer: "https://www.youtube.com/embed/n9xhJrPXop4"
    },
    "27205": {   
        title: "Начало",
        year: "2010",
        genre: "Фантастика / Боевик",
        img: "https://image.tmdb.org/t/p/w500/9gk7adHYe7Tj6l1z0w5f0gL7j2.jpg",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    "155": {     
        title: "Тёмный рыцарь",
        year: "2008",
        genre: "Боевик / Драма",
        img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    }
};

export const getRecommendationByRating = () => {
    try {
        let maxRating = 0;
        let topMovieIds = [];


        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            if (key && key.startsWith('rating-')) {
                const rating = parseInt(localStorage.getItem(key));
                const movieId = key.replace('rating-', '');

                if (rating > maxRating) {
                    maxRating = rating;
                    topMovieIds = [movieId];
                } else if (rating === maxRating && maxRating > 0) {
                    topMovieIds.push(movieId);
                }
            }
        }

        if (topMovieIds.length === 0 || maxRating === 0) {
            return recommendationsDB.default;
        }

        
        const randomId = topMovieIds[Math.floor(Math.random() * topMovieIds.length)];

        
        if (recommendationsDB[randomId]) {
            return recommendationsDB[randomId];
        }

        
        const allKeys = Object.keys(recommendationsDB).filter(key => key !== 'default');
        const randomFallbackId = allKeys[Math.floor(Math.random() * allKeys.length)];
        
        return recommendationsDB[randomFallbackId];

    } catch (error) {
        console.error("Ошибка при получении рекомендации:", error);
        return recommendationsDB.default;
    }
};


export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateName = (name) => /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name) && name.length >= 2;

export const showError = (element, message) => {
    clearErrors(element);
    if (!element) return;
    element.style.borderColor = '#F40007';
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.cssText = 'color:#F40007; font-size:12px; margin-top:5px;';
    error.textContent = message;
    element.parentNode.appendChild(error);
};

export const clearErrors = (element) => {
    if (!element) return;
    element.style.borderColor = '';
    const error = element.parentNode.querySelector('.error-message');
    if (error) error.remove();
};