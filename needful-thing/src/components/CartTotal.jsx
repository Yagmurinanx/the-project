import React from 'react';

const CartTotal = ({ cartItems }) => {
  // Calculate total price based on cart items
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h2>Total Price</h2>
      <p>${totalPrice}</p>
      <button>Pay Now</button>
    </div>
  );
};

export default CartTotal;

