// Shopping Cart JavaScript
let cart = [];

// Format currency to Rupiah
function formatToRupiah(amount) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
}

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price: parseFloat(price), quantity: 1 });
  }
  renderCart();
}

// Update quantity
function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItem(name);
    }
  }
  renderCart();
}

// Remove item from cart
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

// Render cart items
function renderCart() {
  const cartElement = document.getElementById("cart");
  const totalPriceElement = document.getElementById("total-price");

  cartElement.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartElement.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "0";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${item.name} - ${formatToRupiah(item.price)}</p>
      <div class="cart-actions">
        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
        <button class="remove-item" onclick="removeItem('${item.name}')">Remove</button>
      </div>
    `;
    cartElement.appendChild(cartItem);
  });

  totalPriceElement.textContent = formatToRupiah(total);
}

// Handle checkout
function handleCheckout() {
  const modal = document.getElementById("checkout-modal");
  const finalTotal = document.getElementById("final-total");
  finalTotal.textContent = document.getElementById("total-price").textContent;
  modal.classList.remove("hidden");
  document.getElementById("pay-btn").addEventListener("click", function() {
    // Hide the checkout modal
    document.getElementById("checkout-modal").classList.add("hidden");
    // Show the success alert
    alert("Order Successfully! Your order has been placed.");
  });
}

// Close modal
function closeModal() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.add("hidden");
}

// Attach button listeners
document.getElementById("checkout-btn").addEventListener("click", handleCheckout);
document.getElementById("close-modal").addEventListener("click", closeModal);

// Add to cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const name = e.target.dataset.name;
    const price = e.target.dataset.price;
    addToCart(name, price);
  });
});
