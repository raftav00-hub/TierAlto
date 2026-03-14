import { initNav } from './modules/nav.js';
import { setCurrentYear } from './utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setCurrentYear('year');
});
