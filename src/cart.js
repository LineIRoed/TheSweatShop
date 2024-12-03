// Load the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// get DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-btn');

// Display the cart items, render products
function renderCart() {
    // Clearing the cart container
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartEmptyMessage.style.display = "block";
        checkoutButton.style.display = "none";
        // Updates total to 0
        cartTotal.textContent = "Total: $0.00";
    } else {
        cartEmptyMessage.style.display = "none";
        checkoutButton.style.display = "block";

        // Changes the total price for items added
        let totalPrice = 0;

        //create elements for cart
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            
            const img = document.createElement("img");
            img.src = item.imageUrl;
            img.alt = item.name;

            const itemDetails = document.createElement("div");
            itemDetails.classList.add("cart-item-details");
            itemDetails.innerHTML = `
                <strong>${item.name}</strong>
                <p>Price: $${item.price}</p>
                <div>
                    <label for="quantity-${item.id}">Quantity: </label>
                    <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}" class="cart-item-quantity" />
                    <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
            `;

            const itemTotal = document.createElement("div");
            itemTotal.classList.add("cart-item-total");
            

            itemDiv.append(img, itemDetails, itemTotal);
            cartItemsContainer.append(itemDiv);

              // Updates the total price
              totalPrice += item.price * item.quantity;
        });

         // Show updated total price
         cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Event listener for update quantity and remove item
    addCartListeners();
}

// Event listener for update quantity and remove item
function addCartListeners() {
    const quantityInputs = document.querySelectorAll('.cart-item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);
            updateItemQuantity(itemId, newQuantity);
        });
    });

//remove item button
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const itemId = parseInt(e.target.dataset.id);
            removeItemFromCart(itemId);
        });
    });
}

// Updates quantity of an item in the cart
function updateItemQuantity(itemId, quantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage();
        renderCart();
    }
}

// Removes item from the cart
function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
    renderCart();
}

// Save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// checkout message
checkoutButton.addEventListener("click", () => {
    alert("Thank you for your purchase");
});

// Render cart
renderCart();
