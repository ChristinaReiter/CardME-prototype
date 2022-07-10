import React, { useState, useEffect } from "react";

export default function UploadImages() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => {
      newImageURLs.push(URL.createObjectURL(image));
    });
    setImageURLs(newImageURLs);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <>
      <input type="file" onChange={onImageChange} multiple accept="image*/" />
      {imageURLs.map((imageSrc) => (
        <img src={imageSrc} />
      ))}
    </>
  );
}
