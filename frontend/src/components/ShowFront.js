import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CardService from "../services/CardService";

const ShowFront = ({product}) => {
  const baseUrl = "http://localhost:3001/public/";

  return (
    <Box display="flex" justifyContent="center">
      { product &&
      <img src={baseUrl + product.url} crossOrigin="anonymous" />
      }
    </Box>
  );
};

export default ShowFront;
