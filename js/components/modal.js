function openVideoPlayer() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: black; z-index: 10000; display: flex;
        justify-content: center; align-items: center; cursor: pointer;
    `;
    overlay.innerHTML = `
        <div style="width: 0; height: 0; border-top: 40px solid transparent; border-left: 70px solid white; border-bottom: 40px solid transparent;"></div>
        <p style="position:absolute; bottom:50px; color:#9C8A73; font-family:sans-serif;">Нажмите, чтобы закрыть</p>
    `;
    document.body.appendChild(overlay);
    overlay.onclick = () => overlay.remove();
}

export const openTrailer = (videoUrl) => {
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:10000; display:flex; justify-content:center; align-items:center; cursor:pointer;`;
    modal.innerHTML = `
        <div style="position:relative; width:80%; max-width:900px; aspect-ratio:16/9;">
            <iframe width="100%" height="100%" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
            <div style="position:absolute; top:-40px; right:0; color:white; font-size:40px;">&times;</div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = () => modal.remove();
};

export const showAdvancedRecommendation = (movie, trailerCallback) => {
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9000; display:flex; justify-content:center; align-items:center; animation: fadeIn 0.3s ease;`;
    
    modal.innerHTML = `
        <div style="background:#1B0D0F; padding:40px; border-radius:25px; text-align:center; border:2px solid #9C8A73; max-width:380px; position:relative;">
            <h2 style="color:#9C8A73; font-family:'Iceland'; letter-spacing:3px; margin-bottom:5px;">ВАШ ФАВОРИТ</h2>
            <p style="color:white; font-size:12px; opacity:0.5; margin-bottom:20px;">Основано на ваших высоких оценках</p>
            
            <img src="${movie.img}" style="width:100%; height:200px; object-fit:cover; border-radius:15px; margin-bottom:20px; border:1px solid #9C8A73;">
            
            <h3 style="color:white; font-family:'Inter'; font-size:22px; margin:0;">${movie.title}</h3>
            <div style="color:#9C8A73; font-family:'Iceland'; font-size:18px; margin:10px 0;">
                ${movie.year} • ${movie.genre}
            </div>

            <div style="display:flex; gap:10px; margin-top:25px;">
                <button id="watch-trailer-rec" class="hero__btn hero__btn--primary" style="flex:2; padding:12px;">ТРЕЙЛЕР</button>
                <button id="close-rec" class="hero__btn hero__btn--outline" style="flex:1; padding:12px;">&times;</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('watch-trailer-rec').onclick = () => {
        modal.remove();
        trailerCallback(movie.trailer);
    };
    document.getElementById('close-rec').onclick = () => modal.remove();
};
