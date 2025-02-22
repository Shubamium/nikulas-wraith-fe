/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./artworksSection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import ArtDisplayer from "@/app/components/ArtDisplayer/ArtDisplayer";
import { fetchData, urlFor } from "@/db/client";
import { FaArrowRight, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import Link from "next/link";

type FanArtType = {
  _id: string;
  artwork: any;
  name: string;
  link: string; // Assuming 'link' is of type 'string'. Change it to the correct type.
};

type NikArtType = {
  _id: string;
  artwork: any;
};
export default async function ArtworksSection() {
  const artwork = await fetchData<{
    fanart: FanArtType[];
    nikart: FanArtType[];
  }>(`
	*[_type == 'general' && preset == 'main']{
		fanart[]->{
		_id,
		artwork,
		name,
		link},
		nikart[]->{
		_id,
		artwork,
		name,
		link
		}
	}	[0]
	`);
  // console.log(artwork);
  // const nikArtData = (await fetchData(
  //   `
  // 	*[_type == 'nik-art']{
  // 		_id,
  // 		artwork,
  // 		name,
  // 		link
  // 	}

  // 	`
  // )) as FanArtType[];

  return (
    <section id="artwork">
      <h2 className="title glowText">
        {"<<"} Artwork {">>"}
      </h2>
      <section className="art-point">
        <p> Check out more art on the</p>
        <Link href="/gallery?skip=1" className="btn btn-art">
          Gallery <FaArrowRight />
        </Link>
      </section>
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
            <ArtDisplayer
              images={artwork.fanart?.map((art) => {
                return {
                  url: urlFor(art.artwork)?.url() || "",
                  link: art.link,
                  name: art.name,
                };
              })}
            />
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
            <ArtDisplayer
              images={artwork.nikart?.map((art) => {
                return {
                  url: urlFor(art.artwork)?.url() || "",
                  link: art.link,
                  name: art.name,
                };
              })}
            />

            <div className="art-displayer"></div>
          </Window>
        </div>
      </div>
      <h2 className="title staff glowText" id={"staff"}>
        {"<<"} Staff {">>"}
      </h2>
      <div className="staff">
        <Window header="Staff">
          <SectionTitle
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            run={
              <>
                {"view >>"} <b>staff-list</b>
                {"/*.png"}
              </>
            }
          />
          <ArtDisplayer
            images={[
              {
                url: "/art/staff2.png",
                link: "https://x.com/MynervaMythos",
                name: "staff",
              },
            ]}
            description={
              <p className="desc">
                <a href="https://x.com/MynervaMythos" target="_blank">
                  Mynerva Mythos
                </a>{" "}
                <FaExternalLinkAlt />| ----------- A retired succubus (and now
                retired streamer) who keeps watch over Nik and his streams to
                make sure everything runs as smoothly as it can. Jokingly called
                the "Mynager", but she seems to take her job too seriously
                sometimes.
                {/* <a href="https://x.com/MynervaMythos">More info ---</a> */}
              </p>
            }
            hideControl={true}
          />

          <div className="art-displayer"></div>
        </Window>
      </div>
    </section>
  );
}
