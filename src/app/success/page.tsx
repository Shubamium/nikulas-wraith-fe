import React, { useEffect } from "react";
import LoadingSkip from "../components/LoadingSkip/LoadingSkip";
import Footer from "@/app/components/Footer/Footer";
import "./success.scss";
import {
  BsArrowLeft,
  BsArrowReturnLeft,
  BsArrowReturnRight,
} from "react-icons/bs";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";
import { captureOrder } from "@/db/payment";
import { redirect } from "next/navigation";
import CopyCode from "./copyCode";
import ClearCart from "./clearCart";
type Props = {
  searchParams: Promise<{
    token: string;
    PayerID: string;
  }>;
};

export default async function Gallery({ searchParams }: Props) {
  const params = await searchParams;

  const capture = await captureOrder(params.token, params.PayerID);
  if (!capture) {
    // redirect("/");
    // return;
  }
  return (
    <main id="container_home">
      <LoadingSkip />
      {/* <HeroSection activeNav="shop" /> */}
      <ClearCart />
      <div className="success">
        <img
          src="https://cdn.sanity.io/images/6l12l23f/production/0cb915acb71b7c22ebb5d9fc3eed5b435ff9267a-1900x2500.png"
          alt=""
          width={300}
          height={300}
        />
        <h2>Thank you for your order and supporting this VTuber!</h2>
        <div className="info">
          <p>Order confirmation has been sent to your email!</p>
          <p>
            Your order tracking id is: <CopyCode code={params.token} />
          </p>
        </div>
        <Link href={"/?skip=1"} className="btn">
          {"<<"} Back to home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
