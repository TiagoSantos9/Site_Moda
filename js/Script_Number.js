document.addEventListener('DOMContentLoaded', () => {
    calculateCartTotal();
});

function updateSubtotal(inputElement) {
    const row = inputElement.closest('tr');
    const priceElement = row.children[1]; // Second column is Price
    const subtotalElement = row.children[3]; // Fourth column is Subtotal

    const priceText = priceElement.innerText;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const quantity = parseInt(inputElement.value);

    const subtotal = price * quantity;
    subtotalElement.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    calculateCartTotal();
}

function calculateCartTotal() {
    const cartBody = document.getElementById('cart-body');
    const subtotalElements = cartBody.getElementsByClassName('subtotal');
    let total = 0;

    for (let i = 0; i < subtotalElements.length; i++) {
        const subtotalText = subtotalElements[i].innerText;
        const subtotal = parseFloat(subtotalText.replace('R$', '').replace(',', '.').trim());
        total += subtotal;
    }

    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateCart() {
    // This function will re-calculate all subtotals and the total.
    // It's useful if you were to add/remove items dynamically
    // or if the user clicks an "Update" button to confirm changes.
    const quantityInputs = document.querySelectorAll('#cart-body input[type="number"]');
    quantityInputs.forEach(input => updateSubtotal(input));
    alert('Carrinho atualizado!');
}

function checkout() {
    const totalElement = document.getElementById('cart-total');
    const totalText = totalElement.innerText;
    alert(`Compra finalizada! ${totalText}.`);
}

function clearCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Clears all rows from the cart
    calculateCartTotal(); // Recalculates total, which will now be R$ 0,00
    alert('Carrinho limpo!');
}