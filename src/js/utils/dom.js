/**
 * Write the current year into an element by id.
 * @param {string} id - The element's id attribute value.
 */
export function setCurrentYear(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
}
