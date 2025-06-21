document.addEventListener('DOMContentLoaded', () => {
  // --- CONTROLE DE TEMA CLARO/ESCURO ---

  // Pega o botão que vai trocar o tema (claro/escuro)
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Pega o elemento <html> pra mudar o atributo do tema
  const htmlElement = document.documentElement;

  // Pega os ícones que ficam no botão pra mostrar qual tema tá ativo
  const lightIcon = themeToggleBtn.querySelector('[data-theme-icon="light"]');
  const darkIcon = themeToggleBtn.querySelector('[data-theme-icon="dark"]');

  // Função que aplica o tema escolhido e mostra/esconde os ícones certinho
  function applyTheme(theme) {
    // Muda o atributo data-theme do <html> (isso ativa o CSS do tema)
    htmlElement.setAttribute('data-theme', theme);

    // Se for tema escuro, esconde o ícone do claro e mostra o do escuro
    if (theme === 'dark') {
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'inline-block';
    } else {
      // Se for claro, faz o contrário
      lightIcon.style.display = 'inline-block';
      darkIcon.style.display = 'none';
    }

    // Guarda o tema escolhido no localStorage pra lembrar na próxima visita
    localStorage.setItem('theme', theme);
  }

  // Aqui tenta carregar o tema salvo no navegador
  const savedTheme = localStorage.getItem('theme');

  // Ou pega a preferência do sistema do usuário (se ele usa o tema escuro no SO)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Se já tem tema salvo, usa ele
  if (savedTheme) {
    applyTheme(savedTheme);
  // Se não, mas o sistema prefere escuro, usa escuro
  } else if (prefersDark) {
    applyTheme('dark');
  // Se nada disso, usa o tema claro como padrão
  } else {
    applyTheme('light');
  }

  // Quando o usuário clicar no botão, troca o tema pro oposto do atual
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

});
