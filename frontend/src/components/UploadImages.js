import React, { useState, useEffect } from "react";
import ShoppingCartService from "../services/ShoppingCartService";

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
  cardWindow: {
    position: "relative",
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
  text1: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "20px",
    display: "center",
    top: "80px",
  },
  text2: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "20px",
    display: "center",
    top: "80px",
    color: "rgba(0, 0, 0, 0.5)",
  },
};

export default function UploadImages({ id, images, setImages }) {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => {
      newImageURLs.push(URL.createObjectURL(image));
    });
    setImageURLs(newImageURLs);
  }, [images]);

  async function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <div>
      <div>
        <input
          style={styles.hiddenUpload}
          type="file"
          onChange={onImageChange}
          accept="image*/"
          id="upload-images"
          name="upload-images"
        />
        {images.length == 0 && (
          <label htmlFor="upload-images" id="upload-images-label">
            <div style={styles.uploadWindow}>
              <div style={styles.text1}>Upload your image</div>
              <div style={styles.text2}>
                Click here to upload from your computer. Your image needs to be
                at least 1328x1820 in PNG or JPG format.
              </div>
            </div>
          </label>
        )}
      </div>
      <div>
        {imageURLs.map((imageSrc) => (
          <img
            src={imageSrc}
            style={styles.cardWindow}
            id="card-image"
            className="card-image"
            alt="card"
            sx={{}}
          />
        ))}
      </div>
    </div>
  );
}
