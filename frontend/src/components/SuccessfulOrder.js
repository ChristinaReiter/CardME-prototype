import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

const SuccessfulOrder = () => {
  const { id } = useParams();
  return (
    <Box justifyContent="center" alignItems="center" display="flex" height="100vh">
      <Typography textAlign="center">Order: {id} <br />
        Thank you for your order. We will sent it to the recipient on the chosen
        date
      </Typography>
    </Box>
  );
};

export default SuccessfulOrder;
