import React from "react";
import "./artworksSection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import ArtDisplayer from "@/app/components/ArtDisplayer/ArtDisplayer";

export default function ArtworksSection() {
  return (
    <section id="artwork">
      <h2 className="title glowText">{'<<'} Artwork {'>>'}</h2>
      <div className="artwork-list">
        <div className="fanart">
          <Window>
            <SectionTitle
              directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
              run={
                <>
                  {"view >>"} <b>fan-art</b>
                  {"/*.png"}
                </>
              }
            />
						<ArtDisplayer images={['a','b','s']}/>
          </Window>
        </div>
        <div className="nikart">
          <Window>
            <SectionTitle
              directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
              run={
                <>
                  {"view >>"} <b>nik-art</b>
                  {"/*.png"}
                </>
              }
            />
							<ArtDisplayer images={['a','b','s']}/>

            <div className="art-displayer"></div>
          </Window>
        </div>
      </div>
    </section>
  );
}


