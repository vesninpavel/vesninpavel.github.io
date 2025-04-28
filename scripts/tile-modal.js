// tile-modal.js
document.addEventListener('DOMContentLoaded', () => {
    let catalog = {};

    // Функция загрузки JSON-а с cache-busting
    function loadCatalog() {
        fetch(`assets/electric_plugs/data_electric_plugs.json?cb=${Date.now()}`)
            .then(r => r.json())
            .then(json => {
                catalog = json;
                console.log('Catalog loaded:', catalog);
            })
            .catch(e => console.error('Ошибка загрузки JSON:', e));
    }

    // Сразу загружаем при старте
    loadCatalog();

    // Получаем все нужные элементы
    const fabBtn = document.getElementById('link-fab');
    const cgtraderBtn = document.getElementById('link-cgtrader');
    const unityBtn = document.getElementById('link-unity');
    const tiles = document.querySelectorAll('.tile');
    const modal = document.getElementById('modal');
    const imgEl = document.getElementById('modal-img');
    const ytEl = document.getElementById('modal-youtube');
    const titleEl = document.getElementById('modal-title');
    const vertsEl = document.getElementById('modal-verts');
    const trisEl = document.getElementById('modal-tris');
    const facesEl = document.getElementById('modal-faces');
    const texUl = document.getElementById('modal-textures');
    const fmtUl = document.getElementById('modal-formats');
    const linksEl = document.getElementById('modal-links');

    // Обработчик клика по плитке
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const rec = catalog[tile.dataset.key];
            if (!rec) return console.warn('Нет записи для', tile.dataset.key);

            imgEl.src = rec.img;
            titleEl.textContent = rec.title;
            vertsEl.textContent = rec.stats.verts;
            trisEl.textContent = rec.stats.tris;
            facesEl.textContent = rec.stats.faces;
            fillList(texUl, rec.textures);
            fillList(fmtUl, rec.formats);

            // YouTube
            if (rec.youtube) {
                ytEl.href = rec.youtube;
                ytEl.style.display = 'inline-flex';
            } else {
                ytEl.style.display = 'none';
            }

            // store-кнопки
            updateStoreButtons(rec.store);

            modal.classList.add('active');
        });
    });

    // Утилиты
    function fillList(ul, items) {
        ul.innerHTML = '';
        items.forEach(it => ul.insertAdjacentHTML('beforeend', `<li>• ${it}</li>`));
    }
    function updateStoreButtons(store) {
        // Fab
        if (store.fab) {
            fabBtn.href = store.fab;
            fabBtn.classList.remove('disabled');
        } else {
            fabBtn.removeAttribute('href');
            fabBtn.classList.add('disabled');
        }
        // CGTrader
        if (store.cgtrader) {
            cgtraderBtn.href = store.cgtrader;
            cgtraderBtn.classList.remove('disabled');
        } else {
            cgtraderBtn.removeAttribute('href');
            cgtraderBtn.classList.add('disabled');
        }
        // Unity
        if (store.unity) {
            unityBtn.href = store.unity;
            unityBtn.classList.remove('disabled');
        } else {
            unityBtn.removeAttribute('href');
            unityBtn.classList.add('disabled');
        }
    }

    // Закрытие
    document.querySelector('.modal .close')
        .addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

    // (Опционально) Можете вызвать loadCatalog() снова из консоли, чтобы подхватить новые данные JSON:
    window.loadCatalog = loadCatalog;
});
