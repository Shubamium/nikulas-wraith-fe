"use client";
import React, { useEffect, useState } from "react";
import "./productList.scss";
import { urlFor } from "@/db/client";
import { getAllProducts } from "@/db/productAction";
import { switchTab } from "../StoreTabs";
type Props = {};

export default function ProductList({}: Props) {
  const [productList, setProductList] = useState<any[]>([]);

  // Add the product to the local storage cart
  const addCart = (prod_id: string) => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      let list: any[] = JSON.parse(cart);
      let item = list.findIndex((prd) => prd.id === prod_id);

      if (item !== -1) {
        // Item already exist in cart
        list[item].q += 1;
      } else {
        list.push({
          id: prod_id,
          q: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(list));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            id: prod_id,
            q: 1,
          },
        ])
      );
    }
    switchTab();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getAllProducts();
      setProductList(products.filter((prod) => prod.stock > 0));
    };
    fetchProduct();
  }, []);
  return (
    <div id="product-list">
      {productList.map((prod: any) => {
        return (
          <div className="product" key={prod._id}>
            <img
              className="prod-img"
              src={urlFor(prod.image)?.width(300).url()}
              alt=""
            />
            <div className="infos">
              <h2 className="name">{prod.name}</h2>
              <p className="description">{prod.description}</p>
            </div>
            <div className="list">
              <p>
                ${prod.price} <br />
                <span> {prod.stock} left</span>
              </p>
              <button
                className="btn add"
                onClick={() => {
                  addCart(prod._id);
                }}
              >
                {">"} Add to Cart {"<"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
