export const openTrailer = (videoUrl) => {
    if (!videoUrl) {
        alert("Трейлер недоступен");
        return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); z-index: 10000; display: flex;
        justify-content: center; align-items: center; cursor: pointer;
    `;

    modal.innerHTML = `
        <div style="position: relative; width: 90%; max-width: 1000px; aspect-ratio: 16/9;">
            <iframe width="100%" height="100%" 
                    src="${videoUrl}" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen></iframe>
            <div style="position: absolute; top: -50px; right: 10px; color: white; font-size: 50px; cursor: pointer;">×</div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
};

export const showAdvancedRecommendation = (movie, trailerCallback) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 9999; display: flex;
        justify-content: center; align-items: center;
    `;

    modal.innerHTML = `
        <div style="background: #1B0D0F; padding: 30px; border-radius: 20px; text-align: center; 
                    border: 2px solid #9C8A73; max-width: 420px;">
            <h2 style="color:#9C8A73; font-family:'Iceland'; letter-spacing: 3px;">РЕКОМЕНДАЦИЯ ДЛЯ ВАС</h2>
            <img src="${movie.img || ''}" style="width:100%; max-height:280px; object-fit:cover; border-radius:12px; margin:20px 0;">
            <h3 style="color:white; margin:10px 0;">${movie.title}</h3>
            <p style="color:#9C8A73;">${movie.year} • ${movie.genre}</p>
            <div style="margin-top:25px; display:flex; gap:15px;">
                <button id="watch-trailer-btn" class="hero__btn hero__btn--primary" style="flex:1;">СМОТРЕТЬ ТРЕЙЛЕР</button>
                <button id="close-rec-btn" class="hero__btn hero__btn--outline" style="flex:1;">ЗАКРЫТЬ</button>
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