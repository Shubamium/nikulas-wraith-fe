"use client";
import React, { useState } from "react";
import "./modelSection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

type ModelSectionType = {
	models:{
		type:string,
		name:string,
		link:string,
		small:any,
		large:any,
	}[]
}
export default function ModelSection({models}:ModelSectionType) {
	const [activeImg,setActiveImg] = useState(0)
	
	if(models === undefined || models.length < 0) return <></> 

	const changeImage = (index:number)=>{
		setActiveImg(index)
	}
  return (
    <section id="showcase" className="container">
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
    
					{models.map((model,index)=>{
						return <p key={model.name} className={index === activeImg ? 'active' : '' } onClick={()=>{changeImage(index)}}>{model.type}{ index !== models.length - 1 ? " || " : ""}</p>
					})}
        </nav>
        <div className="model-showcase">
          <div className="model-info">
            <h2 className="credit">
              {models[activeImg].type} by{" "}
              <a href={models[activeImg].link} target="_blank">
                {models[activeImg].name}
              </a>
            </h2>
          </div>
          <div className="model-image">
            <div className="left">
              <img
                src={models[activeImg].large}
                alt=""
                className="left-img"
              />
            </div>
            <div className="right">
              <img src={models[activeImg].small} alt="" className="right-img" />
            </div>
          </div>
        </div>
      </Window>
      <img src="/decor/Union.png" alt="" className="decor_union" />
    </section>
  );
}
