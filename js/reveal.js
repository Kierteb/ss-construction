/**
 * Reveal — IntersectionObserver on [data-reveal] elements
 * Respects prefers-reduced-motion
 */
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

function revealAll() {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.add('is-revealed');
  });
}

if (prefersReducedMotion.matches) {
  revealAll();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
