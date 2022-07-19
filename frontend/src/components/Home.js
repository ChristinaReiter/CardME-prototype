import React from "react";
import { Button, Box } from "@mui/material";
import WelcomePostcard from "./../assets/images/welcome-postcard.png";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        <Button
          style={styles.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/cards");
          }}
        >
          Browse Cards
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create your own Card
        </Button>
      </Box>
      <Box style={styles.greenbackground} width="100%" height="50%"></Box>
    </div>
  );
};

export default Home;
