const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalLinks = document.getElementById('modal-links');

document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        const img = tile.querySelector('img').src;
        const title = tile.querySelector('h4').textContent;
        const desc = tile.dataset.description || 'No description yet.';
        const links = tile.querySelector('.links').innerHTML;

        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalLinks.innerHTML = links;

        modal.classList.add('active');     // ⬅️ заменить на 'active'
    });
});

document.querySelector('.modal .close').addEventListener('click', () => {
    modal.classList.remove('active');      // ⬅️ тоже заменить
});

// Закрытие по фону
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
