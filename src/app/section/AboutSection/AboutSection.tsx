import Window from "@/app/components/Window/Window";
import "./aboutSection.scss";

import React from "react";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import TimeSyncSection from "../TimeSyncSection/TimeSyncSection";

type props = {
  sa: any;
  video: any;
};
export default async function AboutSection({ sa, video }: props) {
  return (
    <section id="about">
      {video && (
        <section id="schedules" className="video">
          <div className="sched-img">
            <div className="header">
              {/* <img src="decor/sched_heading.png" alt="" /> */}
              {/* <p className="decor text">SPECIAL ANNOUNCEMENT</p> */}
              {/* <img src="decor/sched_text.png" alt="" className="decor" /> */}
            </div>
            {/* <img src={sa ?? "/art/schedule_placeholder.png"} alt="" /> */}
            <video src={video} controls autoPlay muted loop></video>
          </div>
        </section>
      )}
      <section id="schedules" className="second">
        <div className="sched-img">
          <div className="header">
            {/* <img src="decor/sched_heading.png" alt="" /> */}
            <p className="decor text">SPECIAL ANNOUNCEMENT</p>
            {/* <img src="decor/sched_text.png" alt="" className="decor" /> */}
          </div>
          <img src={sa ?? "/art/schedule_placeholder.png"} alt="" />
        </div>
      </section>
      <div className="wc">
        <TimeSyncSection
          targetTime={new Date().toString()}
          isActive={false}
          onlyTime={true}
          onlyWC={true}
          // noBg={true}
        />
      </div>
      <div className="container">
        <div className="art-container">
          <img src="/art/nik-about.png" alt="" className="about-art" />
        </div>
        <div className="about-container">
          <Window>
            <SectionTitle
              directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
              run={
                <>
                  {"run >>"} <b>about-me</b>.bat
                </>
              }
            />

            <div className="about-text">
              <p>
                Hello, I’m <span className="wr">Nikulas Wraith</span>. I’m a
                variety streamer and a Virtual Phantom VTuber. My soul was lost
                many long years ago and then mistakenly uploaded to a gaming
                computer. I live the rest of my life inside of here along with a
                few others you might meet like, Nikki, Kid Nik, and even{" "}
                <span className="cor">Corrupt Nik</span>.
              </p>
              <p>
                I enjoy playing PC games like Minecraft, Fallout, Simulators,
                and puzzles.
              </p>

              <p>
                My favorite Anime to watch is Inuyasha, Cowboy Bebop, Big O,
                Neon Genesis Evangelion and plenty more. I also collect too many
                microphones, do Voice Overs and Foley Art.
              </p>

              <p>
                Ask me anything, I’m always open to telling you about myself,
                because I’m one chatty Phantom!
              </p>

              <p>
                Will you pass through the Phantom Portal and enter the Phantom
                Realm to escape reality?  I can’t wait to meet you, Spirit!
              </p>
            </div>
          </Window>
        </div>
      </div>
    </section>
  );
}
