import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function CarGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.image}
          alt=""
          className="w-full h-32 object-cover cursor-pointer"
          onClick={() => {
            setPhotoIndex(index);
            setIsOpen(true);
          }}
        />
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].image}
          nextSrc={images[(photoIndex + 1) % images.length].image}
          prevSrc={
            images[(photoIndex + images.length - 1) % images.length].image
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}
