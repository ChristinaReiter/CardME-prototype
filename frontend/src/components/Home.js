import React from "react";
import { Typography, Button } from "@mui/material";



const Home = () => {
  return (
    <div>
      <Typography variant="h6" color="primary">
        Home Page
      </Typography>

      <Button variant="contained" color="secondary">
        Browse Cards
      </Button>
      <Button variant="contained" color="secondary">
        Create your own Card
      </Button>
    </div>
  );
};

export default Home;
