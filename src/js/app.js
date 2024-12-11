//array clothing items
const clothingItems = [
    {
        id: 1,
        name: "Jessica`s Baggy Jeans",
        category: "Pants",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Light Wash", "Dark Wash", "Black"],
        imageUrl: "./assets/images/baggy_jeans.webp",
        dateAdded: "2024-01-01"
    },
    {
        id: 2,
        name: "Sarah`s Butterfly Dress",
        category: "Dresses",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Blue", "White"],
        imageUrl: "./assets/images/butterfly_dress.webp",
        dateAdded: "2024-01-02"
    },
    {
        id: 3,
        name: "Nora`s Denim Coat",
        category: "Jackets",
        price: 40,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Black", "Tan"],
        imageUrl: "./assets/images/denim_coat.webp",
        dateAdded: "2024-01-03"
    },
    {
        id: 4,
        name: "Emily`s Fringe Dress",
        category: "Dresses",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Blue"],
        imageUrl: "./assets/images/fringe_dress.webp",
        dateAdded: "2024-01-04"
    },
    {
        id: 5,
        name: "Lacy`s Fur Coat",
        category: "Jackets",
        price: 40,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Red"],
        imageUrl: "./assets/images/fur_coat.webp",
        dateAdded: "2024-01-05"
    },
    {
        id: 6,
        name: "Hannah`s Fur Sweather",
        category: "Tops",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Brown"],
        imageUrl: "./assets/images/fur_sweather.webp",
        dateAdded: "2024-01-06"
    },
    {
        id: 7,
        name: "Leah`s Lace Up Corset",
        category: "Tops",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Grey"],
        imageUrl: "./assets/images/lace_up_corset.webp",
        dateAdded: "2024-01-07"
    },
    {
        id: 8,
        name: "Mia`s Leather Coat",
        category: "Jackets",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Grey"],
        imageUrl: "./assets/images/leather_coat.webp",
        dateAdded: "2024-01-08"
    },
    {
        id: 9,
        name: "Sonya`s Leather Jacket",
        category: "Jackets",
        price: 50,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Black", "Grey"],
        imageUrl: "./assets/images/leather_jacket.webp",
        dateAdded: "2024-01-09"
    },
]

let cart = [];

//get Dom elements
const shoppingCartBadge = document.querySelector(".cart-badge");
const sortButtons = document.querySelectorAll(".sort-button");
const productsCardsContainer = document.querySelector(".cards");

window.addEventListener("DOMContentLoaded", () => renderProducts(clothingItems));

//render products
function renderProducts(products) {
    productsCardsContainer.textContent = "";
    
    products.forEach((product) => {
        const card = document.createElement("article");
        card.classList.add("product-card");
        
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.name;
        img.style.width = "350px"; 
        img.style.height = "auto";
        
        const cardContent = document.createElement("div");
        cardContent.classList.add("card__content");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `${product.price}$`;

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add_cart");
        addToCartButton.textContent = "Add To Cart";

        //event listeners for shopping cart here
        addToCartButton.addEventListener("click", () => addToCart(product));

        //appending elements
        cardContent.append(title, price);
        card.append(img, cardContent, addToCartButton);
        productsCardsContainer.append(card);

    });
}

// Sort function
const sortProducts = (event)=> {
    let sortedProducts = [...clothingItems]

    const sortType = event.target.dataset.sort;
    if (sortType === "price-high"){
        sortedProducts = sortedProducts.sort((a, b)=> b.price - a.price);
    } else if (sortType === "price-low") {
        sortedProducts = sortedProducts.sort((a, b)=> a.price - b.price);
    } else if (sortType === "newest") {
        sortedProducts = sortedProducts.sort((a, b)=> new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortType === "all") {
        sortedProducts = [...clothingItems];
    }

    renderProducts(sortedProducts);
}
sortButtons.forEach((button)=> {
    button.addEventListener("click", (e)=> sortProducts(e))
})

//adding products to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If the product is already in the cart, change quantity
        existingProduct.quantity++;
    } else {
        // if not, add product
        cart.push({ ...product, quantity: 1 });
    }

    // Update the shopping cart badge
    updateCartBadge();

    // Save the cart to localStorage
    saveCartToLocalStorage();
}

// Update the cart badge with the total number of items
function updateCartBadge() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    shoppingCartBadge.textContent = totalItems; 
}

// Save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load the cart from localStorage when the page loads
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge(); 
    }

}

// loads the saved cart
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);
