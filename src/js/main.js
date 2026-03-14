import { initNav } from './modules/nav.js';
import { setCurrentYear } from './utils/dom.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setCurrentYear('year');
  initScrollReveal();
});
