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

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking main navigation links
        const mainLinks = navMenu.querySelectorAll('a[href="#showcase"], a[href^="https://pavelvesnin.artstation.com"], a[href="#services"]');
        mainLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
});