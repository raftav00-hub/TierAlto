/**
 * Fade-in elements as they enter the viewport.
 * Add data-reveal (and optionally data-reveal-delay="1–4") to any element.
 */
export function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach(el => observer.observe(el));
}
