import "react";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import "./heroSection.scss";
import Link from "next/link";
import TimeSyncSection from "../TimeSyncSection/TimeSyncSection";
import { GeneralType } from "@/app/page";
import { fetchData } from "@/db/client";
export default function HeroSection({
  bad,
  good,
  activeNav,
}: {
  bad?: number;
  good?: number;
  activeNav: string;
}) {
  return (
    <section id="container_hero">
      <h1 style={{ display: "none" }}>Nikulas Wraith</h1>

      <div className="path-counter">
        {bad && good && (
          <p>
            {" "}
            {">>>"} <span className="good">{good}</span>-
            <span className="bad">{bad}</span>
            {"<<<"}
          </p>
        )}
      </div>
      <div className="display" id="top">
        <div className="bg-binary"></div>
        <div className="window">
          <img src="decor/window_n.png" alt="" className="popup normal" />
          <img src="decor/window_c.gif" alt="" className="popup corrupt" />
        </div>
        <div className="niks">
          <img
            src="/art/nik-art-center-new.png"
            alt=""
            className="nik-center"
          />
          <img src="decor/frame-main.png" alt="" className="frame-main" />
        </div>

        <div className="logo-container">
          <img src="decor/main_logo.png" alt="" className="main-logo" />
        </div>
        <div className="header-frame">
          <img src="/decor/header_l.png" alt="" />
          <img src="/decor/header_r.png" alt="" />
        </div>

        <div className="connection">
          <img src="decor/top_connect_l.png" alt="" className="line l" />
          <img src="decor/top_connect_r.png" alt="" className="line r" />
        </div>

        <div className="arrows">
          <img src="decor/arrow_small.png" alt="" className="arrow l" />
          <img src="decor/arrow_small.png" alt="" className="arrow r" />
        </div>
      </div>

      <header className="header">
        <div className="decor-stripe"></div>
        <SectionTitle
          contained={true}
          directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
          run={
            <>
              {" "}
              {"run >>"} <b>navigation</b>.bat{" "}
            </>
          }
        />
        <nav className="navigation">
          <Link
            href="/?skip=1#about"
            className={`${activeNav === "home" ? "selected" : ""}`}
          >
            About
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#socials"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Socials
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#showcase"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Showcase
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#schedules"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Schedule
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#artwork"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Artwork
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#staff"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Staff
          </Link>{" "}
          ||
          <Link
            href="/?skip=1#setup"
            className={`${activeNav === "" ? "selected" : ""}`}
          >
            Setup
          </Link>{" "}
          ||
          <Link
            href="/stream?skip=1"
            className={`${activeNav === "stream" ? "selected" : ""}`}
          >
            Stream
          </Link>
          ||
          <Link
            href="/gallery?skip=1"
            className={`${activeNav === "gallery" ? "selected" : ""}`}
          >
            Gallery
          </Link>
          ||
          <Link
            href="/shop?skip=1"
            className={`${activeNav === "shop" ? "selected" : ""}`}
          >
            Shop
          </Link>
        </nav>
        <div className="wc"></div>
      </header>
    </section>
  );
}
