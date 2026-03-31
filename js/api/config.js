export const API_CONFIG = {
    movie: {
        url: 'https://api.themoviedb.org/3',
        apiKey: '86f0c2bc0a5187988be0ea5dc4cd86fb', 
        endpoints: {
            popular: '/movie/popular',     
            search: '/search/movie',      
            trending: '/trending/movie/day' 
        }
    },

    imgUrl: 'https://image.tmdb.org/t/p/w500',
   
    fallback: {
        title: 'Кино скоро будет...',
        overview: 'К сожалению, не удалось загрузить данные от сервера. Пожалуйста, проверьте интернет-соединение.',
        poster_path: null
    }
};