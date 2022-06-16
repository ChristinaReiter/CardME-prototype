import React from "react";
import { Typography, Button, Box } from "@mui/material";
import WelcomePostcard from "./../assets/images/welcome-postcard.png";
import { spacing } from "@mui/system";

const Home = () => {
  return (
    <div>
      <Box>
        <img alt="welcome-postcard" src={WelcomePostcard} width="100%"></img>

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
