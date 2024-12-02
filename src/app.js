const clothingItems = [
    {
        id: 1,
        name: "Jessica`s Baggy Jeans",
        category: "Pants",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Light Wash", "Dark Wash", "Black"],
        imageUrl: "./assets/images/baggy_jeans.webp"
    },
    {
        id: 2,
        name: "Sarah`s Butterfly Dress",
        category: "Dresses",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Blue", "White"],
        imageUrl: "./assets/images/butterfly_dress.webp"
    },
    {
        id: 3,
        name: "Nora`s Denim Coat",
        category: "Jackets",
        price: 40,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Black", "Tan"],
        imageUrl: "./assets/images/denim_coat.webp"
    },
    {
        id: 4,
        name: "Emily`s Fringe Dress",
        category: "Dresses",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Blue"],
        imageUrl: "./assets/images/fringe_dress.webp"
    },
    {
        id: 5,
        name: "Lacy`s Fur Coat",
        category: "Jackets",
        price: 40,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Red"],
        imageUrl: "./assets/images/fur_coat.webp"
    },
    {
        id: 6,
        name: "Hannah`s Fur Sweather",
        category: "Tops",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Brown"],
        imageUrl: "./assets/images/fur_sweather.webp"
    },
    {
        id: 7,
        name: "Leah`s Lace Up Corset",
        category: "Tops",
        price: 30,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Grey"],
        imageUrl: "./assets/images/lace_up_corset.webp"
    },
    {
        id: 8,
        name: "Mia`s Leather Coat",
        category: "Jackets",
        price: 60,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["White", "Black", "Grey"],
        imageUrl: "./assets/images/leather_coat.webp"
    },
    {
        id: 9,
        name: "Sonya`s Leather Jacket",
        category: "Jackets",
        price: 50,
        sizes:["S", "M", "L", "XL"],
        inStock: true,
        Colors: ["Brown", "Black", "Grey"],
        imageUrl: "./assets/images/leather_jacket.webp"
    },
]

//get Dom elements
const shoppingCartBadge = document.querySelector(".cart-badge");
//sort button
const productsCardsContainer = document.querySelector(".cards");

window.addEventListener("DOMContentLoaded", () => renderProducts(clothingItems));

//render products
function renderProducts(products) {
    productsCardsContainer.textContent = "";
    
    clothingItems.forEach((product) => {
        const card = document.createElement("article");
        card.classList.add("product-card");
        
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.name;
        img.style.width = "350px"; // Adjust the image size (you can change this to whatever you want)
        img.style.height = "auto"; // Maintain aspect ratio
        
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

        //appending elements
        cardContent.append(title, price);
        card.append(img, cardContent, addToCartButton);
        productsCardsContainer.append(card);

    });
}