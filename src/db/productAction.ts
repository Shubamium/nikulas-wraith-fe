"use server";

import { Cart } from "@/app/section/StoreSection/cartList/CartList";
import { fetchData } from "./client";

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
