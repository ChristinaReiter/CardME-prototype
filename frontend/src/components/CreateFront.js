import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import UploadImages, { UploadImages2 } from "./UploadImages";

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
  adjustwindow: {
    position: "relative",
    width: "464px",
    height: "491px",
    background: "#F3F3F3",
    borderRadius: "30px",
  },
  textadjust: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "32px",
    top: "20px",
  },
  button: {
    fontFamily: "typography",
    fontSize: 15,
    position: "relative",
    width: "300px",
    marginLeft: "40px",
    marginBottom: "20px",
    marginTop: "-30px",
  },
};

const CreateFront = () => {
  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }}>
              <div style={styles.kreis}>1.</div>
            </IconButton>
            <div fontSize={"30px"}>Create card front</div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          marginTop="30px"
        >
          <Grid item xs={4}>
            <UploadImages />
          </Grid>
          <Grid item xs={4} textAlign="center">
            <Box style={styles.adjustwindow}>
              <Typography style={styles.textadjust}>
                Adjust your design
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <label htmlFor="upload-images">
          <Button
            style={styles.button}
            variant="contained"
            color="secondary"
            id="upload-image-button"
            htmlFor="upload-images"
            component="span"
          >
            Upload / change picture
          </Button>
        </label>
        <Button
          style={styles.button}
          variant="contained"
          color="secondary"
          href=".././Cards"
        >
          Browse card designs
        </Button>
      </Typography>
    </Box>
  );
};

export default CreateFront;
