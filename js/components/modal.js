export const openTrailer = (videoUrl) => {
    if (!videoUrl) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%; 
        background:rgba(0,0,0,0.95); z-index:10000; display:flex; 
        justify-content:center; align-items:center; cursor:pointer;
        animation: fadeIn 0.3s ease;
    `;
    modal.innerHTML = `
        <div style="position:relative; width:80%; max-width:900px; aspect-ratio:16/9;">
            <iframe width="100%" height="100%" src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <div style="position:absolute; top:-50px; right:0; color:white; font-size:40px;">&times;</div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = () => modal.remove();
};

export const showAdvancedRecommendation = (movie, trailerCallback) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%; 
        background:rgba(0,0,0,0.9); z-index:9000; display:flex; 
        justify-content:center; align-items:center;
    `;
    
    modal.innerHTML = `
        <div style="background:#1B0D0F; padding:40px; border-radius:25px; text-align:center; border:2px solid #9C8A73; max-width:380px; box-shadow: 0 0 40px #000;">
            <h2 style="color:#9C8A73; font-family:'Iceland'; letter-spacing:3px;">ВАША РЕКОМЕНДАЦИЯ</h2>
            <img src="${movie.img}" style="width:100%; height:200px; object-fit:cover; border-radius:15px; margin:20px 0; border:1px solid #9C8A73;">
            <h3 style="color:white; font-family:'Inter'; margin:0;">${movie.title}</h3>
            <p style="color:#9C8A73; font-family:'Iceland'; font-size:18px; margin:10px 0;">${movie.year} • ${movie.genre}</p>
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