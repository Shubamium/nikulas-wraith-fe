import Window from "@/app/components/Window/Window";
import React from "react";
import "./liveViewSection.scss";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

type Props = {};

export default function LiveViewSection({}: Props) {
  return (
    <section id="live-view">
      <div className="confine">
        <Window header="◉ LIVE VIEW">
          <SectionTitle
            run={
              <>
                run {">>"} <strong>live-view.bat</strong>
              </>
            }
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
          />
          <p className="description">
            {" "}
            {"> "} Check out Nikulas Wraith LIVE below!{" "}
          </p>
          <div className="twitch-view">
            <iframe
              width="100%"
              height="100%"
              src="https://player.twitch.tv/?autoplay=false&channel=nikulaswraith&parent=nikulaswraith.com"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          </div>
        </Window>
      </div>
    </section>
  );
}
