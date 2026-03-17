/**
 * Tracking — GA4 event firing on phone clicks and primary CTAs
 */
function sendEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

/* Phone link clicks */
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    sendEvent('phone_click', {
      event_category: 'contact',
      event_label: link.href,
    });
  });
});

/* Primary CTA button clicks */
document.querySelectorAll('.button--accent').forEach((btn) => {
  btn.addEventListener('click', () => {
    sendEvent('cta_click', {
      event_category: 'engagement',
      event_label: btn.textContent.trim(),
    });
  });
});
