const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuLinks = document.querySelector('.menu-links');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const desktopNav = document.querySelector('#desktop-nav');
const mobileNav = document.querySelector('#hamburger-nav');

hamburgerMenu.addEventListener('click', () => {
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target)) {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
    }
});

// Close menu when clicking a link
const menuItems = document.querySelectorAll('.menu-links a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
    });
});

// Handle scroll event for navbar transparency
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        desktopNav.classList.add('scrolled');
        mobileNav.classList.add('scrolled');
    } else {
        desktopNav.classList.remove('scrolled');
        mobileNav.classList.remove('scrolled');
    }
});
