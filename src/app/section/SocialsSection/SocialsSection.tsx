import React from "react";
import "./socialsSection.scss";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import {
  FaDiscord,
  FaYoutube,
  FaYoutubeSquare,
  FaTwitch,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbRectangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { IoShareSocialSharp } from "react-icons/io5";
export default function SocialsSection() {
  return (
    <section id="socials">
      <div className="socials-header">
        <div className="container">
          <h2>
            <IoShareSocialSharp /> Socials
          </h2>
        </div>
      </div>
      <div className="socials-body">
        <div className="container">
          <SectionTitle
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            run={
              <>
                {"-curl >>"} nikulaswraith.com/<b>socials</b>
              </>
            }
            description="Check out my social medias and say hello to me there as well"
          />
        </div>

        <div className="socials-list">
          <a className="socials" href="https://discord.gg/dpXAAuKgaG">
            <div className="icon">
              <FaDiscord />
            </div>
            <div className="text">
              <h2>Discord</h2>
            </div>
          </a>
          <a className="socials" href="https://twitter.com/NikulasWraith">
            <div className="icon">
              <BsTwitterX />
            </div>
            <div className="text">
              <h2>Twitter (x)</h2>
            </div>
          </a>

          <a className="socials" href="https://www.twitch.tv/nikulaswraith">
            <div className="icon">
              <FaTwitch />
            </div>
            <div className="text">
              <h2>Twitch</h2>
            </div>
          </a>

          <a className="socials" href="ttps://www.youtube.com/@nikulaswraith">
            <div className="icon">
              <FaYoutube />
            </div>
            <div className="text">
              <h2>Youtube (Main)</h2>
            </div>
          </a>
          <a
            className="socials"
            href="ttps://www.youtube.com/@nikulaswraithextra"
          >
            <div className="icon">
              <FaYoutubeSquare />
            </div>
            <div className="text">
              <h2>Youtube (Extra)</h2>
            </div>
          </a>
          <a className="socials" href="https://vstream.com/c/@Nikulas_Wraith">
            <div className="icon">
              <TbTriangleInvertedFilled />
            </div>
            <div className="text">
              <h2>VStream</h2>
            </div>
          </a>
          <a
            className="socials"
            href="https://bsky.app/profile/nikulaswraith.bsky.social"
          >
            <div className="icon">
              <TbRectangleFilled />
            </div>
            <div className="text">
              <h2>Bluesky</h2>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
