import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartService from "../services/ShoppingCartService";

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
  cardWindows: {
    position: "relative",
    textAlign: "center",
    width: "370px",
    height: "464px",
    background: "#FFFFFF",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
    marginTop: "40px",
    marginDown: "40px",
  },
  button: {
    fontFamily: "typography",
    display: "block",
    fontSize: 15,
    position: "relative",
    width: "300px",
    margin: "10px",
  },
};

const CreateFinal = ({ id, text }) => {
  const handleAddToCart = () => {
    let product = {
      _id: id,
      url: "",
      title: "Own Card",
      price: 9,
    };
    ShoppingCartService.addOwnCard(product);
  };

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }}>
              <div style={styles.kreis}>4.</div>
            </IconButton>
            <div fontSize={"30px"}>View the final card</div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={"30px"}
        >
          <Grid item xs={3}>
            <IconButton sx={{ float: "right", marginRight: "20px" }}>
              <ArrowBackIosIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <Box style={styles.cardWindows} sx={{ float: "right" }}></Box>
          </Grid>
          <Grid item xs={3}>
            <Box style={styles.cardWindows} sx={{ float: "left" }}>
              <div
                id="final-text-view"
                sx={{
                  marginTop: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                {text}
              </div>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <IconButton>
                <ArrowBackIosIcon
                  sx={{ transform: "rotate(180deg)", fontSize: "60px" }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={"60px"}
          textAlign="center"
        >
          <Grid item xs={3}>
            <Button
              style={styles.button}
              sx={{ float: "right" }}
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
            >
              Add to shopping cart
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button style={styles.button} variant="contained" color="secondary">
              Proceed to shipping / payment
            </Button>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default CreateFinal;
