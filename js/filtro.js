// Pegamos os elementos dos controles do filtro (os sliders de preço) e os lugares onde mostramos os valores atuais do filtro
const priceRangeMin = document.getElementById('priceRangeMin'); // slider do preço mínimo
const priceRangeMax = document.getElementById('priceRangeMax'); // slider do preço máximo
const currentPriceMin = document.getElementById('currentPriceMin'); // texto que mostra o valor mínimo selecionado
const currentPriceMax = document.getElementById('currentPriceMax'); // texto que mostra o valor máximo selecionado

// Aqui pegamos todos os cards dos produtos, eles estão dentro do container com id 'novidades-list' e têm a classe 'col-md-4'
const productCards = document.querySelectorAll('#novidades-list > div.col-md-4');

// Essa função vai olhar os valores dos sliders e mostrar/esconder os produtos conforme o preço deles
function updateFilters() {
  // Primeiro, pegamos os valores do mínimo e do máximo selecionados (transformando texto em número)
  const min = parseInt(priceRangeMin.value);
  const max = parseInt(priceRangeMax.value);

  // Atualizamos o texto que mostra os valores atuais para o usuário ver
  currentPriceMin.textContent = min;
  currentPriceMax.textContent = max;

  // Agora para cada card de produto, vamos ver se ele está dentro da faixa de preço escolhida
  productCards.forEach(card => {
    // Pegamos o preço do produto, que está armazenado no atributo 'data-price' do card
    const price = parseInt(card.getAttribute('data-price'));

    // Verificamos se o preço está entre o mínimo e o máximo selecionados
    const matchesPrice = (price >= min && price <= max);

    // Se estiver dentro da faixa, mostramos o produto, se não, escondemos ele
    card.style.display = matchesPrice ? 'block' : 'none';
  });
}

// Essa função cuida de quando o usuário mexe no slider do preço mínimo
function handleMinChange() {
  // Pegamos os valores atuais do mínimo e máximo
  let min = parseInt(priceRangeMin.value);
  let max = parseInt(priceRangeMax.value);

  // Se o mínimo passar do máximo, a gente faz o máximo subir pra ficar igual ao mínimo (não deixa o mínimo passar do máximo)
  if (min > max) {
    priceRangeMax.value = min;
  }

  // Atualiza os produtos na tela com os novos valores
  updateFilters();
}

// Essa função é parecida, mas para o slider do preço máximo
function handleMaxChange() {
  let min = parseInt(priceRangeMin.value);
  let max = parseInt(priceRangeMax.value);

  // Se o máximo ficar menor que o mínimo, a gente faz o mínimo subir pra ficar igual ao máximo (não deixa o máximo ficar menor que o mínimo)
  if (max < min) {
    priceRangeMin.value = max;
  }

  // Atualiza os produtos na tela com os novos valores
  updateFilters();
}

// Aqui a gente fala que, quando o usuário mexer em qualquer um dos sliders, as funções acima devem rodar pra atualizar o filtro
priceRangeMin.addEventListener('input', handleMinChange);
priceRangeMax.addEventListener('input', handleMaxChange);

// Quando a página carregar, já aplica o filtro (com os valores iniciais dos sliders)
updateFilters();
