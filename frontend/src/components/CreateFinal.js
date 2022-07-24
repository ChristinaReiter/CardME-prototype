import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartService from "../services/ShoppingCartService";
import { db } from "../services/IndexedDBService";

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
    width: "390px",
    height: "484px",
    background: "#FFFFFF",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
    marginTop: "40px",
    marginDown: "40px",
  },
  image: {
    position: "relative",
    width: "390px",
    height: "484px",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
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

const CreateFinal = ({
  id,
  text,
  product,
  cardStyle,
  image,
  mode,
  rotation,
  brightness,
  contrast,
  saturate,
  grayscale,
  sepia,
  imageFilters,
  fontstyle,
  fontcolor,
  fontsize,
  fontalign,
  textFilters,
}) => {
  const [viewState, setViewState] = React.useState(true);

  const handleAddToCart = async () => {
    let itemToAdd = {
      image: image,
    };
    if (cardStyle === "own") {
      itemToAdd.title = "Own Card";
      itemToAdd.price = 5.9;
      itemToAdd.imageFilters = imageFilters;
    } else {
      itemToAdd.title = product.title;
      itemToAdd.price = product.price;
      itemToAdd.imageFilters = {};
    }
    ShoppingCartService.addItem(itemToAdd, text);
  };

  const handleUpdate = () => {
    let changedFields = {
      cardText: text,
    };
    if (cardStyle === "own") {
      changedFields.cardImage = image;
    }

    ShoppingCartService.updateItem(id, changedFields);
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
              <ArrowBackIosIcon
                onClick={() => {
                  setViewState(false);
                }}
                sx={{ fontSize: "60px" }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            {viewState ? (
              <Box style={styles.cardWindows} sx={{ float: "right" }}></Box>
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item xs={3}>
            {viewState ? (
              <Box style={styles.cardWindows} sx={{ float: "left" }}>
                <Box margin={"30px"} style={{ ...textFilters }}>
                  {text}
                </Box>
              </Box>
            ) : image !== null ? (
              <Box style={styles.cardWindows} sx={{ float: "left" }}>
                <img
                  style={
                    cardStyle === "own"
                      ? { ...styles.image, ...imageFilters }
                      : styles.image
                  }
                  src={URL.createObjectURL(image)}
                ></img>
              </Box>
            ) : (
              <Box
                style={styles.cardWindows}
                sx={{ float: "left", textAlign: "center" }}
              ></Box>
            )}
          </Grid>
          <Grid item xs={3}>
            <Box>
              <IconButton>
                <ArrowBackIosIcon
                  onClick={() => {
                    setViewState(true);
                  }}
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
            {mode === "edit" && (
              <Button
                style={styles.button}
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={handleUpdate}
              >
                Update in shopping cart
              </Button>
            )}
            {mode !== "edit" && (
              <Button
                style={styles.button}
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}
              >
                Add to shopping cart
              </Button>
            )}
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
