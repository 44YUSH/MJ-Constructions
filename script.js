document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    function toggleMenu() {
        menuLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu && !hamburgerMenu.contains(e.target)) {
            menuLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const hamburgerNav = document.querySelector('#hamburger-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            hamburgerNav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            hamburgerNav.classList.remove('scrolled');
        }
    });
});
