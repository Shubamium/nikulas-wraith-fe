import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import React from "react";
import "./storeSection.scss";
import StoreTabs from "./StoreTabs";
import ProductList from "./productList/ProductList";
import CartList from "./cartList/CartList";
import Tracking from "./tracking/Tracking";
type Props = {};

export default function StoreSection({}: Props) {
  return (
    <div id="page_store">
      <div id="shop-top" className="shop-heading">
        <div className="top">
          <h2 className="font-nw">SHOP</h2>
        </div>
        <div className="info ">
          <SectionTitle
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            run={
              <>
                {"view >>"} <b>store.bat</b>
              </>
            }
          />
        </div>
      </div>
      <StoreTabs
        list={<ProductList />}
        cart={<CartList />}
        track={<Tracking />}
      />
    </div>
  );
}
