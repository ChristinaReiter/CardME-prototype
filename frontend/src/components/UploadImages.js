import React, { useState, useEffect } from "react";

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

export default function UploadImages({ id, image, setImage }) {
  const [imageURL, setImageURL] = useState(null);

  // Setting the imageUrl for below display if already existing in state with id else setting to null
  const getImage = async () => {
    if (image !== null) {
      setImageURL(URL.createObjectURL(image));
    } else {
      setImageURL(null);
    }
  };

  useEffect(() => {
    getImage();
  }, [image, id]);

  const onImageChange = async (e) => {
      setImage(e.target.files[0]);
  };

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
        {imageURL === null && (
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
        {imageURL && (
          <img
            src={imageURL}
            style={styles.cardWindow}
            id="card-image"
            className="card-image"
            alt="card"
          />
        )}
      </div>
    </div>
  );
}
