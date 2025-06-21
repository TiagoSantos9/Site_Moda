
        // Array com os produtos
        let produtos = [
            { id: 1, nome: "Vestido Floral", preco: 89.99, precoOriginal: 119.99, categoria: "feminino", imagem: "img/img7.jpg" },
            { id: 2, nome: "Calça Jeans Feminina", preco: 79.99, categoria: "feminino", imagem: "img/img14.jpg" },
            { id: 3, nome: "Blusa Casual", preco: 45.99, precoOriginal: 59.99, categoria: "feminino", imagem: "img/img12.webp" },
            { id: 4, nome: "Camisa Social Masculina", preco: 69.99, categoria: "masculino", imagem: "img/img9.jpg" },
            { id: 5, nome: "Bermuda Masculina", preco: 55.99, categoria: "masculino", imagem: "img/img10.jpg" },
            { id: 6, nome: "Tênis Esportivo", preco: 159.99, precoOriginal: 199.99, categoria: "masculino", imagem: "img/img1.jpg" },
            { id: 7, nome: "Vestido Infantil", preco: 49.99, categoria: "infantil", imagem: "img/img2.jpg" },
            { id: 8, nome: "Camiseta Infantil", preco: 29.99, categoria: "infantil", imagem: "img/img16.jpg" },
            { id: 9, nome: "Bolsa Feminina", preco: 99.99, precoOriginal: 129.99, categoria: "acessorios", imagem: "img/img13.jpg" },
            { id: 10, nome: "Óculos de Sol", preco: 79.99, categoria: "acessorios", imagem: "img/img5.jpg" },
            { id: 11, nome: "Saia Jeans", preco: 65.99, categoria: "feminino", imagem: "img/img8.jpg" },
            { id: 12, nome: "Jaqueta Masculina", preco: 119.99, precoOriginal: 149.99, categoria: "masculino", imagem: "img/img15.jpeg" },
            { id: 13, nome: "Polo Masculina", preco: 59.99, categoria: "masculino", imagem: "img/img3.jpg" },
            { id: 14, nome: "Shorts Infantil", preco: 35.99, categoria: "infantil", imagem: "img/img11.jpg" },
            { id: 15, nome: "Relógio", preco: 149.99, categoria: "acessorios", imagem: "img/img6.jpg" },
            { id: 16, nome: "Blusa Manga Longa", preco: 39.99, categoria: "feminino", imagem: "img/img4.jpg" },
        ];

        // Variáveis de controle
        let produtosFiltrados = [...produtos];
        let produtosPorPagina = 8;
        let paginaAtual = 1;

        // Função para calcular desconto
        function calcularDesconto(preco, precoOriginal) {
            if (!precoOriginal) return 0;
            return Math.round(((precoOriginal - preco) / precoOriginal) * 100);
        }

        // Função para exibir os produtos
        function mostrarProdutos() {
            const inicio = (paginaAtual - 1) * produtosPorPagina;
            const fim = inicio + produtosPorPagina;
            const produtosPagina = produtosFiltrados.slice(inicio, fim);

            const listaProdutos = document.getElementById('listaProdutos');
            listaProdutos.innerHTML = '';

            produtosPagina.forEach(produto => {
                const desconto = calcularDesconto(produto.preco, produto.precoOriginal);

                const col = document.createElement('div');
                col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

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

                listaProdutos.appendChild(col);
            });

            atualizarInfo();
            criarPaginacao();
        }

        // Função para converter categoria
        function getCategoriaTexto(categoria) {
            const categorias = {
                'feminino': 'Feminino',
                'masculino': 'Masculino',
                'infantil': 'Infantil',
                'acessorios': 'Acessórios'
            };
            return categorias[categoria] || categoria;
        }

        // Função para atualizar informações
        function atualizarInfo() {
            document.getElementById('resultados').textContent = produtosFiltrados.length;
            document.getElementById('paginaAtual').textContent = paginaAtual;
            document.getElementById('totalPaginas').textContent = Math.ceil(produtosFiltrados.length / produtosPorPagina);
        }

        // Função para criar paginação
        function criarPaginacao() {
            const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
            const paginacao = document.getElementById('paginacao');
            paginacao.innerHTML = '';

            // Botão anterior
            const anterior = document.createElement('li');
            anterior.className = `page-item ${paginaAtual === 1 ? 'disabled' : ''}`;
            anterior.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${paginaAtual - 1})">&laquo; Anterior</a>`;
            paginacao.appendChild(anterior);

            // Páginas
            for (let i = 1; i <= totalPaginas; i++) {
                const item = document.createElement('li');
                item.className = `page-item ${i === paginaAtual ? 'active' : ''}`;
                item.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${i})">${i}</a>`;
                paginacao.appendChild(item);
            }

            // Botão próximo
            const proximo = document.createElement('li');
            proximo.className = `page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`;
            proximo.innerHTML = `<a class="page-link" href="#" onclick="mudarPagina(${paginaAtual + 1})">Próximo &raquo;</a>`;
            paginacao.appendChild(proximo);
        }

        // Função para mudar página
        function mudarPagina(novaPagina) {
            const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
            if (novaPagina >= 1 && novaPagina <= totalPaginas) {
                paginaAtual = novaPagina;
                mostrarProdutos();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Função para aplicar filtros
        function aplicarFiltros() {
            const busca = document.getElementById('busca').value.toLowerCase();
            const categoria = document.getElementById('categoria').value;
            const precoMax = parseFloat(document.getElementById('preco').value);
            const ordenacao = document.getElementById('ordenacao').value;

            // Filtrar produtos
            produtosFiltrados = produtos.filter(produto => {
                const passaBusca = produto.nome.toLowerCase().includes(busca);
                const passaCategoria = !categoria || produto.categoria === categoria;
                const passaPreco = produto.preco <= precoMax;

                return passaBusca && passaCategoria && passaPreco;
            });

            // Ordenar produtos
            if (ordenacao === 'nome') {
                produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            } else if (ordenacao === 'preco-menor') {
                produtosFiltrados.sort((a, b) => a.preco - b.preco);
            } else if (ordenacao === 'preco-maior') {
                produtosFiltrados.sort((a, b) => b.preco - a.preco);
            }

            paginaAtual = 1;
            mostrarProdutos();
        }

        // Função para limpar filtros
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

        // Event listeners
        document.getElementById('preco').addEventListener('input', function () {
            document.getElementById('precoValor').textContent = this.value;
        });

        document.getElementById('busca').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                aplicarFiltros();
            }
        });

        // Inicializar a página
        mostrarProdutos();
