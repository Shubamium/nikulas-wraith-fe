"use client";

import { unsubscribe, subscribe as s } from "@/db/serverActions";
import React, { useState } from "react";

type Props = {};

export default function AlertsSubmission({}: Props) {
  const [number, setNumber] = useState<string>("");

  const subscribe = async () => {
    if (number === "") {
      window.alert("Invalid Number");
      return;
    }
    const res = s(number);
    window.alert(number + " has been added from the subscription list!");
    setNumber("");
    // console.log(number);
  };
  const unsub = async () => {
    if (number === "") {
      window.alert("Invalid Number");
      return;
    }
    const res = unsubscribe(number);
    window.alert(number + " has been removed from the subscription list!");
    setNumber("");
  };
  return (
    <div className="subscription">
      <div className="head">
        <h2> {">>"} Notification & Alerts</h2>
      </div>
      <div className="subscribe-form">
        <p className="desc">
          If you would like to know when Nik goes LIVE, add your phone number
          for notifications when he streams!
        </p>
        <input
          type="tel"
          placeholder="+1 000 000 000"
          className="input"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <div className="action">
          <button onClick={subscribe} disabled={number === ""}>
            Subscribe
          </button>
          <button className="unsub" onClick={unsub} disabled={number === ""}>
            Unsubscribe
          </button>
        </div>
      </div>
    </div>
  );
}
