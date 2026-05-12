/* Theme toggle + search filter for the cheatsheet page. */

const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const sun = document.getElementById('icon-sun');
const moon = document.getElementById('icon-moon');

function syncIcons() {
  if (!sun || !moon) return;
  const dark = html.dataset.theme === 'dark';
  sun.classList.toggle('hidden', dark);
  moon.classList.toggle('hidden', !dark);
}
syncIcons();

themeBtn?.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  try {
    localStorage.setItem('promql-theme', next);
  } catch {}
  syncIcons();
});

/* search filter */
const input = document.getElementById('search') as HTMLInputElement | null;
const rows = Array.from(document.querySelectorAll<HTMLElement>('.row'));
const sections = Array.from(document.querySelectorAll<HTMLElement>('section.cs'));
const main = document.querySelector('main.page');
let emptyEl: HTMLDivElement | null = null;

function filter() {
  if (!input || !main) return;
  const q = input.value.trim().toLowerCase();
  if (!q) {
    rows.forEach((r) => r.classList.remove('dim'));
    sections.forEach((s) => s.classList.remove('dim-section'));
    if (emptyEl) {
      emptyEl.remove();
      emptyEl = null;
    }
    return;
  }
  let any = false;
  rows.forEach((r) => {
    const hay = ((r.dataset.keys || '') + ' ' + r.textContent).toLowerCase();
    const hit = hay.includes(q);
    r.classList.toggle('dim', !hit);
    if (hit) any = true;
  });
  sections.forEach((s) => {
    const visible = Array.from(s.querySelectorAll<HTMLElement>('.row')).some(
      (r) => !r.classList.contains('dim'),
    );
    s.classList.toggle('dim-section', !visible);
  });
  if (!any && !emptyEl) {
    emptyEl = document.createElement('div');
    emptyEl.className = 'empty';
    emptyEl.innerHTML = `No matches. Try <kbd>rate</kbd>, <kbd>histogram</kbd>, or <kbd>label</kbd>.`;
    main.appendChild(emptyEl);
  } else if (any && emptyEl) {
    emptyEl.remove();
    emptyEl = null;
  }
}

input?.addEventListener('input', filter);

window.addEventListener('keydown', (e) => {
  if (!input) return;
  if (e.key === '/' && document.activeElement !== input) {
    const tag = (document.activeElement as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
    input.focus();
  }
  if (e.key === 'Escape' && document.activeElement === input) {
    input.value = '';
    filter();
    input.blur();
  }
});
