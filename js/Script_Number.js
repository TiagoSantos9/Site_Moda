document.addEventListener('DOMContentLoaded', () => calculateCartTotal());

function updateSubtotal(input) {
    const row = input.closest('tr');
    const price = parseFloat(row.children[1].innerText.replace('R$', '').replace(',', '.').trim());
    const quantity = parseInt(input.value);
    const subtotal = price * quantity;
    row.children[3].innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    calculateCartTotal();
}

function calculateCartTotal() {
    const subtotals = document.getElementsByClassName('subtotal');
    let total = Array.from(subtotals).reduce((sum, el) => 
        sum + parseFloat(el.innerText.replace('R$', '').replace(',', '.').trim()), 0);
    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateCart() {
    document.querySelectorAll('#cart-body input[type="number"]').forEach(updateSubtotal);
    alert('Carrinho atualizado!');
}

function checkout() {
    alert(`Compra finalizada! ${document.getElementById('cart-total').innerText}.`);
}

function clearCart() {
    document.getElementById('cart-body').innerHTML = '';
    calculateCartTotal();
    alert('Carrinho limpo!');
}
