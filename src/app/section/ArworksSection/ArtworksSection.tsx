/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./artworksSection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import ArtDisplayer from "@/app/components/ArtDisplayer/ArtDisplayer";
import { fetchData, urlFor } from "@/db/client";
import { FaExternalLinkAlt, FaLink } from "react-icons/fa";

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
  const fanArtData = (await fetchData(`
	*[_type == 'fan-art']{
		_id,
		artwork,
		name,
		link
	}	
	`)) as FanArtType[];

  const nikArtData = (await fetchData(
    `
		*[_type == 'nik-art']{
			_id,
			artwork,
			name,
			link
		}
		
		`
  )) as FanArtType[];

  return (
    <section id="artwork">
      <h2 className="title glowText">
        {"<<"} Artwork {">>"}
      </h2>
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
              images={fanArtData.map((art) => {
                return {
                  url: urlFor(art.artwork).url(),
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
              images={nikArtData.map((art) => {
                return {
                  url: urlFor(art.artwork).url(),
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
                url: "/art/staff.png",
                link: "https://x.com/MynervaMythos",
                name: "staff",
              },
            ]}
            description={
              <p className="desc">
                <a href="https://x.com/MynervaMythos" target="_blank">
                  Mynerva Mythos
                </a>{" "}
                <FaExternalLinkAlt />| ----------- is a retired succubus who got
                sick and tired of committing lewd acts and decided to suck at
                something else -- like video games. She stumbled upon Nik's
                stream on the now defunct V-Stream (RIP) because she has a
                weakness to white-haired anime men and Christmas Tree hair.
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
