"use client";
import { useState } from "react";
import "./artDisplayer.scss";

type artDisplayerProps = {
  images: {
    url: string;
    link?: string;
    name?: string;
  }[];
  hideControl?: boolean;
  description?: string;
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
        <img src={images[imgId].url} alt="" />
      </div>
      {!description && images[imgId].link && images[imgId].name && (
        <div className="credit">
          <p>Artwork by </p>
          <a href={images[imgId].link} target="_blank">
            {images[imgId].name}
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
