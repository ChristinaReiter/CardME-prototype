import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CardService from "../services/CardService";

const ShowFront = ({ product, setChosenImage, chosenImage, mode }) => {
  const baseUrl = "http://localhost:3001/public/";

  useEffect(() => {
    // Get image from backend, convert to blob for further usage
    async function getImage() {
      if (mode !== "edit") {
        let result = await fetch(
          baseUrl + product.foldername + "/" + product.url,
          { method: "GET" }
        );
        setChosenImage(await result.blob());
      }
    }
    getImage();
  }, [product]);

  return (
    <Box display="flex" justifyContent="center">
      {chosenImage && (
        <img src={URL.createObjectURL(chosenImage)} crossOrigin="anonymous" />
      )}
    </Box>
  );
};

export default ShowFront;
