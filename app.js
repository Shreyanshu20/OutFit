function miniMenu() {
    const cross = document.querySelector('.cross');
    const menu = document.querySelector('.menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        cross.style.display = 'none';
    } else {
        menu.style.display = 'block';
        cross.style.display = 'block';
    }
}

function closeMenu() {
    const cross = document.querySelector('.cross');
    const menu = document.querySelector('.menu');
    cross.style.display = 'none';
    menu.style.display = 'none';
}

// Shop
const products = [
    { name: 'Product 1', price: 99, image: '../assets/p1.png' },
    { name: 'Product 2', price: 79, image: '../assets/p2.png' },
    { name: 'Product 3', price: 79, image: '../assets/p3.png' },
    { name: 'Product 4', price: 89, image: '../assets/p4.png' },
    { name: 'Product 5', price: 99, image: '../assets/p5.png' },
    { name: 'Product 6', price: 199, image: '../assets/p6.png' },
    { name: 'Product 7', price: 119, image: '../assets/p7.png' },
    { name: 'Product 8', price: 129, image: '../assets/p8.png' },
    { name: 'Product 9', price: 39, image: '../assets/p9.png' },
    { name: 'Product 10', price: 19, image: '../assets/p10.png' },
    { name: 'Product 11', price: 39, image: '../assets/p11.png' },
    { name: 'Product 12', price: 149, image: '../assets/p12.png' },
    { name: 'Product 13', price: 49, image: '../assets/p13.png' },
    { name: 'Product 14', price: 140, image: '../assets/p14.png' },
    { name: 'Product 15', price: 140, image: '../assets/p15.png' },
    { name: 'Product 16', price: 140, image: '../assets/p16.png' },
    { name: 'Product 17', price: 190, image: '../assets/p17.png' },
    { name: 'Product 18', price: 149, image: '../assets/p18.png' },
    { name: 'Product 19', price: 299, image: '../assets/p19.png' },
    { name: 'Product 20', price: 140, image: '../assets/p20.png' },
    { name: 'Product 21', price: 140, image: '../assets/p21.png' },
    { name: 'Product 22', price: 78, image: '../assets/p22.png' },
    { name: 'Product 23', price: 140, image: '../assets/p23.png' },
    { name: 'Product 24', price: 99, image: '../assets/p24.png' },
    { name: 'Product 25', price: 147, image: '../assets/p25.png' },
    { name: 'Product 26', price: 29, image: '../assets/p26.png' },
    { name: 'Product 27', price: 146, image: '../assets/p27.png' },
    { name: 'Product 28', price: 180, image: '../assets/p28.png' },
    { name: 'Product 29', price: 120, image: '../assets/p29.png' },
    { name: 'Product 30', price: 143, image: '../assets/p30.png' },
    { name: 'Product 31', price: 142, image: '../assets/p31.png' },
    { name: 'Product 32', price: 140, image: '../assets/p_img23.png' }
];

const itemsPerPage = 9;
let currentPage = 1;

function showProductDetails(name, price, image) {
    localStorage.setItem('productName', name);
    localStorage.setItem('productPrice', price);
    localStorage.setItem('productImage', image);
    window.location.href = 'product-details.html';
}

function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    products.sort((a, b) => {
        if (sortValue === 'price-asc') {
            return a.price - b.price;
        } else if (sortValue === 'price-desc') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });
    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.onclick = () => showProductDetails(product.name, product.price, product.image);
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="">
            <h3>${product.name}</h3>
            <div class="star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <p>$${product.price}.00</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}', 'M', 1)"><i class="fa fa-shopping-cart"></i></button>
        `;
        productList.appendChild(productCard);
    });

    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const buttons = pagination.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        if (i < totalPages) {
            buttons[i].style.display = 'inline-block';
            buttons[i].className = (i + 1) === currentPage ? 'active' : '';
        } else {
            buttons[i].style.display = 'none';
        }
    }
}

function changePage(page) {
    currentPage = page;
    displayProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image, size, quantity) {
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, image, size, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
}

function displayCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <p>Size: ${item.size}</p>
                <p>Quantity: &nbsp;&nbsp;&nbsp;<input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', '${item.size}', this.value)"></p>
                <button onclick="removeFromCart('${item.name}', '${item.size}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartTotal();
}

function updateQuantity(name, size, quantity) {
    const item = cart.find(item => item.name === name && item.size === size);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
    }
}

function removeFromCart(name, size) {
    cart = cart.filter(item => !(item.name === name && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 10;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    document.querySelector('.cart-total .total-elements div:nth-child(1) p:nth-child(2)').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.cart-total .total-elements div:nth-child(2) p:nth-child(2)').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.cart-total .total-elements div:nth-child(3) p:nth-child(2)').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.cart-total .total-elements div:nth-child(4) h5:nth-child(2)').textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cart-items')) {
        displayCart();
    }
});

// Product Details
if (document.getElementById('productName')) {
    document.getElementById('productName').textContent = localStorage.getItem('productName');
    document.getElementById('productPrice').textContent = '$' + localStorage.getItem('productPrice');
    document.getElementById('productImage').src = localStorage.getItem('productImage');
}

function addToCartFromDetails() {
    const name = localStorage.getItem('productName');
    const price = parseFloat(localStorage.getItem('productPrice'));
    const image = localStorage.getItem('productImage');
    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    addToCart(name, price, image, size, quantity);
}

function goBack() {
    window.history.back();
}
