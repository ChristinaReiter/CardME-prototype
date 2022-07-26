import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";

const SuccessfulOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="90vh"
      flexDirection="column"
      overflow="hidden"
    >
      <MailIcon fontSize="large"></MailIcon>
      <Typography textAlign="center" padding="2em 0em">
        Your order id: {id} <br />
        Thank you for your order. We will sent it to the recipient on the chosen
        date
      </Typography>
      <Button color="secondary" variant="contained" onClick={() => {navigate("/")}}>
        Continue shopping
      </Button>
    </Box>
  );
};

export default SuccessfulOrder;
