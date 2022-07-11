import React, { useState, useEffect, Input, Button } from "react";

const styles = {
  uploadWindow: {
    position: "relative",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: "20px",
    textAlign: "center",
    width: "241px",
    height: "306px",
    background: "#F3F3F3",
    marginRight: "20px",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
  },
  hiddenUpload: {
    display: "none",
  },
};

export default function UploadImages() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const uploadLabel = document.getElementById("upload-images-label");

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
    uploadLabel.style.display = "none";
  }

  return (
    <>
      <div>
        <input
          style={styles.hiddenUpload}
          type="file"
          onChange={onImageChange}
          multiple
          accept="image*/"
          id="upload-images"
          name="upload-images"
        />
        <label htmlFor="upload-images" id="upload-images-label">
          <div style={styles.uploadWindow}></div>
        </label>
      </div>
      {imageURLs.map((imageSrc) => (
        <img src={imageSrc} style={styles.uploadWindow} />
      ))}
    </>
  );
}
