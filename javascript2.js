let cart = [];


function toggleMenu() {
    const menu = document.getElementById('navbar-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function addToCart(productName, quantityId, price) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, quantity: quantity, price: price });
    }
    
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerText = `${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);


        
    });

    

    const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    cartModal.style.display = 'block';
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

// Handle checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Order submitted!');
    // Add code here to handle order submission
});

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent!');
    // Add code here to handle contact message submission
});

// Handle create account form submission
document.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('account-name').value;
    const email = document.getElementById('account-email').value;
    const password = document.getElementById('account-password').value;
    
    createAccount(name, email, password);
});

function createAccount(name, email, password) {
    fetch('https://your-api-endpoint.com/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully!');
        } else {
            alert('Error creating account: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the account.');
    });
}


// Function to show leasing product details in modal
function showLeasingDetails(productName, pricePerDay) {
    document.getElementById('leasing-product-title').innerText = productName;
    document.getElementById('leasing-price-per-day').innerText = `Price per day: $${pricePerDay}`;
    document.getElementById('leasing-modal').style.display = 'block';
}

// Function to close leasing modal
function closeLeasingModal() {
    document.getElementById('leasing-modal').style.display = 'none';
}

// Function to handle leasing form submission
document.getElementById('leasing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('leasing-name').value;
    const email = document.getElementById('leasing-email').value;
    const days = document.getElementById('leasing-days').value;
    const payment = document.getElementById('leasing-payment').value;
    const productName = document.getElementById('leasing-product-title').innerText;
    const pricePerDayText = document.getElementById('leasing-price-per-day').innerText;
    const pricePerDay = parseInt(pricePerDayText.split('$')[1]);

    const totalAmount = days * pricePerDay;

    alert(`Lease Request Summary:
    Product: ${productName}
    Name: ${name}
    Email: ${email}
    Days: ${days}
    Payment Method: ${payment}
    Total Amount: $${totalAmount}`);

    closeLeasingModal();
});


