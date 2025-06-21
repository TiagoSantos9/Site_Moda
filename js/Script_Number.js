// Quando a página terminar de carregar, já calcula o total do carrinho
document.addEventListener('DOMContentLoaded', () => {
    calculateCartTotal();
});

// Atualiza o subtotal daquele produto quando muda a quantidade
function updateSubtotal(inputElement) {
    // Pega a linha inteira onde está o input que mudou
    const row = inputElement.closest('tr');

    // Pega o preço que tá na segunda coluna da linha
    const priceElement = row.children[1];

    // Pega onde o subtotal vai aparecer (quarta coluna)
    const subtotalElement = row.children[3];

    // Pega só o número do preço (tirando o "R$", vírgula, espaços)
    const priceText = priceElement.innerText;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());

    // Pega o número que o usuário colocou na quantidade
    const quantity = parseInt(inputElement.value);

    // Faz a conta do subtotal (preço vezes quantidade)
    const subtotal = price * quantity;

    // Atualiza o subtotal na tela, já com vírgula no lugar do ponto
    subtotalElement.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    // Depois de mudar o subtotal, atualiza o total geral do carrinho também
    calculateCartTotal();
}

// Calcula o total somando todos os subtotais do carrinho
function calculateCartTotal() {
    // Pega a parte da tabela onde estão os itens do carrinho
    const cartBody = document.getElementById('cart-body');

    // Pega todas as células que mostram o subtotal de cada produto
    const subtotalElements = cartBody.getElementsByClassName('subtotal');

    let total = 0; // Começa o total zerado

    // Passa por cada subtotal e soma no total
    for (let i = 0; i < subtotalElements.length; i++) {
        const subtotalText = subtotalElements[i].innerText;
        const subtotal = parseFloat(subtotalText.replace('R$', '').replace(',', '.').trim());
        total += subtotal;
    }

    // Atualiza o texto do total na página, já no formato certo
    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Atualiza o carrinho todo — recalcula todos os subtotais e o total final
function updateCart() {
    // Pega todos os inputs de quantidade que tem na tabela
    const quantityInputs = document.querySelectorAll('#cart-body input[type="number"]');

    // Para cada um, chama a função que atualiza o subtotal
    quantityInputs.forEach(input => updateSubtotal(input));

    alert('Carrinho atualizado!');
}

// Finaliza a compra (só mostrando um alerta com o total)
function checkout() {
    const totalElement = document.getElementById('cart-total');
    const totalText = totalElement.innerText;

    alert(`Compra finalizada! ${totalText}.`);
}

// Limpa o carrinho inteiro (remove todos os itens)
function clearCart() {
    const cartBody = document.getElementById('cart-body');

    // Apaga tudo que tem dentro da tabela do carrinho
    cartBody.innerHTML = '';

    // Atualiza o total (que vai ficar zero)
    calculateCartTotal();

    alert('Carrinho limpo!');
}
