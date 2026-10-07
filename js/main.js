// Nav scroll state
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header && header.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');
if (menuBtn) menuBtn.addEventListener('click', () => menu.classList.add('open'));
if (closeMenu) closeMenu.addEventListener('click', () => menu.classList.remove('open'));
if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('figure, .fade').forEach(el => io.observe(el));
