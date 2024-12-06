//Loading the cart from the local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Getting DOM elements
const cartItemsContainer = document.getElementById("cart__items-container");
const cartEmptyMessage = document.getElementById("cart__empty-message");
const cartTotal = document.getElementById("cart__total");
const checkoutBtn = document.getElementById("checkout__btn");

//Showing cart items, Rendering products
function renderCart() {
    //clearing the cart container
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartEmptyMessage.style.display = "block";
        checkoutBtn.style.display = "none";
        //updates total to 0
        cartTotal.textContent = "Total: $0.00";
    } else {
        cartEmptyMessage.style.display = "none";
        checkoutBtn.style.display = "block";

        //changes the total price for items added
        let totalPrice = 0;

        //creating elements for the cart
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart__item");
            
            const img = document.createElement("img");
            img.src = item.imageUrl;
            img.alt = item.name;

            //code from here has been created with help from ChatGpt
            const itemDetails = document.createElement("div");
            itemDetails.classList.add("cart__item-details");
            itemDetails.innerHTML = `
                <strong>${item.name}</strong>
                <p>Price: $${item.price}</p>
                <div>
                    <label for="quantity-${item.id}">Quantity: </label>
                    <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}" class="cart__item-quantity" />
                    <button class="remove-item__btn" data-id="${item.id}">Remove</button>
                </div>
            `;
        
            // ChatGpt ends here

            const itemTotal = document.createElement("div");
            itemTotal.classList.add("cart__item-total");

            itemDiv.append(img, itemDetails, itemTotal);
            cartItemsContainer.append(itemDiv);

                //updates the total price, also made with help from ChatGpt
                totalPrice += item.price * item.quantity;
        });

        // Show updated total price, also made with help from ChatGpt
        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    // Event listener for update quantity and remove items
    addCartListener();
}

// Event listener for update quantity and remove items
function addCartListener() {
    const quantityInputs = document.querySelectorAll(".cart__item-quantity");
    quantityInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const newQuantity = parseInt (e.target.value);
            updateItemQuantity(itemId, newQuantity);
        });
    });

    // Remove items button
    const removeBtn = document.querySelectorAll(".remove-item__btn");
    removeBtn.forEach(button => {
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

// Saving the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Checkout message
checkoutBtn.addEventListener("click", () => {
    alert("Thank You for your purchase");
    saveCartToLocalStorage();
    renderCart();

    //clearing the cart after checkout
    cart = [];

    //removing the cart from local storage
    localStorage.removeItem("cart");

    // Re-renders the cart to empty
    renderCart();
});

console.log(localStorage);

// Render cart
renderCart();

