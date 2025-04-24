document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close');

    // Добавляем обработчики для всех плиток
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            // Предотвращаем открытие модалки при клике на ссылки
            if (e.target.closest('.links')) {
                return;
            }

            // Получаем данные из плитки
            const tileImg = tile.querySelector('img');
            const img = tileImg.src;
            const title = tile.querySelector('h4').textContent;

            // Очищаем старое изображение
            modalImg.src = '';

            // Устанавливаем новое изображение
            setTimeout(() => {
                modalImg.src = img;
                modalTitle.textContent = title;
                modal.classList.add('active');
            }, 0);
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