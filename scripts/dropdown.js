const dropdown = document.querySelector('.dropdown');
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