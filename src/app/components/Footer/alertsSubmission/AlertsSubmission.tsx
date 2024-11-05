"use client";

import { saveSubscribtion } from "@/db/serverActions";
import React, { useEffect, useState } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";

type Props = {};

export default function AlertsSubmission({}: Props) {
  // const [number, setNumber] = useState<string>("");
  const [canSubscribe, setCanSubscribe] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const subscribeNotif = async () => {
    // Register for service worker
    if ("serviceWorker" in navigator) {
      try {
        let worker = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        let permission = await Notification.requestPermission();

        if (Notification.permission === "denied") {
          alert("Please allow notifications to get notified for the streams!");
          return;
        }
        console.log("Successfullly register worker", worker.scope);
      } catch (err) {
        console.error("Failed to register worker", err);
        return;
      }

      let registration = await navigator.serviceWorker.ready;
      alert("Setting up notification, please wait...");

      let activeSubs = await registration.pushManager.getSubscription();
      if (!activeSubs) {
        let subscribtion = await registration.pushManager.subscribe({
          applicationServerKey: process.env.NEXT_PUBLIC_WEBPUSH,
          userVisibleOnly: true,
        });
        // alert("Push Manager Subscribed:" + subscribtion.endpoint);
        // alert("");

        const key = subscribtion.getKey("p256dh"); // Publicy key
        const auth = subscribtion.getKey("auth"); // Auth secret

        if (key && auth) {
          // Encode the keys
          let arrayBufferToBase64 = (buffer: ArrayBuffer) => {
            let encoded = new Uint8Array(buffer);
            let binaryString = "";
            for (let i = 0; i < encoded.byteLength; i++) {
              binaryString += String.fromCharCode(encoded[i]);
            }
            return btoa(binaryString);
          };

          let subs = {
            endpoint: subscribtion.endpoint,
            expirationTime: null,
            keys: {
              auth: arrayBufferToBase64(auth),
              p256dh: arrayBufferToBase64(key),
            },
          };
          // console.log(subs);
          // Save the subscribtion info to the database to send the notif to
          // alert(JSON.stringify(subs));
          await saveSubscribtion(subs);
          alert("Notification activated successfully!");
          checkForRegis();
        } else {
          alert("Auth And Key not found");
          return;
        }
        // Convert keys to base64 format for sending to the server
      } else {
        alert("Push Manager already subscribed");
      }
    }
    // Ask for notif permission
  };
  const unsubNotif = async () => {
    if ("serviceWorker" in navigator) {
      let regist = await navigator.serviceWorker.getRegistration();
      if (regist) {
        await regist.unregister();
        alert("Notification disabled successfully!");
      }
    }
    checkForRegis();
  };

  const checkForRegis = async () => {
    if ("serviceWorker" in navigator) {
      setCanSubscribe(true);
      let serviceWorker = await navigator.serviceWorker.getRegistration();
      let permission = Notification.permission;
      if (serviceWorker && permission === "granted") {
        setHasSubscribed(true);
      } else {
        setHasSubscribed(false);
      }
    } else {
      setCanSubscribe(false);
    }
  };
  useEffect(() => {
    checkForRegis();
  }, []);
  return (
    <div className="subscription">
      <div className="head">
        <h2> {">>"} Notification & Alerts</h2>
      </div>
      <div className="subscribe-form">
        <p className="desc">
          If you would like to know when Nik goes LIVE, Allow notification to
          know when he streams!
        </p>

        {/* <input
          type="tel"
          placeholder="+1 000 000 000"
          className="input"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        /> */}
        <div className="action">
          <button
            onClick={subscribeNotif}
            disabled={canSubscribe && hasSubscribed}
          >
            Get Notified <FaBell />
          </button>
          <button
            className="unsub"
            onClick={unsubNotif}
            disabled={canSubscribe && !hasSubscribed}
          >
            Disable <FaBellSlash />
          </button>
        </div>
        <p className="warn">
          {`If you're on IOS Safari, you need to add this page to home screen to get notified`}
        </p>
      </div>
    </div>
  );
}

// Deprecated
// ======================
// const subscribe = async () => {
// 	if (number === "") {
// 		window.alert("Invalid Number");
// 		return;
// 	}
// 	const res = s(number);
// 	window.alert(number + " has been added from the subscription list!");
// 	setNumber("");
// 	// console.log(number);
// };
// const unsub = async () => {
// 	if (number === "") {
// 		window.alert("Invalid Number");
// 		return;
// 	}
// 	const res = unsubscribe(number);
// 	window.alert(number + " has been removed from the subscription list!");
// 	setNumber("");
// };
