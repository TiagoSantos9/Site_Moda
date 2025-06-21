document.addEventListener('DOMContentLoaded', () => {
  // Controle de tema claro/escuro
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const lightIcon = themeToggleBtn.querySelector('[data-theme-icon="light"]');
  const darkIcon = themeToggleBtn.querySelector('[data-theme-icon="dark"]');

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'inline-block';
    } else {
      lightIcon.style.display = 'inline-block';
      darkIcon.style.display = 'none';
    }
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
});
