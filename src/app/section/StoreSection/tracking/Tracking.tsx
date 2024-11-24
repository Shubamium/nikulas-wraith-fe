"use client";
import Window from "@/app/components/Window/Window";
import React, { useState } from "react";
import "./tracking.scss";
import { getOrderDetail } from "@/db/productAction";
type Props = {};

export default function Tracking({}: Props) {
  const [tracking, setTracking] = useState("");
  let [orderDetail, setOrderDetail] = useState<
    any | null | { message: string }
  >(null);

  const getTracking = async () => {
    let detail = await getOrderDetail(tracking);
    if (detail && detail._id) {
      setOrderDetail(detail);
      console.log(detail);
    } else {
      setOrderDetail({ message: "Order not found! Your id is invalid" });
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
            {" "}
            {">"}Check{"<"}
          </button>
        </div>

        {orderDetail && orderDetail._id && (
          <div className="order-detail">
            <div className="order-heading">
              <h2>
                ORDER {">>"} <span className="id">{orderDetail.order_id}</span>
              </h2>
              <p className={`status`}>
                <span>STATUS: </span>
                {orderDetail.status?.toUpperCase()}
              </p>
            </div>
            <div className="status-text">
              <h2>Details:</h2>
              <p>{orderDetail.status_text}</p>
            </div>
            <div className="breakdown">
              {orderDetail.products_ordered?.map((prod: any) => {
                return (
                  <div className="item">
                    <p className="name">
                      {prod.item.name}
                      <span className="q"> x{prod.quantity}</span>{" "}
                    </p>
                    <p className="p">${prod.quantity * prod.item.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {orderDetail && orderDetail.message && (
          <p className="notfound">{orderDetail.message}</p>
        )}
      </Window>
    </div>
  );
}
