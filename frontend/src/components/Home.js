import React from "react";
import { Typography, Button, Box } from "@mui/material";
import WelcomePostcard from "./../assets/images/welcome-postcard.png";
import { spacing } from "@mui/system";

const styles = {
  image: {
    backgroundImage: `url(${WelcomePostcard})`,
    backgroundSize: "100%",
    position: "absolute",
  },
  button: {
    fontFamily: "typography",
    fontSize: 15,
    position: "relative",
    width: "300px",
  },
  greenbackground: {
    backgroundColor: "primary.main",
    position: "absolute",
    top: "50%",
  },
};

const Home = () => {
  return (
    <div>
      <Box
        style={styles.image}
        width="100%"
        height="50%"
        sx={{
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "auto",
          flexDirection: "row",
        }}
      >
        <Button style={styles.button} variant="contained" color="secondary">
          Browse Cards
        </Button>
        <Button style={styles.button} variant="contained" color="secondary">
          Create your own Card
        </Button>
      </Box>
      <Box style={styles.greenbackground} width="100%" height="50%"></Box>
    </div>
  );
};

export default Home;
