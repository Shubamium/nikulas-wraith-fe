"use server";

import { Cart } from "@/app/section/StoreSection/cartList/CartList";
import { fetchData, updateData } from "./client";

export async function getAllProducts() {
  const productList = await fetchData<any[]>(`
		*[_type == 'products' && hide != true]{
			...
		}
	`);
  return productList;
}
export async function getAllProductsMap() {
  const products = await getAllProducts();
  const prodMap = new Map();

  for (let i = 0; i < products.length; i++) {
    if (products[i]._id) {
      prodMap.set(products[i]._id, products[i]);
    }
  }

  return prodMap;
}

export async function cartToProductsMap(
  data: Cart[]
): Promise<Map<string, any>> {
  const query = `
		*[_type == 'products' && hide != true && _id in [${data
      .map((cart) => '"' + cart.id + '"')
      .join(`,`)}]]{
		...}`;

  let prod = await fetchData<any[]>(query);

  let map = new Map();
  for (let d of prod) {
    map.set(d._id, d);
  }

  // prodInfos.push(prod);
  return map;
}

export async function getOrderDetail(id: string) {
  const query = `
	*[_type == 'orders' && order_id == '${id}']{
		...,
		products_ordered[]{
			item->,
			quantity,
		}
	}[0]`;

  let orderDetail = await fetchData<any>(query);
  return orderDetail;
}

export async function getShippingFee() {
  try {
    let general = await fetchData<any>(`
			*[_type == 'general' && preset == 'main']{
				shipping_fee,
		}[0]
		`);
    console.log(general);
    return general.shipping_fee;
  } catch (err) {
    console.log("CANNOT_GET_SHIPPING_FEE", err);
    return 0;
  }
}
export async function getTax() {
  try {
    let general = await fetchData<any>(`
			*[_type == 'general' && preset == 'main']{
				tax,
		}[0]
		`);
    console.log(general);
    return general.tax;
  } catch (err) {
    console.log("CANNOT_GET_TAX", err);
    return 0;
  }
}
export async function searchCode(code: string) {
  try {
    let coupon = await fetchData<any>(`
				*[_type == 'codes' && code == '${code.toUpperCase()}']{
					_id,
					code,
					amount,
				}[0]
		`);
    if (coupon && coupon._id) {
      console.log("coupon found");
      return coupon;
    } else {
      console.log("coupon not found");
      return null;
    }
  } catch (err) {
    console.log("Failed To get coupon", err);
    console.log(code.toUpperCase());
  }
}

export async function setOrderAsCompleted(_id: string) {
  try {
    await updateData(_id, {
      status: "completed",
    });
    console.log("ORDER MARK AS COMPLETED:", _id);
    return true;
  } catch (err) {
    console.log("ERROR_SET_COMPLETE", err);
    return false;
  }
}
