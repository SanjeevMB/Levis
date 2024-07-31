const products = [
    { id: 1, name: "Product 1", price: 19.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-1.jpg?v=1705412088" },
    { id: 2, name: "Product 2", price: 29.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-2.jpg?v=1705412088" },
    { id: 3, name: "Product 3", price: 39.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-3.jpg?v=1705412087" },
    { id: 4, name: "Product 4", price: 49.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-4.jpg?v=1705412088" },
    { id: 5, name: "Product 1", price: 19.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-5.jpg?v=1705412086" },
    { id: 6, name: "Product 2", price: 29.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-6.jpg?v=1705412086" },
    { id: 7, name: "Product 3", price: 39.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-7.jpg?v=1705412086" },
    { id: 8, name: "Product 4", price: 49.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-2.jpg?v=1705412088" },
    { id: 9, name: "Product 1", price: 19.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-4.jpg?v=1705412088" },
    { id: 10, name: "Product 2", price: 29.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-5.jpg?v=1705412086" },
    { id: 11, name: "Product 3", price: 39.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-7.jpg?v=1705412086" },
    { id: 12, name: "Product 4", price: 49.99, image: "https://cdn.shopify.com/s/files/1/0842/8689/8495/files/Chair-4.jpg?v=1705412088" }
];

let cartItems = [];

function renderProducts() {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="100%" height="300">
        <div class="product-info">
          <div class="name-price" style="text-align: left;">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
          </div>
          <button onclick="addToCart(${product.id})">
            <img src="https://cdn.shopify.com/s/files/1/0842/8689/8495/files/cart.svg?v=1705412085">
          </button>
        </div>
      `;

        productsContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    renderCart();

}

function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100%" height="300">
            <div class="cart-item-info">
              <p>${item.name}</p>
              <p>${item.quantity}</p>
              <button onclick="removeFromCart(${item.id})">X</button>
            </div>
      `;

        cartItemsContainer.appendChild(cartItem);

    });

    updatePrice(cartItems);

}

function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        renderCart();
    }
}

function clearCart() {
    cartItems = [];
    renderCart();
}

function sortByPrice(order) {
    if (order === "asc") {
        cartItems.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
        cartItems.sort((a, b) => b.price - a.price);
    }

    renderCart();

}

renderProducts();

function filterByPrice() {
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    const filteredProducts = cartItems.filter(product => product.price >= minPrice && product.price <= maxPrice);
    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById("cartItems");
    productsContainer.innerHTML = "";

    filteredProducts.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100%" height="300">
            <div class="cart-item-info">
              <p>${item.name}</p>
              <p>${item.quantity}</p>
              <button onclick="removeFromCart(${item.id})">X</button>
            </div>
      `;

        productsContainer.appendChild(cartItem);
    });

    updatePrice(filteredProducts);

}

function updatePrice(items) {

    const totalPriceElement = document.getElementById('totalPrice');
    const averagePriceElement = document.getElementById('averagePrice');

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const productCount = items.reduce((count, item) => count + item.quantity, 0);
    const averagePrice = (totalPrice / productCount);

    averagePriceElement.textContent = `Average: $${averagePrice.toFixed(2)}`;
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

}