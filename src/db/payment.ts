"use server";
import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  cartToProductsMap,
  getAllProductsMap,
  getShippingFee,
  searchCode,
} from "./productAction";
import { Cart } from "@/app/section/StoreSection/cartList/CartList";
import {
  calculateDiscount,
  cartToPaypalItemsPayload,
  cleanCart,
  itemsToCart,
  paypalAddressToString,
  sumCart,
} from "./util";
import { createData, updateData } from "./client";
import { sendOrderConfirmation } from "./email";

const base_url = process.env.PAYPAL_BASE;
const base_url2 = process.env.PAYPAL_BASE2;
// const shipping_fee = parseInt(process.env.SHIPPING_FEE ?? "5");

// 1. Get the access token with the client id and secret
async function getAccessToken() {
  const encodedCredentials = btoa(
    `${process.env.PAYPAL_ID}:${process.env.PAYPAL_SECRET}`
  );

  try {
    let response = await axios({
      url: base_url + "oauth2/token",
      method: "POST",
      // auth: {
      //   username: process.env.PAYPAL_ID ?? "",
      //   password: process.env.PAYPAL_SECRET ?? "",
      // },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
      data: {
        grant_type: "client_credentials",
      },
    });

    return response.data.access_token;
  } catch (err) {
    console.error("Cannot get access token:", err);
    // throw error("Cannot get Access Token");
    return undefined;
  }
}

// 2. Make the order and return the checkout link to user
export async function createOrder(cart: any[], couponCode?: string) {
  let prodMap = await cartToProductsMap(cart);
  const shipping_fee = await getShippingFee();
  let total = sumCart(cart, prodMap, shipping_fee);
  let code = await searchCode(couponCode ?? "EMPTY_CODE");
  let discount = calculateDiscount(total, code);

  cart = cleanCart(cart, prodMap);
  let token = await getAccessToken();
  // If succesfully get token
  console.log(total);
  if (token) {
    try {
      // Create the order in the paypal api
      let response = await axios({
        url: base_url2 + "checkout/orders",
        method: "POST",
        headers: {
          "Paypal-Request-Id": uuid(),
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: (total - discount).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: (total - shipping_fee).toFixed(2),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: new String(shipping_fee),
                  },
                  discount: {
                    currency_code: "USD",
                    value: discount.toFixed(2),
                  },
                },
              },
              items: cartToPaypalItemsPayload(cart, prodMap),
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                brand_name: "Nikulas Wraith",
                locale: "en-US",
                landing_page: "GUEST_CHECKOUT",
                user_action: "PAY_NOW",
                return_url: process.env.SELF_URL + "success",
                cancel_url: process.env.SELF_URL,
              },
            },
          },
        },
      });
      console.log(response.data);

      // If the the order succesfully created return back the link
      let action_link = response.data.links.find(
        (link: any) => link.rel === "payer-action"
      );

      console.log(response.data.link, action_link);

      return action_link.href;
    } catch (err: any) {
      console.log(err.response.data.details);
    }
  }
  return false;
}

// 3. Capture the order by confirming it to the paypal api and then saving the order in sanity
// Confirm the order to the paypal server
export async function captureOrder(paymentToken: string, payerID: string) {
  if (!paymentToken || !payerID) {
    console.error("Payment Token Is not Being provided");
    return null;
  }
  const token = await getAccessToken();
  console.log("Capturing Order");
  if (token) {
    try {
      let response = await axios({
        url: base_url2 + "checkout/orders/" + paymentToken + "/capture",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      // console.log(response.data);
      if (response.data.status === "COMPLETED") {
        let orderData = await axios({
          url: base_url2 + "checkout/orders/" + response.data.id,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log("ORDER DATA:", orderData.data);
        // const payment = orderData.data.payment_source.paypal;
        const payer = orderData.data.payer;
        const items = orderData.data.purchase_units[0].items;
        const amount = orderData.data.purchase_units[0].amount;
        const shipping = orderData.data.purchase_units[0].shipping;
        const total = parseFloat(amount.value);
        console.log("ITEMS:", items);
        console.log("AMOUNT:", amount);
        console.log("SHIPPING:", shipping);

        // Save the order to sanity
        const cart = itemsToCart(items);

        await reduceStock(cart);
        if (payer.email_address) {
          await sendOrderConfirmation(payer.email_address, response.data.id);
        }
        return await saveOrder(
          {
            orderId: paymentToken,
            buyer: {
              name: payer.name.given_name + " " + payer.name.surname,
              email: payer.email_address,
              address: paypalAddressToString(
                shipping.address,
                shipping.name?.full_name
              ),
            },
            status: "confirmation",
            bought: cart,
          },
          total
        );
      }
      // if(response.data.purchase)
      // saveOrder({
      // 	captureID:response.data.purchase_units[0].payments.captures[0].id,
      // 	bought:
      // })
    } catch (err: any) {
      console.log(err.response?.data?.details);
      if (err.response?.data?.details[0].issue === "ORDER_ALREADY_CAPTURED") {
        return false;
      }
    }
  }
  return false;
}

// 4. Save to database the order information
type OrderInfo = {
  orderId: string;
  status: string;
  buyer: {
    email: string;
    name: string;
    address: string;
  };
  bought: {
    id: string;
    q: number;
  }[];
};
export async function saveOrder(order: OrderInfo, total: number) {
  try {
    const orderDoc = await createData("orders", {
      order_id: order.orderId,
      status: "confirmation",
      status_text: "Waiting for order to be confirmed and processed!",
      buyer: {
        name: order.buyer.name,
        email: order.buyer.email,
        address: order.buyer.address,
      },
      total: total,
      products_ordered: order.bought.map((cart) => {
        return {
          _key: uuid(),
          item: {
            _type: "products",
            _ref: cart.id,
          },
          quantity: cart.q,
        };
      }),
    });
    console.log(orderDoc);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Reduce the stock in the database after purchase
async function reduceStock(cart: Cart[]) {
  let prodMap = await getAllProductsMap();

  try {
    for (let cartItem of cart) {
      if (prodMap.has(cartItem.id)) {
        let current = prodMap.get(cartItem.id).stock;
        let newStock = await updateData(cartItem.id, {
          stock: current - cartItem.q,
        });
        console.log("Succesfully updated stock!", current, cartItem.q);
      }
    }
  } catch (err) {
    console.log("ERROR_REDUCE_STOCK", err);
  }
}
