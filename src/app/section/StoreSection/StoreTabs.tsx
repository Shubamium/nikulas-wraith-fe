"use client";
import React, { useEffect, useState } from "react";

type Props = {
  list: any;
  cart: any;
  track: any;
};

export function switchTab() {
  const event = new Event("switchtab");
  document.dispatchEvent(event);
}
export default function StoreTabs({ list, cart, track }: Props) {
  const [active, setActive] = useState<"list" | "cart" | "track">("list");

  const show = {
    list: list,
    cart: cart,
    track: track,
  };

  useEffect(() => {
    document.addEventListener("switchtab", () => {
      setActive("cart");
      console.log("event changed");
    });
  }, []);
  return (
    <div className="store-tab">
      <div className="tabs">
        <button
          className={`btn tab-btn ${active === "list" ? "active" : ""}`}
          onClick={() => {
            setActive("list");
          }}
        >
          List
        </button>{" "}
        <span>{">>"}</span>
        <button
          className={`btn tab-btn ${active === "cart" ? "active" : ""}`}
          onClick={() => {
            setActive("cart");
          }}
        >
          Cart
        </button>{" "}
        <span>{">>"}</span>
        <button
          className={`btn tab-btn ${active === "track" ? "active" : ""}`}
          onClick={() => {
            setActive("track");
          }}
        >
          Track
        </button>
      </div>

      <div className="tabs">{show[active]}</div>
    </div>
  );
}
