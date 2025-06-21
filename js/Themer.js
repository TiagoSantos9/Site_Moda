document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const lightIcon = themeToggleBtn.querySelector('[data-theme-icon="light"]');
  const darkIcon = themeToggleBtn.querySelector('[data-theme-icon="dark"]');

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'inline-block';
    } else {
      lightIcon.style.display = 'inline-block';
      darkIcon.style.display = 'none';
    }
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  const categoryLinks = document.querySelectorAll('.sidebar a[data-category]');
  const novidadesList = document.getElementById('novidades-list');
  const novidadesCards = novidadesList ? novidadesList.querySelectorAll('.col-md-4[data-category]') : [];

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedCategory = link.getAttribute('data-category');

      novidadesCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const isVisibleByPrice = card.style.display !== 'none';

        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          if (isVisibleByPrice) {
            card.style.display = 'block';
          }
        } else {
          card.style.display = 'none';
        }
      });

      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updatePriceRange();
    });
  });

  const priceRangeMin = document.getElementById('priceRangeMin');
  const priceRangeMax = document.getElementById('priceRangeMax');
  const currentPriceMinSpan = document.getElementById('currentPriceMin');
  const currentPriceMaxSpan = document.getElementById('currentPriceMax');

  const updatePriceRange = () => {
    let minVal = parseInt(priceRangeMin.value);
    let maxVal = parseInt(priceRangeMax.value);

    if (minVal > maxVal) {
      [minVal, maxVal] = [maxVal, minVal];
      priceRangeMin.value = minVal;
      priceRangeMax.value = maxVal;
    }

    currentPriceMinSpan.textContent = minVal;
    currentPriceMaxSpan.textContent = maxVal;

    const activeCategoryLink = document.querySelector('.sidebar a.active');
    const activeCategory = activeCategoryLink ? activeCategoryLink.getAttribute('data-category') : 'all';

    novidadesCards.forEach(card => {
      const cardPrice = parseInt(card.getAttribute('data-price'));
      const cardCategory = card.getAttribute('data-category');

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesPrice = (cardPrice >= minVal && cardPrice <= maxVal);

      if (matchesCategory && matchesPrice) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (priceRangeMin && priceRangeMax) {
    priceRangeMin.addEventListener('input', updatePriceRange);
    priceRangeMax.addEventListener('input', updatePriceRange);
    updatePriceRange();
  }

  const allCategoryLink = document.querySelector('.sidebar a[data-category="all"]');
  if (allCategoryLink) {
    allCategoryLink.classList.add('active');
  } else {
    if (categoryLinks.length > 0) {
      categoryLinks[0].classList.add('active');
    }
  }

  // --- Shopping Cart Functions ---

  // Function to update the subtotal for a single item and recalculate the total
  window.updateSubtotal = (inputElement) => {
    const row = inputElement.closest('tr');
    const priceCell = row.children[1]; // Second column is price
    const subtotalCell = row.children[3]; // Fourth column is subtotal

    const priceText = priceCell.textContent.replace('R$', '').replace(',', '.').trim();
    const price = parseFloat(priceText);
    const quantity = parseInt(inputElement.value);

    if (!isNaN(price) && !isNaN(quantity) && quantity >= 1) {
      const subtotal = price * quantity;
      subtotalCell.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    } else {
      // Handle invalid input, maybe reset to 1 or show an error
      inputElement.value = 1;
      updateSubtotal(inputElement); // Recalculate with default value
    }
    updateCartTotal();
  };

  // Function to calculate and display the overall cart total
  const updateCartTotal = () => {
    let total = 0;
    document.querySelectorAll('#cart-body .subtotal').forEach(subtotalCell => {
      const subtotalText = subtotalCell.textContent.replace('R$', '').replace(',', '.').trim();
      total += parseFloat(subtotalText);
    });
    document.getElementById('cart-total').textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  };

  // Function to simulate updating the cart (e.g., saving to local storage or sending to server)
  window.updateCart = () => {
    alert('Carrinho atualizado! (Funcionalidade a ser implementada)');
    // In a real application, you would:
    // 1. Get all current item quantities.
    // 2. Save them to localStorage or send them to a backend.
    // 3. Potentially re-render the cart if needed.
  };

  // Function to simulate checkout process
  window.checkout = () => {
    alert('Finalizando compra! (Redirecionamento para pagamento/confirmação)');
    // In a real application, you would:
    // 1. Collect all cart data.
    // 2. Redirect to a checkout page or initiate a payment process.
  };

  // Function to clear the cart
  window.clearCart = () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      const cartBody = document.getElementById('cart-body');
      cartBody.innerHTML = ''; // Remove all rows
      updateCartTotal(); // Recalculate total (which will now be 0)
      alert('Carrinho limpo!');
      // You might also clear items from localStorage or session storage here.
    }
  };

  // Initial calculation of the cart total when the page loads
  updateCartTotal();
});