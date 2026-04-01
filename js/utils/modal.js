export const openTrailer = (videoUrl) => {
    if (!videoUrl) {
        alert("Трейлер недоступен");
        return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); z-index: 10000; display: flex;
        justify-content: center; align-items: center;
    `;

    modal.innerHTML = `
        <div style="position: relative; width: 90%; max-width: 1000px; aspect-ratio: 16/9;">
            <iframe width="100%" height="100%" 
                    src="${videoUrl}" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen></iframe>
            <div id="close-trailer" style="position: absolute; top: -55px; right: 0; color: white; font-size: 60px; cursor: pointer; line-height: 1;">×</div>
        </div>
    `;

    document.body.appendChild(modal);

 
    modal.querySelector('#close-trailer').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
};

export const showAdvancedRecommendation = (movie, trailerCallback) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.92); z-index: 9999; display: flex;
        justify-content: center; align-items: center;
    `;

    modal.innerHTML = `
        <div style="background: #1B0D0F; padding: 35px 40px; border-radius: 24px; text-align: center; 
                    border: 3px solid #9C8A73; max-width: 460px; position: relative;">
            
            <h2 style="color:#9C8A73; font-family:'Iceland'; letter-spacing: 4px; margin-bottom: 20px;">
                РЕКОМЕНДАЦИЯ ДЛЯ ВАС
            </h2>
            
            <img src="${movie.img || ''}" style="width:100%; max-height:260px; object-fit:cover; border-radius:14px; margin:15px 0;" alt="${movie.title}">
            
            <h3 style="color:white; margin:15px 0 8px;">${movie.title}</h3>
            <p style="color:#9C8A73; font-size:18px;">${movie.year} • ${movie.genre}</p>

            <div style="margin-top:30px; display:flex; gap:16px; justify-content:center;">
                <button id="watch-trailer-btn" class="hero__btn hero__btn--primary" style="padding:14px 28px; font-size:16px;">
                    СМОТРЕТЬ ТРЕЙЛЕР
                </button>
                <button id="close-rec-btn" class="hero__btn hero__btn--outline" style="padding:14px 28px; font-size:16px;">
                    ЗАКРЫТЬ
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('watch-trailer-btn').onclick = () => {
        modal.remove();
        trailerCallback(movie.trailer);
    };

    document.getElementById('close-rec-btn').onclick = () => modal.remove();
};