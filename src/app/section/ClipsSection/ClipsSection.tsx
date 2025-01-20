import React from "react";
import "./clipsSection.scss";
import { fetchData } from "@/db/client";
type Props = {};

export default async function ClipsSection({}: Props) {
  const clipsData = await fetchData<any[]>(`
		*[_type == 'clips']{
			title,
			description,
			'video': video.asset->url,
		}
	`);
  return (
    <section id="clips">
      <div className="heading">
        <h2>{"<< CLIPS >>"}</h2>
      </div>

      <div className="confine clip-list">
        {clipsData &&
          clipsData.map((clp: any) => {
            return (
              <div className="clip" key={clp._key}>
                <video src={clp.video} controls></video>
                <div className="info">
                  <h3>{clp.title}</h3>
                  <p>{clp.description}</p>
                </div>
              </div>
            );
          })}
        {/* <div className="clip">
          <video src="" controls></video>
          <div className="info">
            <h3>Video Title</h3>
            <p>description</p>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
