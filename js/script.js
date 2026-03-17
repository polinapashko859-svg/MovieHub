document.addEventListener('DOMContentLoaded', () => {
    console.log("MovieHub: Система готова.");

    // 1. ЛОГИКА БУРГЕР-МЕНЮ
    const sideMenu = document.getElementById('sideMenu');
    const burgerBtn = document.querySelector('.burger-menu');
    const closeBtn = document.getElementById('closeMenu');

    if (burgerBtn && sideMenu && closeBtn) {
        burgerBtn.addEventListener('click', () => sideMenu.classList.add('side-menu--open'));
        closeBtn.addEventListener('click', () => sideMenu.classList.remove('side-menu--open'));
        
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                sideMenu.classList.remove('side-menu--open');
            }
        });
    }

    // 2. ЛОГИКА КОЛОКОЛЬЧИКА (УВЕДОМЛЕНИЯ)
    const notifyBtn = document.querySelector('.notify-bell');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            alert("У вас нет новых уведомлений");
        });
    }

    // 3. ЛОГИКА ПЛЕЕРА (И ДЛЯ СМОТРЕТЬ, И ДЛЯ ТРЕЙЛЕР)
    // Находим обе кнопки на главной странице
    const playButtons = document.querySelectorAll('.hero__btn--primary, .hero__btn--outline');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Если это кнопка "ТРЕЙЛЕР" на других страницах, она может вести себя иначе, 
            // но на главной (где есть баннер) мы открываем плеер
            if (document.querySelector('.hero')) {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: black; z-index: 10000; display: flex;
                    justify-content: center; align-items: center; cursor: pointer;
                `;
                overlay.innerHTML = '<div style="width: 0; height: 0; border-top: 40px solid transparent; border-left: 70px solid white; border-bottom: 40px solid transparent;"></div><p style="position:absolute; bottom:50px; color:#9C8A73; font-family:sans-serif;">Нажмите, чтобы закрыть</p>';
                document.body.appendChild(overlay);
                overlay.onclick = () => overlay.remove();
            }
        });
    });
});