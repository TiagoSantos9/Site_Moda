// Pegando os sliders e textos dos preços
const priceRangeMin = document.getElementById('priceRangeMin');
const priceRangeMax = document.getElementById('priceRangeMax');
const currentPriceMin = document.getElementById('currentPriceMin');
const currentPriceMax = document.getElementById('currentPriceMax');

// Pegando todos os cards de produtos
const productCards = document.querySelectorAll('#novidades-list > div.col-md-4');

// Atualiza os produtos conforme o filtro de preço
function updateFilters() {
  const min = parseInt(priceRangeMin.value);
  const max = parseInt(priceRangeMax.value);

  currentPriceMin.textContent = min;
  currentPriceMax.textContent = max;

  productCards.forEach(card => {
    const price = parseInt(card.getAttribute('data-price'));
    const matchesPrice = (price >= min && price <= max);
    card.style.display = matchesPrice ? 'block' : 'none';
  });
}

// Se o mínimo passar do máximo, ajusta
function handleMinChange() {
  let min = parseInt(priceRangeMin.value);
  let max = parseInt(priceRangeMax.value);

  if (min > max) {
    priceRangeMax.value = min;
  }

  updateFilters();
}

// Se o máximo ficar menor que o mínimo, ajusta
function handleMaxChange() {
  let min = parseInt(priceRangeMin.value);
  let max = parseInt(priceRangeMax.value);

  if (max < min) {
    priceRangeMin.value = max;
  }

  updateFilters();
}

// Eventos dos sliders
priceRangeMin.addEventListener('input', handleMinChange);
priceRangeMax.addEventListener('input', handleMaxChange);

// Atualiza na carga inicial
updateFilters();
