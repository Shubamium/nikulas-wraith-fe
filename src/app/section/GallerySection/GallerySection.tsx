"use client";
import React, { useEffect, useState } from "react";
import "./gallerySection.scss";
import Window from "@/app/components/Window/Window";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import { IoReturnDownBack } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import { createPortal } from "react-dom";
import { urlFor } from "@/db/client";

type Props = { data: GalleryData };

// - Tab
// -- folder
// --- image list

type Art = {
  name: string;
  artist: {
    name: string;
    link: string;
  };
  img: any;
  activeImg?: string;
};
type Category = {
  name: string;
  art: Art[];
};

let art: Art = {
  name: "artone",
  artist: {
    link: "https://google.com",
    name: "@username_artist",
  },
  img: "https://developers.elementor.com/docs/assets/img/elementor-data-image.png",
};

type GalleryData = { [key: string]: Category[] };
const placeholder: GalleryData = {
  FanArt: [
    {
      name: "cat1",
      art: [art, art, art],
    },
  ],
  "Commissioned Art": [
    {
      name: "cat2",
      art: [art, art],
    },
    {
      name: "cat3",
      art: [art, art],
    },
  ],
  "Model Art": [
    {
      name: "cat41",
      art: [art, art],
    },
    {
      name: "cat15",
      art: [art, art],
    },
    {
      name: "cat44",
      art: [art, art],
    },
  ],
  "d Art": [
    {
      name: "cat41",
      art: [art, art],
    },
    {
      name: "cat15",
      art: [art, art],
    },
    {
      name: "cat44",
      art: [art, art],
    },
  ],
};

export default function GallerySection({ data }: Props) {
  const tabList = Object.keys(data);
  const [selectedTab, setSelectedTab] = useState(
    tabList.length >= 1 ? tabList[0] : ""
  );
  const [selectedFolder, setSelectedFolder] = useState<null | number>(null);
  const [selectedImage, setSelectedImage] = useState<null | Art>(null);

  const shouldShowFolder =
    selectedTab !== "" && data[selectedTab] && selectedFolder === null;
  const shouldShowFile = selectedTab !== "" && selectedFolder !== null;
  const clear = () => {
    setSelectedFolder(null);
    setSelectedImage(null);
  };

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <div id="gallery">
      <section className="gallery-header">
        <h2>Gallery</h2>

        <div className="confine">
          <SectionTitle
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            run={
              <>
                {"view >>"} <b>explorer.bat</b>
              </>
            }
          />
        </div>
      </section>
      <section className="gallery-explorer">
        <Window header="Explorer">
          <SectionTitle
            directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            run={
              <>
                {"ls >>"} <b>gallery</b>
              </>
            }
          />
          <div className="gallery-control">
            <div className="tabs">
              {tabList.map((tabs, index) => {
                return (
                  <>
                    <button
                      className={`btn ${
                        selectedTab === tabs ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedTab(tabs);
                        clear();
                      }}
                      key={"tab-" + index}
                    >
                      {tabs}
                    </button>
                    <span>{index !== tabList.length - 1 ? "||" : ""}</span>
                  </>
                );
              })}{" "}
            </div>
            <div className="back">
              <button className="btn back" onClick={clear}>
                <span>
                  <IoReturnDownBack /> Back
                </span>
              </button>
            </div>
          </div>
          <div className="gallery-list">
            {shouldShowFolder &&
              data[selectedTab] &&
              data[selectedTab].map((cat, index) => {
                return (
                  <button
                    className="folder"
                    onClick={() => {
                      setSelectedFolder(index);
                    }}
                    key={"cat" + cat.name}
                  >
                    {cat.art.length >= 1 ? (
                      <div className="thumb">
                        <img
                          src={urlFor(cat.art[0].img)?.size(130, 100).url()}
                          alt=""
                        />
                      </div>
                    ) : (
                      <FaFolder />
                    )}

                    <p className="">{cat.name} </p>
                  </button>
                );
              })}

            {shouldShowFile &&
              data[selectedTab][selectedFolder].art.map((art, index) => {
                return (
                  <button
                    // href="https://developers.elementor.com/docs/assets/img/elementor-data-image.png"
                    className="folder imagefile"
                    key={"art-" + index}
                    onClick={() => {
                      setSelectedImage({
                        ...art,
                        activeImg: urlFor(art.img)?.url(),
                      });
                    }}
                  >
                    <img
                      src={
                        (art.img && urlFor(art.img)?.size(130, 100).url()) ??
                        "https://developers.elementor.com/docs/assets/img/elementor-data-image.png"
                      }
                      alt=""
                    />
                    <p className="">{art.name}.png </p>
                    {art.artist && (
                      <a
                        href={art.artist.link}
                        target="_blank"
                        className="author"
                      >
                        {art.artist.name}
                      </a>
                    )}
                  </button>
                );
              })}

            {/* {createPortal(
              <div
                id="gallery-lightbox"
                onClick={() => {
                  setSelectedImage(null);
                }}
                className={selectedImage === null ? "hidden" : "visible"}
              >
                <a href={selectedImage?.img} target="_blank">
                  <img
                    src={selectedImage?.img ?? ""}
                    alt=""
                    className="full-img"
                  />
                </a>
                {selectedImage && (
                  <p className="info">
                    {selectedImage.name}.png{" "}
                    {selectedImage.artist && (
                      <a href={selectedImage.artist.link} className="credit">
                        {selectedImage.artist.name}
                      </a>
                    )}
                  </p>
                )}
                <p className="hint">Click anywhere to close</p>
              </div>,
              document.body
            )} */}

            {/* <button className="folder imagefile">
              <img
                src="https://developers.elementor.com/docs/assets/img/elementor-data-image.png"
                alt=""
              />
              <p className="">Category.png </p>
              <a href="https://google.com" target="_blank" className="author">
                @username
              </a>
            </button> */}
            {/* <button className="folder imagefile">
              <img
                src="https://developers.elementor.com/docs/assets/img/elementor-data-image.png"
                alt=""
              />
              <p className="">Category.png </p>
              <a href="https://google.com" target="_blank" className="author">
                @username
              </a>
            </button> */}
          </div>
        </Window>
      </section>
      {load &&
        createPortal(
          <div
            id="gallery-lightbox"
            onClick={() => {
              setSelectedImage(null);
            }}
            className={selectedImage === null ? "hidden" : "visible"}
          >
            <a href={selectedImage?.activeImg} target="_blank">
              <img src={selectedImage?.activeImg} alt="" className="full-img" />
            </a>
            {selectedImage && (
              <p className="info">
                {selectedImage.name}.png{" "}
                {selectedImage.artist && (
                  <a href={selectedImage.artist.link} className="credit">
                    {selectedImage.artist.name}
                  </a>
                )}
              </p>
            )}
            <p className="hint">Click anywhere to close</p>
          </div>,
          document.getElementById("gallery-head") || document.body,
          "main"
        )}
    </div>
  );
}
