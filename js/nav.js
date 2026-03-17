/**
 * Nav — mobile toggle, scroll state, escape key, focus management
 */
const header = document.querySelector('.header');
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__links');
const overlay = document.querySelector('.nav__overlay');
const SCROLL_THRESHOLD = 60;

function openMenu() {
  if (!menu) return;
  menu.classList.add('is-open');
  if (overlay) overlay.classList.add('is-visible');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const firstLink = menu.querySelector('.nav__link');
  if (firstLink) firstLink.focus();
}

function closeMenu() {
  if (!menu) return;
  menu.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-visible');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  toggle.focus();
}

function isOpen() {
  return menu && menu.classList.contains('is-open');
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen()) {
    closeMenu();
  }
});

/* Scroll state */
function handleScroll() {
  if (!header) return;
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
