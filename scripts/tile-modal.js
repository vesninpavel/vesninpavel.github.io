const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalLinks = document.getElementById('modal-links');

document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        const img = tile.querySelector('img').src;
        const title = tile.querySelector('h4').textContent;

        // ✅ берём описание из .description блока
        const desc = tile.querySelector('.description')?.innerHTML || 'No description yet.';

        const links = tile.querySelector('.links').innerHTML;

        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.innerHTML = desc;
        modalLinks.innerHTML = links;

        modal.classList.add('active');
    });
});

document.querySelector('.modal .close').addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
