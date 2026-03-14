/**
 * Mobile navigation toggle
 */
export function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const list   = document.querySelector('.nav__list');

  if (!toggle || !list) return;

  toggle.addEventListener('click', () => {
    const isOpen = list.dataset.open === 'true';
    list.dataset.open        = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close nav when a link is clicked (mobile UX)
  list.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      list.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
