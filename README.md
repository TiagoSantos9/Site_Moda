Feito por: Alex, Tiago, Douglas, e jackeson


# 🛍️ Catálogo de Produtos - Projeto Web

Projeto desenvolvido como catálogo de produtos para uma loja, com páginas de navegação, detalhes dos produtos e carrinho de compras.

## 🚀 Tecnologias, Frameworks e Ferramentas

- **HTML5** – Estrutura das páginas
- **CSS3** – Estilização (interna e externa)
- **JavaScript (Vanilla)** – Funcionalidades interativas (ex.: carrinho, filtros)
- **Bootstrap 5** – Framework CSS para layout responsivo
- **VSCode** – Ambiente de desenvolvimento recomendado
- **Google Chrome / Edge / Firefox** – Navegadores recomendados para testes

## 🗂️ Estrutura de Pastas

```
📁 E-commerce-moda/
│
├── 📁 img/                # Imagens utilizadas no site
│
├── 📄 Home.html            # Página inicial
├── 📄 catalogo de Produtos.html  # Catálogo de produtos
├── 📄 Detalhe de Produtos.html   # Página de detalhe de um produto
├── 📄 Carrinho.html        # Página do carrinho
│
└── 📄 README.md            # Documentação do projeto
```

## ⚙️ Instalação e Execução Local

1. **Clone ou baixe o repositório:**

```bash
git clone https://github.com/TiagoSantos9/Site_Moda
```
ou baixe o arquivo `.zip` e extraia.

2. **Abra a pasta do projeto no VSCode ou outro editor.**

3. **Execute localmente:**
- Clique duas vezes no arquivo `Home.html` **ou**
- No VSCode, utilize a extensão [Live Server]e clique em "Go Live".

## 🏗️ Scripts de Build, Lint e Testes

Como se trata de um projeto HTML, CSS e JS puro (sem backend), não há necessidade de build. No entanto, você pode adicionar boas práticas:

- **Lint CSS:** Ferramentas como [Stylelint](https://stylelint.io/)
- **Lint JS:** Usar [ESLint](https://eslint.org/) com regras padrão
- **Formatação:** Usar [Prettier](https://prettier.io/) para padronizar o código

### ✔️ Sugestão de script no VSCode (`package.json` opcional com Node.js):

```json
{
  "scripts": {
    "lint:css": "stylelint '**/*.css'",
    "lint:js": "eslint '**/*.js'",
    "format": "prettier --write ."
  }
}
```

## 🎯 Decisões de Design

- Uso do **Bootstrap 5** para garantir responsividade rápida, sem necessidade de muito código CSS manual.
- Estrutura simples, cada página tem seu próprio contexto (Home, Catálogo, Detalhe e Carrinho).
- Imagens organizadas na pasta `img` para facilitar manutenções.
- JavaScript simples diretamente nas páginas para funcionalidades como:
  - Adicionar produtos ao carrinho
  - Calcular subtotal e total
  - Trocar imagens na página de detalhes

## 🔥 Melhorias Futuras (Sugestões)

- Adicionar um backend (Node.js, Python, PHP) para gerenciar produtos e carrinho de forma dinâmica.
- Implementar banco de dados para persistência.
- Inserir login de usuário e sistema de pedidos.
- Melhorar acessibilidade (teclado, leitores de tela).
- Otimizar SEO (Search Engine Optimization).

## 🧑‍💻 Convenções de Código

- HTML semântico e indentado (2 ou 4 espaços)
- Nomes de classes CSS em inglês e no padrão `kebab-case` (ex.: `.product-card`)
- JavaScript comentado e organizado por funções
- Separação de responsabilidades (estrutura - HTML, estilo - CSS, comportamento - JS)
