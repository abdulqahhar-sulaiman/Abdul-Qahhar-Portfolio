// ============================================================
// MOBILE MENU TOGGLE
// ============================================================

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

// Opens or closes the menu. isOpen: true = open, false = closed.
function setMenuOpen(isOpen) {
  siteNav.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.textContent = isOpen ? 'Close' : 'Menu';
}

navToggle.addEventListener('click', () => {
  const isCurrentlyOpen = siteNav.classList.contains('is-open');
  setMenuOpen(!isCurrentlyOpen);
});

// Close the menu when a link inside it is clicked, so it doesn't
// cover the section you just jumped to.
const navLinks = siteNav.querySelectorAll('a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// ============================================================
// DARK / LIGHT MODE TOGGLE
// ============================================================

const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-toggle__label');
const themeIcon = document.querySelector('.theme-toggle__icon');

// Prefixed to avoid clashing with any other data stored on this domain.
const STORAGE_KEY = 'aq-portfolio-theme';

// Priority: a saved choice from a past visit, then the OS/browser setting.
function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? 'dark' : 'light';
}

// Updates the HTML, the button, and saves the choice for next time.
function applyTheme(theme) {
  const isDark = theme === 'dark';

  // data-theme="dark" is what makes the [data-theme="dark"] CSS rules
  // take effect, swapping every --color- variable at once.
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  themeToggle.setAttribute('aria-pressed', isDark);
  themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';   // shows the action, not the state
  themeIcon.textContent = isDark ? '☀️' : '🌙';

  localStorage.setItem(STORAGE_KEY, theme);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
});

// ============================================================
// FADE-IN ON SCROLL
// ============================================================

const fadeElements = document.querySelectorAll('.fade-in');

// Watches elements and runs the callback whenever one enters/exits
// the viewport, without writing manual scroll math.
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);   // only needs to fade in once
      }
    });
  },
  { threshold: 0.15 }   // fire once 15% of the element is visible
);

fadeElements.forEach((el) => fadeObserver.observe(el));