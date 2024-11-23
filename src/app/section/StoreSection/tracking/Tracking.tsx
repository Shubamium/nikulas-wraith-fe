import Window from "@/app/components/Window/Window";
import React from "react";
import "./tracking.scss";
type Props = {};

export default function Tracking({}: Props) {
  return (
    <div id="tracking-container">
      <Window header="Order Tracker">
        <div className="action">
          <input type="text" placeholder="Order ID" className="field" />
          <button className="btn btn-check">
            {" "}
            {">"}Check{"<"}
          </button>
        </div>
      </Window>
    </div>
  );
}
