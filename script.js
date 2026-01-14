let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";
  cart.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.item} - ₹${i.price}`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

function payNow() {
  if (total === 0) {
    alert("Cart is empty");
    return;
  }

  var options = {
    "key": "RAZORPAY_KEY_ID_HERE", // 🔴 replace with your Razorpay key
    "amount": total * 100,
    "currency": "INR",
    "name": "FRUISTA",
    "description": "Online Food Order",
    "handler": function (response) {
      const orderText = cart.map(i => i.item).join(", ");
      window.location.href =
        `https://wa.me/919876543210?text=Order Confirmed:%0A${orderText}%0ATotal: ₹${total}%0APayment ID: ${response.razorpay_payment_id}`;
    }
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
}
