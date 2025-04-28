// tile-modal.js
document.addEventListener('DOMContentLoaded', () => {
    let catalog = {};

    // 1) Все ссылки на элементы модалки и грида
    const grid = document.getElementById('grid');
    const modal = document.getElementById('modal');
    const imgEl = document.getElementById('modal-img');
    const ytEl = document.getElementById('modal-youtube');
    const titleEl = document.getElementById('modal-title');
    const vertsEl = document.getElementById('modal-verts');
    const trisEl = document.getElementById('modal-tris');
    const facesEl = document.getElementById('modal-faces');
    const texUl = document.getElementById('modal-textures');
    const fmtUl = document.getElementById('modal-formats');
    const fabBtn = document.getElementById('link-fab');
    const cgtraderBtn = document.getElementById('link-cgtrader');
    const unityBtn = document.getElementById('link-unity');

    // 2) Загрузка JSON (с cache-busting)
    async function loadCatalog() {
        try {
            const res = await fetch(`assets/electric_plugs/data_electric_plugs.json?cb=${Date.now()}`);
            catalog = await res.json();
            renderTiles();
        } catch (e) {
            console.error('Ошибка загрузки JSON:', e);
        }
    }

    // 3) Рендер плиток в грид
    function renderTiles() {
        grid.innerHTML = '';
        for (const [key, rec] of Object.entries(catalog)) {
            grid.insertAdjacentHTML('beforeend', `
        <div class="tile" data-key="${key}">
          <div class="image-wrapper">
            <img src="${rec.img}" alt="${rec.title}" loading="lazy">
          </div>
          <h4>${rec.title}</h4>
          <div class="links">
            <a href="${rec.store.fab || '#'}" class="store-button${rec.store.fab ? '' : ' disabled'}" title="Fab"         target="_blank"><img src="assets/icons/Fab.png"         alt="Fab"></a>
            <a href="${rec.store.cgtrader || '#'}" class="store-button${rec.store.cgtrader ? '' : ' disabled'}" title="CGTrader"   target="_blank"><img src="assets/icons/CgTrader.png"   alt="CGTrader"></a>
            <a href="${rec.store.unity || '#'}" class="store-button${rec.store.unity ? '' : ' disabled'}" title="Unity Store" target="_blank"><img src="assets/icons/unity.svg"         alt="Unity Store"></a>
          </div>
        </div>`);
        }
        attachTileHandlers();
    }

    // 4) Навешивание логики на каждую плитку
    function attachTileHandlers() {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', () => {
                const rec = catalog[tile.dataset.key];
                if (!rec) return console.warn('Нет записи для', tile.dataset.key);

                // a) Заполняем превью, заголовок, описание
                imgEl.src = rec.img;
                titleEl.textContent = rec.title;
                

                // b) Статы
                vertsEl.textContent = rec.stats.verts;
                trisEl.textContent = rec.stats.tris;
                facesEl.textContent = rec.stats.faces;

                // c) Списки текстур и форматов
                fillList(texUl, rec.textures);
                fillList(fmtUl, rec.formats);

                // d) YouTube-кнопка
                if (rec.youtube) {
                    ytEl.href = rec.youtube;
                    ytEl.style.display = 'inline-flex';
                } else {
                    ytEl.style.display = 'none';
                }

                // e) Store-кнопки
                updateStoreButtons(rec.store);

                // f) Открываем модалку
                modal.classList.add('active');
            });
        });
    }

    // 5) Утилита: заполняет <ul> списком пунктов
    function fillList(ul, items) {
        ul.innerHTML = '';
        items.forEach(it => {
            ul.insertAdjacentHTML('beforeend', `<li>${it}</li>`);
        });
    }

    // 6) Обновление состояния store-кнопок
    function updateStoreButtons(store) {
        // Fab
        toggleButton(fabBtn, store.fab);
        // CGTrader
        toggleButton(cgtraderBtn, store.cgtrader);
        // Unity
        toggleButton(unityBtn, store.unity);
    }
    function toggleButton(btn, url) {
        if (url) {
            btn.href = url;
            btn.classList.remove('disabled');
        } else {
            btn.removeAttribute('href');
            btn.classList.add('disabled');
        }
    }

    // 7) Закрытие модалки
    document.querySelector('.modal .close')
        .addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // 8) Стартуем
    loadCatalog();
});
