// Aqui tem um array com os produtos, cada um com id, nome, preço, categoria, imagem e, às vezes, preço original pra mostrar desconto
let produtos = [
    { id: 1, nome: "Vestido Floral", preco: 89.99, precoOriginal: 119.99, categoria: "feminino", imagem: "img/img7.jpg" },
    // ... outros produtos
];

// Variáveis para controlar a lista filtrada, quantos produtos mostrar por página e a página atual que o usuário está vendo
let produtosFiltrados = [...produtos]; // Começa com todos os produtos
let produtosPorPagina = 8;             // Quantos produtos mostrar em cada página
let paginaAtual = 1;                   // Página que está sendo exibida

// Função que calcula o desconto em porcentagem, se tiver preço original
function calcularDesconto(preco, precoOriginal) {
    if (!precoOriginal) return 0; // Se não tiver preço original, não tem desconto
    // Faz a conta do percentual de desconto arredondado
    return Math.round(((precoOriginal - preco) / precoOriginal) * 100);
}

// Função que mostra os produtos na página, com base na página atual e filtro aplicado
function mostrarProdutos() {
    // Calcula onde começar e terminar a fatia da lista de produtos para essa página
    const inicio = (paginaAtual - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = ''; // Limpa o que tinha antes

    // Para cada produto da página atual, cria um card bonitinho com imagem, nome, categoria, preço e desconto se houver
    produtosPagina.forEach(produto => {
        const desconto = calcularDesconto(produto.preco, produto.precoOriginal);

        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4'; // Responsividade com Bootstrap

        // Monta o HTML do card com as infos do produto e o badge de desconto se tiver
        col.innerHTML = `
            <div class="card produto-card h-100">
                <div class="position-relative">
                    <img src="${produto.imagem}" class="card-img-top produto-img" alt="${produto.nome}">
                    ${desconto > 0 ? `<span class="badge bg-danger desconto-badge">-${desconto}%</span>` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${produto.nome}</h6>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="bi bi-tag"></i> ${getCategoriaTexto(produto.categoria)}
                        </small>
                    </p>
                    <div class="mt-auto">
                        ${produto.precoOriginal ? `<p class="preco-original mb-1">De: R$ ${produto.precoOriginal.toFixed(2)}</p>` : ''}
                        <p class="preco-atual mb-3">R$ ${produto.preco.toFixed(2)}</p>
                        <button class="btn btn-primary btn-sm w-100">
                            <i class="bi bi-cart-plus"></i> Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona esse card no container da lista
        listaProdutos.appendChild(col);
    });

    // Atualiza as infos de quantidade total e paginação
    atualizarInfo();
    criarPaginacao();
}

// Função que traduz o código da categoria para texto amigável
function getCategoriaTexto(categoria) {
    const categorias = {
        'feminino': 'Feminino',
        'masculino': 'Masculino',
        'infantil': 'Infantil',
        'acessorios': 'Acessórios'
    };
    return categorias[categoria] || categoria; // Se não tiver no objeto, retorna o que veio mesmo
}

// Atualiza a parte que mostra quantos resultados tem, qual página está e total de páginas
function atualizarInfo() {
    document.getElementById('resultados').textContent = produtosFiltrados.length;
    document.getElementById('paginaAtual').textContent = paginaAtual;
    document.getElementById('totalPaginas').textContent = Math.ceil(produtosFiltrados.length / produtosPorPagina);
}

// Cria a paginação em baixo, com botões para avançar, voltar e números das páginas
function criarPaginacao() {
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
    const paginacao = document.getElementById('paginacao');
    paginacao.innerHTML = ''; // Limpa paginação antiga

    // Botão "Anterior"
    const anterior = document.createElement('li');
    anterior.className = `page-item ${paginaAtual === 1 ? 'disabled' : ''}`; // Desabilita se estiver na primeira página
    anterior.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${paginaAtual - 1})">&laquo; Anterior</a>`;
    paginacao.appendChild(anterior);

    // Botões das páginas
    for (let i = 1; i <= totalPaginas; i++) {
        const item = document.createElement('li');
        item.className = `page-item ${i === paginaAtual ? 'active' : ''}`; // Marca página atual como ativa
        item.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${i})">${i}</a>`;
        paginacao.appendChild(item);
    }

    // Botão "Próximo"
    const proximo = document.createElement('li');
    proximo.className = `page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`; // Desabilita se estiver na última página
    proximo.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${paginaAtual + 1})">Próximo &raquo;</a>`;
    paginacao.appendChild(proximo);
}

// Função que troca a página para a que o usuário clicou (ou avançar/voltar)
function mudarPagina(novaPagina) {
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
    // Verifica se a página é válida antes de trocar
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
        paginaAtual = novaPagina;
        mostrarProdutos(); // Atualiza os produtos da nova página
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta pro topo da página suavemente
    }
}

// Função que aplica os filtros de busca, categoria, preço e ordenação
function aplicarFiltros() {
    // Pega os valores que o usuário colocou nos filtros
    const busca = document.getElementById('busca').value.toLowerCase();
    const categoria = document.getElementById('categoria').value;
    const precoMax = parseFloat(document.getElementById('preco').value);
    const ordenacao = document.getElementById('ordenacao').value;

    // Filtra os produtos que passam em todos os filtros
    produtosFiltrados = produtos.filter(produto => {
        const passaBusca = produto.nome.toLowerCase().includes(busca); // Nome contém o texto da busca?
        const passaCategoria = !categoria || produto.categoria === categoria; // Categoria bate ou filtro vazio?
        const passaPreco = produto.preco <= precoMax; // Preço menor ou igual que o máximo selecionado?

        return passaBusca && passaCategoria && passaPreco; // Só passa se tudo for true
    });

    // Ordena os produtos de acordo com a opção escolhida
    if (ordenacao === 'nome') {
        produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenacao === 'preco-menor') {
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'preco-maior') {
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
    }

    // Reseta para a primeira página depois de filtrar
    paginaAtual = 1;

    // Mostra os produtos filtrados e ordenados
    mostrarProdutos();
}

// Função pra limpar todos os filtros e mostrar tudo de novo
function limparFiltros() {
    document.getElementById('busca').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('preco').value = 500;
    document.getElementById('precoValor').textContent = '500';
    document.getElementById('ordenacao').value = 'nome';

    produtosFiltrados = [...produtos];
    paginaAtual = 1;
    mostrarProdutos();
}

// Event listener pra atualizar o texto do valor do filtro de preço quando o usuário muda o input
document.getElementById('preco').addEventListener('input', function () {
    document.getElementById('precoValor').textContent = this.value;
});

// Event listener pra aplicar o filtro quando o usuário aperta "Enter" no campo de busca
document.getElementById('busca').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        aplicarFiltros();
    }
});

// Inicia a exibição dos produtos assim que a página carregar
mostrarProdutos();
