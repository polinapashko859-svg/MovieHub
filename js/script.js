console.log("MovieHub: Система готова.");

const playBtn = document.getElementById('welcomeBtn');

playBtn.addEventListener('click', () => {
    
    const playerOverlay = document.createElement('div');
    playerOverlay.style.position = 'fixed';
    playerOverlay.style.top = '0';
    playerOverlay.style.left = '0';
    playerOverlay.style.width = '100%';
    playerOverlay.style.height = '100%';
    playerOverlay.style.backgroundColor = 'black';
    playerOverlay.style.zIndex = '2000';
    playerOverlay.style.display = 'flex';
    playerOverlay.style.justifyContent = 'center';
    playerOverlay.style.alignItems = 'center';
    playerOverlay.style.cursor = 'pointer';

    playerOverlay.innerHTML = `
        <div style="width: 0; height: 0; border-top: 50px solid transparent; border-left: 80px solid white; border-bottom: 50px solid transparent;"></div>
        <p style="position: absolute; bottom: 20px; color: gray;">Нажмите, чтобы закрыть плеер</p>
    `;

    document.body.appendChild(playerOverlay);

    
    playerOverlay.onclick = () => {
        playerOverlay.remove();
    };
});