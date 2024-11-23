"use client";
import React, { useEffect, useState } from "react";
import "./cartList.scss";
import { getAllProductsMap } from "@/db/productAction";
import { urlFor } from "@/db/client";
type Props = any;

export type Cart = {
  id: string;
  q: number;
};

const shipping_fee = 5;
export default function CartList({ switchTo }: Props) {
  const [activeCart, setActiveCart] = useState<Cart[]>([]);
  const [prodMap, setProdMap] = useState<Map<string, any> | null>(null);
  const [total, setTotal] = useState(0);

  const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    return cart;
  };
  const getProductMapFromServer = async () => {
    const data = await getAllProductsMap();
    setProdMap(data);
    setActiveCart(getCartFromLocalStorage());
  };

  const changeCart = (id: string, amount: number) => {
    let copyCart = [...activeCart];
    const selectedIndex = activeCart.findIndex((cart) => cart.id === id);
    // If found the element
    if (selectedIndex !== -1) {
      // Limit the amount of added to the stock of the product
      const maxAmount = prodMap?.get(id).stock ?? 1;
      copyCart[selectedIndex].q = Math.min(
        maxAmount,
        copyCart[selectedIndex].q + amount
      );
      // If below 0 then remove from cart
      if (copyCart[selectedIndex].q <= 0) {
        copyCart = copyCart.filter(
          (cart: any, index: number) => index !== selectedIndex
        );
      }

      // Apply the changes
      setActiveCart(copyCart); // State Change
      localStorage.setItem("cart", JSON.stringify(copyCart)); // Local storage change
    }
  };

  const hasItem = () => activeCart && activeCart.length > 0;

  const calculateTotal = () => {
    if (hasItem() && prodMap) {
      let total = activeCart.reduce((prev: number, curr: Cart) => {
        const productPrice = prodMap.get(curr.id).price;
        const subTotal = curr.q * productPrice;
        return prev + subTotal;
      }, shipping_fee);

      setTotal(total);
    }
  };

  useEffect(() => {
    getProductMapFromServer();
  }, []);
  useEffect(() => {
    // Recalculate the total
    calculateTotal();
  }, [activeCart]);

  return (
    <div id="cart-display">
      <div className="cart-list">
        {prodMap && hasItem() ? (
          activeCart.map((cartItem: Cart, index: number) => {
            const tP = prodMap.get(cartItem.id);
            return tP ? (
              <div className="cart-item" key={index + cartItem.id}>
                <div className="data">
                  <img
                    src={tP.image && urlFor(tP.image)?.width(200).url()}
                    alt=""
                    className="image"
                  />
                  <h2>{tP.name}</h2>
                </div>
                <div className="detail">
                  <div className="control">
                    <button
                      className="btn"
                      onClick={() => {
                        changeCart(cartItem.id, -1);
                      }}
                    >
                      -
                    </button>
                    <p>{cartItem.q}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        changeCart(cartItem.id, 1);
                      }}
                      disabled={cartItem.q >= tP.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="price">
                    <p>${tP.price * cartItem.q}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="id-undefined" key={index}></div>
            );
          })
        ) : (
          <div className="cart-item empty">
            <p>Your cart is empty, please add an item to buy!</p>
          </div>
        )}
      </div>
      {hasItem() && (
        <div className="overview">
          <div className="total">
            <div className="sum">
              {" "}
              <h2>Total:</h2>
              <p>${total}</p>
            </div>
            <div className="breakdown">
              <p>Subtotal: ${total - shipping_fee}</p>
              <p>Shipping: ${shipping_fee}</p>
            </div>
          </div>
          <button className="btn btn-checkout">PROCEED TO CHECKOUT</button>
        </div>
      )}
    </div>
  );
}
