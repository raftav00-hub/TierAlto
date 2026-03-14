/**
 * Mobile navigation toggle + scroll-aware header
 */
export function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const list   = document.querySelector('.nav__list');
  const header = document.querySelector('.site-header');

  if (toggle && list) {
    toggle.addEventListener('click', () => {
      const isOpen = list.dataset.open === 'true';
      list.dataset.open = String(!isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    list.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        list.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
