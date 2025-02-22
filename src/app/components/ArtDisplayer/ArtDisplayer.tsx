"use client";
import React, { useState } from "react";
import "./artDisplayer.scss";

type artDisplayerProps = {
  images: {
    url: string;
    link?: string;
    name?: string;
  }[];
  hideControl?: boolean;
  description?: React.ReactNode;
};
export default function ArtDisplayer({
  images,
  hideControl,
  description,
}: artDisplayerProps) {
  // const [activeImg,setActiveImg] = useState('')
  const [imgId, setImgId] = useState(0);

  const handleNext = () => {
    if (images.length > 1) setImgId((imgId) => (imgId + 1) % images.length);
  };
  const handlePrev = () => {
    if (images.length > 1)
      setImgId((imgId) => (imgId - 1 + images.length) % images.length);
  };
  return (
    <div className="art-displayer">
      <div className="art-container">
        <img src={images[imgId] && images[imgId].url} alt="" />
      </div>
      {!description &&
        images[imgId] &&
        images[imgId].link &&
        images[imgId] &&
        images[imgId].name && (
          <div className="credit">
            <p>Artwork by </p>
            <a href={images[imgId] && images[imgId].link} target="_blank">
              {images[imgId] && images[imgId].name}
            </a>
          </div>
        )}
      {description && (
        <div className="credit">
          <p>{description}</p>
        </div>
      )}

      {!hideControl && (
        <div className="controls">
          <p onClick={handlePrev}>{"<< Previous"}</p>
          <b>{imgId}</b>
          <p onClick={handleNext}>{"Next >>"}</p>
        </div>
      )}
    </div>
  );
}
