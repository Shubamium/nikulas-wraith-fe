"use client";
import Window from "@/app/components/Window/Window";
import React, { useState } from "react";
import "./tracking.scss";
import { getOrderDetail, setOrderAsCompleted } from "@/db/productAction";
type Props = {};

export default function Tracking({}: Props) {
  const [tracking, setTracking] = useState("");
  let [orderDetail, setOrderDetail] = useState<
    any | null | { message: string }
  >(null);

  const [completed, setCompleted] = useState(false);
  const getTracking = async () => {
    let detail = await getOrderDetail(tracking);
    if (detail && detail._id) {
      setOrderDetail(detail);
      console.log(detail);
    } else {
      setOrderDetail({ message: "Order not found! Your id is invalid" });
    }
  };

  const completeOrder = async () => {
    if (orderDetail._id) {
      let res = await setOrderAsCompleted(orderDetail._id);

      if (res) {
        setCompleted(true);
        setOrderDetail((od: any) => ({
          ...od,
          status: "completed",
        }));
      }
    }
  };
  return (
    <div id="tracking-container">
      <Window header="Order Tracker">
        <div className="action">
          <input
            type="text"
            placeholder="Order ID"
            className="field"
            value={tracking}
            onChange={(e) => {
              setTracking(e.target.value);
            }}
          />
          <button className="btn btn-check" onClick={getTracking}>
            {">"}Check{"<"}
          </button>
        </div>

        {orderDetail && orderDetail._id && (
          <div className="order-detail">
            <div className="order-heading">
              <h2>
                ORDER {">>"} <span className="id">{orderDetail.order_id}</span>
              </h2>
              <p
                className={`status ${
                  orderDetail.status == "complete" || completed
                    ? "order-complete"
                    : ""
                }`}
              >
                <span>STATUS: </span>
                {completed ? "COMPLETED" : orderDetail.status?.toUpperCase()}
              </p>
            </div>
            <div className="status-text">
              <h2>Details:</h2>
              <p>{orderDetail.status_text}</p>
            </div>
            <div className="breakdown">
              {orderDetail.products_ordered?.map((prod: any) => {
                return (
                  <div className="item" key={prod._key}>
                    <p className="name">
                      {prod.item.name}
                      <span className="q"> x{prod.quantity}</span>{" "}
                    </p>
                    <p className="p">${prod.quantity * prod.item.price}</p>
                  </div>
                );
              })}
            </div>
            {/* (orderDetail.status === "shipped" && completed == false ) */}
            {true && (
              <div className="confirm">
                <div className="left">
                  <h2>Confirm your order!</h2>
                  <p>
                    Your order has been shipped! Please carefully check your
                    items before marking the order as completed.
                  </p>
                </div>
                <div className="right">
                  <button className="btn btn-check" onClick={completeOrder}>
                    {"> Complete your order <"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {orderDetail && orderDetail.message && (
          <p className="notfound">{orderDetail.message}</p>
        )}
      </Window>
    </div>
  );
}
