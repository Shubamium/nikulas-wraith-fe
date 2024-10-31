"use client";
import Link from "next/link";
import "./popUpHeader.scss";
import { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";
import {
  IoClose,
  IoCloseCircle,
  IoMenu,
  IoMenuOutline,
  IoRemove,
} from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
export default function PopUpHeader() {
  let [showHeader, setShowHeader] = useState(false);
  let [collapse, setCollapse] = useState(false);
  useEffect(() => {
    let shouldShow = () => {
      setShowHeader(window.scrollY >= 750); // <-Should be visible at pixel
    };

    shouldShow();
    window.addEventListener("scroll", shouldShow);

    return () => {
      window.removeEventListener("scroll", shouldShow);
    };
  }, []);
  return (
    <div
      id="popup-head"
      className={`${showHeader ? "show" : "hidden" + " "} ${
        collapse ? "collapse" : "setCollapse" + " "
      }`}
    >
      <nav className="navigation">
        <span>{">>"}</span>
        <Link href="/?skip=1#about" className="btn btn-nav">
          About
        </Link>
        <Link href="/?skip=1#socials" className="btn btn-nav">
          Socials
        </Link>
        <Link href="/?skip=1#showcase" className="btn btn-nav">
          Showcase
        </Link>
        <Link href="/?skip=1#schedules" className="btn btn-nav">
          Schedule
        </Link>
        <Link href="/?skip=1#artwork" className="btn btn-nav">
          Artwork
        </Link>
        <Link href="/?skip=1#staff" className="btn btn-nav">
          Staff
        </Link>
        <Link href="/?skip=1#setup" className="btn btn-nav">
          Setup
        </Link>
        <Link href="/stream?skip=1" className="btn btn-nav">
          Stream
        </Link>
        <Link href="/gallery?skip=1" className="btn btn-nav">
          Gallery
        </Link>
        <span>{"<<"}</span>
      </nav>
      <button
        className="btn btn-menu"
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        {collapse ? (
          <IoMenuOutline className="invert" />
        ) : (
          <BsArrowLeft className="not-invert" />
        )}
      </button>
    </div>
  );
}
