// Load the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-btn');

// Display the cart items
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        checkoutButton.style.display = 'none';
        cartTotal.textContent = 'Total: $0.00'; // Update total to 0
    } else {
        cartEmptyMessage.style.display = 'none';
        checkoutButton.style.display = 'block';

        let totalPrice = 0; // Variable to accumulate the total price

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('cart-item-details');
            itemDetails.innerHTML = `
                <strong>${item.name}</strong>
                <p>Price: $${item.price}</p>
                <div>
                    <label for="quantity-${item.id}">Quantity: </label>
                    <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}" class="cart-item-quantity" />
                    <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
            `;

            const itemTotal = document.createElement('div');
            itemTotal.classList.add('cart-item-total');
            

            itemDiv.append(img, itemDetails, itemTotal);
            cartItemsContainer.append(itemDiv);

              // Update the total price
              totalPrice += item.price * item.quantity;
        });

         // Display the updated total price
         cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Add event listeners to update quantity and remove item
    addCartListeners();
}

// Add event listeners for quantity updates and item removal
function addCartListeners() {
    const quantityInputs = document.querySelectorAll('.cart-item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);
            updateItemQuantity(itemId, newQuantity);
        });
    });

    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            removeItemFromCart(itemId);
        });
    });
}

// Update the quantity of an item in the cart
function updateItemQuantity(itemId, quantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage();
        renderCart();
    }
}

// Remove an item from the cart
function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
    renderCart();
}

// Save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Handle checkout (for now just a simple alert)
checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // You can redirect to a checkout page or create a checkout form here.
});

// Initial render
renderCart();
