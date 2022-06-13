import React from "react";
import { Typography, Button, Box } from "@mui/material";
import WelcomePostcard from "./../assets/images/welcome-postcard.png";

const Home = () => {
  return (
    <div>
      <Box>
        <img
          src={WelcomePostcard}
          width="100%"
          sx={{ display: "block", height: "auto" }}
        ></img>

        <Button variant="contained" color="secondary">
          Browse Cards
        </Button>
        <Button variant="contained" color="secondary">
          Create your own Card
        </Button>
      </Box>
    </div>
  );
};

export default Home;
