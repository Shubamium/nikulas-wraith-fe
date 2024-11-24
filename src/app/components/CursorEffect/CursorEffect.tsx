"use client";
import "./cursorEffect.scss";
import { useEffect, useState, useRef } from "react";
export default function CursorEffect() {
  const spawnRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (spawnRef.current) {
        const shockEl = document.createElement("div");
        shockEl.classList.add("shockwave");
        if (e.clientX > window.innerWidth / 2) {
          shockEl.classList.add("green");
        }
        shockEl.style.top = e.clientY - 125 + "px";
        shockEl.style.left = e.clientX - 125 + "px";

        spawnRef.current.appendChild(shockEl);
        // console.log('adding shockwave')
        setTimeout(() => {
          shockEl.remove();
        }, 2500);
      }
    });
  }, []);

  return <div ref={spawnRef}></div>;
}
