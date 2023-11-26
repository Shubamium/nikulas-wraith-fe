"use client";
import React from "react";
import "./modelSection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

export default function ModelSection() {
  return (
    <section id="models" className="container">
      <Window header="Models">
        <SectionTitle
          description="What is it about"
          directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
          run={
            <>
              {"run >>"} <b>model-info</b>.bat
            </>
          }
        />
        <nav className="models-navigation">
          <p>Design</p> ||
          <p>Showcase</p> ||
          <p>Reference</p>
        </nav>
        <div className="model-showcase">
          <div className="model-info">
            <h2 className="credit">
              Design by{" "}
              <a href="#" target="_blank">
                @personName
              </a>
            </h2>
          </div>
          <div className="model-image">
            <div className="left">
              <img
                src="/art/show_placeholder.png"
                alt=""
                className="left-img"
              />
            </div>
            <div className="right">
              <img src="/art/showcase-pfp.png" alt="" className="right-img" />
            </div>
          </div>
        </div>
      </Window>
      <img src="/decor/Union.png" alt="" className="decor_union" />
    </section>
  );
}
