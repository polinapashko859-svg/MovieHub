function logAppStatus(message) {
    console.log(`[MovieHub Log]: ${message}`);
}

const recommendationsDB = {
    "main-dune": { 
        title: "Интерстеллар", 
        year: "2014", 
        genre: "Фантастика",
        img: "https://th.bing.com/th/id/OIP.gPBgZi9JjsirDSWzQn_n_wHaEo?w=276&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E" 
    },
    "1": { 
        title: "Паразиты", 
        year: "2019", 
        genre: "Триллер / Драма",
        img: "https://tse4.mm.bing.net/th/id/OIP.8bYm31uPVlUPB-V80fmGCgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", 
        trailer: "https://www.youtube.com/embed/5xH0HfJHsaY" 
    },
    "2": { 
        title: "Стражи Галактики", 
        year: "2014", 
        genre: "Приключения / Фантастика",
        img: "https://th.bing.com/th/id/OIP.e6gG7nNcWHrTf1RXFsX8HgHaIm?w=155&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
        trailer: "https://www.youtube.com/embed/d96cjJhvlMA" 
    },
    "3": { 
        title: "Гордость и предубеждение", 
        year: "2005", 
        genre: "Мелодрама / Драма",
        img: "https://th.bing.com/th/id/OIP.rv-yIcALWpWHt8gdv_5ffgHaLH?w=120&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
        trailer: "https://www.youtube.com/embed/1dYv5u6v55Y" 
    },
    "4": { 
        title: "Игра в имитацию", 
        year: "2014", 
        genre: "Биография / Драма",
        img: "https://th.bing.com/th/id/OIP.YWgOedOMhUfako8svX9smwHaLH?w=129&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
        trailer: "https://www.youtube.com/embed/mK_U3_Z673Y" 
    },
    "default": { 
        title: "10 причин моей ненависти", 
        year: "1999", 
        genre: "Комедия / Мелодрама",
        img: "https://th.bing.com/th/id/OIP.m2hp4Wvod249wttYXCAWtAHaK5?w=122&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
        trailer: "https://www.youtube.com/embed/AWmjzCZr0Jw" 
    }
};

export const getRecommendationByRating = () => {
    let maxRating = 0;
    let topMovieIds = [];

   
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('rating-')) {
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

    
    if (topMovieIds.length === 0) return recommendationsDB.default;

    
    const randomId = topMovieIds[Math.floor(Math.random() * topMovieIds.length)];
    return recommendationsDB[randomId] || recommendationsDB.default;
};


export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const showError = (element, message) => {
    element.style.borderColor = '#F40007';
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.cssText = 'color:#F40007; font-size:12px; margin-top:5px;';
    error.textContent = message;
    element.parentNode.appendChild(error);
};

export const clearErrors = (element) => {
    element.style.borderColor = '';
    const error = element.parentNode.querySelector('.error-message');
    if (error) error.remove();
};


