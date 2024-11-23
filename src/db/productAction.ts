"use server";

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
