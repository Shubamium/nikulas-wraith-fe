import { Cart } from "@/app/section/StoreSection/cartList/CartList";

type CouponType = { amount: number; code: string };
// Map a cart and sum the price with the quantity to get the total price
export function sumCart(
  cart: Cart[],
  productsMap: Map<string, any>,
  shipping_fee: number,
  taxRate: number
) {
  let digital = true;
  let subtotal = cart.reduce((prev: number, current: any) => {
    let data = productsMap.get(current.id);
    if (!data.is_digital) {
      digital = false;
    }
    let currPrice = data.price * current.q;
    return prev + currPrice;
  }, 0);

  // Remove Shipping if it's all digital item
  let shipping = digital ? 0 : shipping_fee;
  let tax = parseFloat((((subtotal + shipping) / 100) * taxRate).toFixed(2));

  return {
    subtotal: subtotal,
    taxRate: taxRate,
    taxAmount: tax,
    digital: digital,
    total: subtotal + shipping + tax,
  };
}

export function calculateDiscount(total: number, coupon?: CouponType | null) {
  // If there is a coupon code
  if (coupon && coupon.amount) {
    // Calculate the percentage amount of price reduced
    let discount = (total / 100) * coupon.amount;
    let discountAmount = parseFloat(discount.toFixed(2));
    return discountAmount;
  }
  return 0;
}

// Clean the cart of any missing data
export function cleanCart(cart: Cart[], productsMap: Map<string, any>) {
  let newCart = cart.filter((cart) => productsMap.has(cart.id));
  return newCart;
}

// Format the cart with the info for the items payload in paypal api
export function cartToPaypalItemsPayload(
  cart: Cart[],
  productsInfo: Map<string, any>
) {
  return cart.map((prod) => {
    let info = productsInfo.get(prod.id);
    return {
      name: info.name,
      quantity: new String(prod.q),
      category: "PHYSICAL_GOODS",
      sku: info._id,
      unit_amount: {
        currency_code: "USD",
        value: new String(info.price),
      },
    };
  });
}

type PaypalAddress = {
  address_line_1?: string;
  address_line_2?: string;
  admin_area_1?: string;
  admin_area_2?: string;
  postal_code?: string;
  country_code?: string;
};
export function paypalAddressToString(
  {
    address_line_1,
    address_line_2,
    admin_area_1,
    admin_area_2,
    postal_code,
    country_code,
  }: PaypalAddress,
  full_name: string
) {
  let address_line = address_line_1 ?? "";
  let address_line2 = address_line_2 ?? "";
  let adminArea = admin_area_1 ?? "";
  let adminArea2 = admin_area_2 ?? "";
  let zipCode = postal_code ?? "";
  let countryCode = country_code ?? "";
  return (
    full_name +
    "\n" +
    address_line +
    " \n " +
    address_line2 +
    " \n " +
    adminArea +
    " " +
    adminArea2 +
    " " +
    "\n" +
    zipCode +
    "\n" +
    "COUNTRY:" +
    countryCode
  );
}

export function itemsToCart(items: any): Cart[] {
  return items.map((item: any) => {
    return {
      id: item.sku,
      q: parseInt(item.quantity),
    };
  });
}
