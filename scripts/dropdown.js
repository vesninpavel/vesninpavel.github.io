const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  let timer;
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    dropdown.classList.add('open');
  });

  dropdown.addEventListener('mouseleave', () => {
    timer = setTimeout(() => {
      dropdown.classList.remove('open');
    }, 200);
  });
});