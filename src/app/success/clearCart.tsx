"use client";
import React, { useEffect } from "react";

type Props = {};

export default function ClearCart({}: Props) {
  useEffect(() => {
    console.log("removing cart");
    localStorage.removeItem("cart");
  }, []);
  return <div className="clearing_cart"></div>;
}
