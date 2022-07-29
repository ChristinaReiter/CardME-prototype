import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartService from "../services/ShoppingCartService";
import { useNavigate } from "react-router-dom";

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
    overflow: "hidden",
  },
  imageWindow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    width: "390px",
    //height: "484px",
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
  cardheight,
  cardwidth,
  lineHeight,
  chosenGift,
  popoverDrafts,
  setPopoverDrafts,
}) => {
  const [viewState, setViewState] = React.useState(true);
  // For internal image display
  const [imageUrl, setImageUrl] = useState(null);
  const [cardError, setCardError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // set local state
    if (image !== null) {
      setImageUrl(URL.createObjectURL(image));
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const handleAddToCart = async () => {
    // If image and text not empty
    if (image && image !== null && text && text !== null && text !== "") {
      // Values always given
      let itemToAdd = {
        image: image,
        textFilters: textFilters,
        textFilterValues: {
          fontAlign: fontalign,
          fontColor: fontcolor,
          fontSize: fontsize,
          fontStyle: fontstyle,
          lineHeight: lineHeight,
        },
        giftId: null,
        giftPrice: 0,
        giftImage: null,
      };

      // If gift chosen
      if (chosenGift !== null) {
        itemToAdd.giftId = chosenGift._id;
        itemToAdd.giftPrice = chosenGift.price;
        itemToAdd.giftImage = chosenGift.url;
      }

      // Additional values for own cards (especially image filters)
      if (cardStyle === "own") {
        itemToAdd.title = "Own Card";
        itemToAdd.price = 5.9;
        itemToAdd.imageFilters = imageFilters;
        // To restore slider on edit
        itemToAdd.imageFilterValues = {
          rotation: rotation,
          brightness: brightness,
          contrast: contrast,
          saturate: saturate,
          grayscale: grayscale,
          sepia: sepia,
          cardheight: cardheight,
          cardwidth: cardwidth,
        };
      } else {
        // Additional values for chosen card
        itemToAdd.title = product.title;
        itemToAdd.price = product.price;
        itemToAdd.imageFilters = {};
        itemToAdd.imageFilterValues = {};
      }
      return ShoppingCartService.addItem(itemToAdd, text);
    } else {
      setCardError(true);
    }
  };

  // Add to cart and redirect
  const handleAddAndRedirect = () => {
    handleAddToCart().then((key) => {
      if (key) {
        navigate("/checkout-data/" + key);
      }
    });
  };

  const handleUpdate = () => {
    // If image and text not empty
    if (image && image !== null && text && text !== null && text !== "") {
      // Values always given, potentially changed
      let changedFields = {
        cardText: text,
        cardTextFilters: textFilters,
        cardTextFilterValues: {
          fontAlign: fontalign,
          fontColor: fontcolor,
          fontSize: fontsize,
          fontStyle: fontstyle,
          lineHeight: lineHeight,
        },
        giftId: null,
        giftPrice: 0,
        giftImage: null,
      };

      // If gift chosen
      if (chosenGift !== null) {
        changedFields.giftId = chosenGift._id;
        changedFields.giftPrice = chosenGift.price;
        changedFields.giftImage = chosenGift.url;
      }
      // Additional fields potentially changed for own card
      if (cardStyle === "own") {
        changedFields.cardImageFilters = imageFilters;
        changedFields.cardImageFilterValues = {
          rotation: rotation,
          brightness: brightness,
          contrast: contrast,
          saturate: saturate,
          grayscale: grayscale,
          sepia: sepia,
          cardheight: cardheight,
          cardwidth: cardwidth,
        };
        changedFields.cardImage = image;
      }

      ShoppingCartService.updateItem(id, changedFields);
    } else {
      setCardError(true);
    }
  };

  // Update values and redirect
  const handleUpdateAndRedirect = () => {
    handleUpdate();
    navigate("/checkout-data/" + id);
  };

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }} style={styles.kreis}>
              4.
            </IconButton>
            <Typography fontSize={"30px"}>View the final card</Typography>
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
            <IconButton
              onClick={() => {
                setViewState(false);
              }}
              sx={{ float: "right", marginRight: "20px" }}
            >
              <ArrowBackIosIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </Grid>
          {/* viewState inner pages */}
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
                <Box
                  margin={"30px"}
                  style={{ ...textFilters }}
                  whiteSpace="pre-wrap"
                >
                  {text}
                </Box>
              </Box>
            ) : imageUrl !== null ? (
              // Front page with image
              <Box
                style={{ ...styles.cardWindows, ...styles.imageWindow }}
                sx={{ float: "left" }}
              >
                <img
                  style={
                    cardStyle === "own"
                      ? { ...styles.image, ...imageFilters }
                      : styles.image
                  }
                  src={imageUrl}
                ></img>
              </Box>
            ) : (
              // Empty front page
              <Box
                style={styles.cardWindows}
                sx={{ float: "left", textAlign: "center" }}
              ></Box>
            )}
          </Grid>
          <Grid item xs={3}>
            <Box>
              <IconButton
                onClick={() => {
                  setViewState(true);
                }}
              >
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
                onClick={(event) => {
                  handleAddToCart();
                  setPopoverDrafts("block");
                }}
              >
                Add to shopping cart
              </Button>
            )}
          </Grid>
          <Grid item xs={3}>
            {mode === "edit" && (
              <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={handleUpdateAndRedirect}
              >
                Update and Proceed to checkout
              </Button>
            )}
            {mode !== "edit" && (
              <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={handleAddAndRedirect}
              >
                Proceed to checkout
              </Button>
            )}
          </Grid>
        </Grid>
      </Typography>
      {/* Popup for cardError */}
      <Dialog
        open={cardError}
        onClose={() => setCardError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error on insertion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please at least upload or choose an image. Also a bit of text would
            be nice...
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateFinal;
