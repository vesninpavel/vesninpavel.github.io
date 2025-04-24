document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalLinks = modal.querySelector('.modal-details .links');
    const closeBtn = document.querySelector('.close');

    // Добавляем обработчики для всех плиток
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            // Проверяем, не кликнули ли мы по ссылкам
            if (e.target.closest('.links')) {
                return;
            }

            // Получаем данные из плитки
            const tileImg = tile.querySelector('img');
            const img = tileImg.src;
            const title = tile.querySelector('h4').textContent;

            // Очищаем ссылки в модальном окне
            modalLinks.innerHTML = '';

            // Переносим ссылки из плитки в модальное окно
            const tileLinks = tile.querySelector('.links').cloneNode(true);
            Array.from(tileLinks.children).forEach(link => {
                modalLinks.appendChild(link);
            });

            // Обновляем модальное окно
            modalImg.src = img;
            modalTitle.textContent = title;

            // Показываем модалку
            modal.classList.add('active');
        });
    });

    // Закрытие модалки при клике на крестик
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Закрытие модалки при клике вне контента
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});