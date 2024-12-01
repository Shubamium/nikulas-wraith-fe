"use client";
import React, { useEffect, useState } from "react";
import "./cartList.scss";
import {
  getAllProductsMap,
  getShippingFee,
  getTax,
  searchCode,
} from "@/db/productAction";
import { urlFor } from "@/db/client";
import { useRouter } from "next/navigation";
import { createOrder } from "@/db/payment";
import { calculateDiscount } from "@/db/util";
type Props = any;

export type Cart = {
  id: string;
  q: number;
};

export default function CartList({ switchTo }: Props) {
  const [activeCart, setActiveCart] = useState<Cart[]>([]);
  const [prodMap, setProdMap] = useState<Map<string, any> | null>(null);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);

  const [allDigital, setAllDigital] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  const [pcInput, setPCinput] = useState("");
  const [nick, setNick] = useState("");
  const [coupon, setCoupon] = useState<{
    code: string;
    amount: number;
  } | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const getCartFromLocalStorage = (prodMap: Map<string, any>) => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]") as Cart[];
    return validateCart(cart, prodMap);
  };
  const validateCart = (cart: Cart[], prodMap: Map<string, any>) => {
    // Validate amount if the stock on the server is lower than the current cart
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      const thisProd = prodMap.get(cart[i].id);
      if (thisProd && thisProd.stock > 0) {
        let cartItem = {
          id: cart[i].id,
          q: Math.max(1, Math.min(cart[i].q, thisProd.stock)),
        };
        newCart.push(cartItem);
      }
    }
    return newCart;
  };
  const getProductMapFromServer = async () => {
    const data = await getAllProductsMap();
    setProdMap(data);

    // Validate
    let newCart = getCartFromLocalStorage(data);

    // Show to user
    setActiveCart(newCart);
  };
  const getShipping = async () => {
    let fee = await getShippingFee();
    setShipping(fee ?? 5);
    console.log(fee);
  };
  const getTaxRate = async () => {
    let tax = await getTax();
    setTaxRate(tax);
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
    // If there is an item on the cart and the product lookup is finished
    if (hasItem() && prodMap) {
      let digital = true;
      // Tally up the price * quantity to get the subtotal
      let total = activeCart.reduce((prev: number, curr: Cart) => {
        let prodData = prodMap.get(curr.id);
        const productPrice = prodData.price;
        if (!prodData.is_digital) {
          digital = false;
        }
        const subTotal = curr.q * productPrice;
        return prev + subTotal;
      }, 0);

      // If the item is all digital remove shipping
      let newShipping = digital ? 0 : shipping;

      setAllDigital(digital);
      // Item Subtotal + Shipping
      let finalTotal = total + newShipping;

      // Tax = % of Item subtotal + shipping
      let tax = parseFloat(((finalTotal / 100) * taxRate).toFixed(2));

      // Discount is % of Tax + Subtotal + shipping
      let disc = calculateDiscount(finalTotal + tax, coupon);

      if (disc !== 0) {
        finalTotal -= disc;
        setDiscount(disc);
      }

      setTaxAmount(tax);
      setTotal(parseFloat(finalTotal.toFixed(2)));
    }
  };

  useEffect(() => {
    getShipping();
    getTaxRate();
    getProductMapFromServer();
  }, []);

  useEffect(() => {
    // Recalculate the total
    calculateTotal();
  }, [activeCart, coupon]);

  const router = useRouter();

  // Fetch the coupon code from the database and apply the coupon
  const applyCode = async () => {
    if (pcInput === "") {
      setCouponMessage(null);
      return;
    }
    const codeLookup = await searchCode(pcInput);
    if (codeLookup) {
      setCoupon({ amount: codeLookup.amount, code: codeLookup.code });
      setCouponMessage("Coupon applied!");
      // calculateTotal();
    } else {
      setCouponMessage(pcInput.toUpperCase() + " is " + "not a valid code");
      console.log("No Coupon Found");
    }
  };

  // Send a checkout request to paypal API
  const checkout = async () => {
    // Get the latest cart
    let cart = JSON.parse(localStorage.getItem("cart") ?? "[]") as Cart[];

    // Check for product info data
    if (prodMap) {
      // Check for the stock and everything before creating the order
      let validatedCart = validateCart(cart, prodMap);

      // Update the validated stock back
      localStorage.setItem("cart", JSON.stringify(validatedCart));

      // IF there are still product after being validated
      if (validatedCart.length > 0) {
        let nickname = nick === "" ? undefined : nick;
        const checkoutURL = await createOrder(
          validatedCart,
          coupon?.code,
          nickname
        );
        // If order created successfully
        if (checkoutURL) {
          router.push(checkoutURL);
        } else {
          alert("Failed to create checkout, please retry later!");
          router.refresh();
        }
      } else {
        alert("Something went wrong, please retry your order!");
        router.refresh();
      }
    }
  };

  const subtotal = parseFloat((total + (discount ?? 0) - shipping).toFixed(2));
  // const taxAmount = parseFloat(
  //   (((subtotal + shipping) / 100) * tax).toFixed(2)
  // );
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
              <p>
                {discount && (
                  <span className="prev">
                    ${(total + taxAmount + discount).toFixed(2)}
                  </span>
                )}{" "}
                ${(total + taxAmount).toFixed(2)} USD
              </p>
            </div>
            <div className="breakdown">
              {/* Sub */}
              <p>Subtotal: ${subtotal} USD</p>
              {/* Discount */}
              {discount && coupon?.code && (
                <p className="discount">
                  Discounts: -${discount} {">>"} {coupon.amount}% OFF with{" "}
                  <span>{coupon.code.toUpperCase()} </span>
                </p>
              )}
              {/* Tax */}
              {taxRate !== undefined && (
                <p>
                  Tax: ${taxAmount} USD {taxRate}%
                </p>
              )}
              {/* Shipping */}
              {!allDigital && <p>Shipping: ${shipping} USD</p>}
            </div>
          </div>
          <div className="action">
            <div className="codes">
              <div className="top">
                <input
                  type="text"
                  placeholder="Promo Code"
                  name="promo codes"
                  value={pcInput}
                  onChange={(e) => {
                    setPCinput(e.target.value);
                  }}
                />
                <button className="btn btn-checkout" onClick={applyCode}>
                  {">"}APPLY{"<"}
                </button>
              </div>
              <div className="top">
                <input
                  type="text"
                  placeholder="Nickname"
                  name="nickanme"
                  className="nick"
                  value={nick}
                  onChange={(e) => {
                    setNick(e.target.value);
                  }}
                />
              </div>
              <div className="message">
                {couponMessage && <p>{couponMessage}</p>}
              </div>
            </div>
            <button className="btn btn-checkout" onClick={checkout}>
              PROCEED TO CHECKOUT {">>>>>>>>>>>>>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
