import React, { useContext, useEffect } from "react";
import { CartItem } from "./CartItem";
import { GlobalContext } from "../../context/GlobalState";

export const Cart = () => {
  const { cart, getCart, updateCart } = useContext(GlobalContext);

  let subTotal = cart.products.reduce((a, b) => a + b.price * b.quantity, 0.0);
  let discount = cart.products.reduce(
    (a, b) => a + b.discount * b.quantity,
    0.0
  );
  let total = subTotal - discount;

  useEffect(() => {
    getCart();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="cart-container">
      <h3>Shopping Cart</h3>
      <ul>
        {cart.products.map((item) => (
          <li key={item.id}>
            <CartItem {...item} onClick={updateCart} />
          </li>
        ))}
      </ul>

      <hr />
      <div className="total color-default">
        <div>Sub-total:</div>
        <div>${subTotal.toFixed(2)}</div>
      </div>
      <div className="total color-secondary">
        <div>Discount:</div>
        <div>-${discount.toFixed(2)}</div>
      </div>
      <div className="total color-primary">
        <div>Total:</div>
        <div>${total.toFixed(2)}</div>
      </div>
    </div>
  );
};
