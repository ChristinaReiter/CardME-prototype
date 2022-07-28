import { AppBar, Box, Toolbar, Typography, Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddGift from "./../assets/images/addGift.png";

const styles = {
  stepbar: {
    position: "relative",
    width: "100%",
    height: "60px",
    background: "#A7CDA7",
    boxShadow:
      "0px 6px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
    top: "10px",
    fontSize: "30px",
    zIndex: "1",
  },
  kreis: {
    fontFamily: '"Annie Use Your Telescope"',
    position: "relative",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#0A5108",
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "40px",
  },
  adjusttext: {
    position: "relative",
    width: "1146px",
    height: "254px",
    background: "#F3F3F3",
    borderRadius: "30px",
  },
  text: {
    fontFamily: "Annie Use Your Telescope",
    position: "relative",
    width: "664px",
    height: " 46px",
    fontWeight: "400",
    fontSize: "20px",
    textAlign: "center",
    top: "50px",
  },
  button: {
    fontFamily: "typography",
    display: "block",
    fontSize: 15,
    position: "relative",
    width: "300px",
    marginTop: "20px",
    marginRight: "20px",
  },
  image: {
    position: "relative",
    width: "400px",
  },
};

const CreateAddGift = ({ mode, cardStyle, id, chosenGift, setChosenGift }) => {
  const navigate = useNavigate();
  const imageUrl = "http://localhost:3001/public/";

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <Box sx={{ mr: 2 }} style={styles.kreis}>
              3.
            </Box>
            <Typography fontSize={"30px"}>
              Add a gift to your card, which fits perfectly in the envelope.
              (optional)
            </Typography>
          </Toolbar>
        </AppBar>
        {chosenGift ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography> Your Added Gift: </Typography>
              <img
                //src={imageUrl + chosenGift.foldername + "/" + chosenGift.url}
                src={"http://localhost:3001/public/gifts/confettiheartsred.jpg"}
                style={styles.image}
              ></img>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate(
                    "/gifts/create/" +
                      cardStyle +
                      "/" +
                      id +
                      (mode !== undefined ? "/" + mode : "")
                  );
                }}
              >
                Browse gifts
              </Button>
              <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setChosenGift(null);
                }}
              >
                Delete gift
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <img src={AddGift} alt="addGift" style={styles.image} />
            </Grid>
            <Grid item xs={4}>
              <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate(
                    "/gifts/create/" +
                      cardStyle +
                      "/" +
                      id +
                      (mode !== undefined ? "/" + mode : "")
                  );
                }}
              >
                Browse gifts
              </Button>
            </Grid>
          </Grid>
        )}
      </Typography>
    </Box>
  );
};

export default CreateAddGift;
