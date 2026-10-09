let products = [{
    id:1,
    name:'nike',
    price:7495,
},{
    id:2,
    name:'adidas',
    price:5999,
},{
    id:3,
    name:'puma',
    price:4999
},{
    id:4,
    name:'reebok',
    price:3299
},{
    id:5,
    name:'campus',
    price:1299
},{
    id:6,
    name:'asian',
    price:999
}]

let cart = [];

function formatPrice(amount) {
return amount.toLocaleString("en-IN", {
style: "currency",
currency: "INR"
});
}
function addToCart(productId) {
const product = products.find(p => p.id === productId);
// Check whether this product already exists
const existingItem = cart.find(
item => item.id === productId
);
if (existingItem) {
// Increase quantity instead of adding a duplicate
existingItem.quantity++;
} else {
// Add product only once
cart.push({
...product,
quantity: 1
});
}
renderCart();
}
function changeQuantity(productId, change) {
const item = cart.find(p => p.id === productId);
if (!item) return;
item.quantity += change;
// Remove product when quantity reaches zero
if (item.quantity <= 0) {
cart = cart.filter(p => p.id !== productId);
}
renderCart();
}
function removeItem(productId) {
cart = cart.filter(p => p.id !== productId);
renderCart();
}
function renderCart() {
const cartItems = document.getElementById("cart-items");
const cartTable = document.getElementById("cart-table");
const emptyMessage = document.getElementById("empty");
cartItems.innerHTML = "";
let grandTotal = 0;
let totalQuantity = 0;
cart.forEach(item => {
const subtotal = item.price * item.quantity;
grandTotal += subtotal;
totalQuantity += item.quantity;
const row = document.createElement("tr");
row.innerHTML = `
<td>${item.name}</td>
<td>${formatPrice(item.price)}</td>
<td>
<div class="quantity">
<button
onclick="changeQuantity(${item.id}, -1)"
aria-label="Decrease ${item.name} quantity"
>−</button>
<span>${item.quantity}</span>
<button
onclick="changeQuantity(${item.id}, 1)"
aria-label="Increase ${item.name} quantity"
>+</button>
</div>
</td>
<td>
<button class="remove"
onclick="removeItem(${item.id})">
Remove
</button>
</td>
`;
cartItems.appendChild(row);
});
cartTable.hidden = cart.length === 0;
emptyMessage.hidden = cart.length !== 0;
document.getElementById("cart-count").textContent =
totalQuantity;
document.getElementById("grand-total").textContent =
formatPrice(grandTotal);
}
renderCart();