import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuIcon,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { theme } from "../App";

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
  adjust: {
    position: "relative",
    width: "464px",
    height: "491px",
    left: "698px",
    top: "100px",
    background: "#F3F3F3",
    borderRadius: "30px",
  },
  uploadWindow: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "279px",
    height: "342px",
    left: "20%",
    top: "80px",
    background: "#FFFFFF",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  },
  insideUploadWindow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    display: "center",
    width: "241px",
    height: "306px",
    background: "#F3F3F3",
  },
  textupload: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "20px",
    display: "center",
    top: "80px",
  },
  textupload2: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "20px",
    display: "center",
    top: "80px",
    color: "rgba(0, 0, 0, 0.5)",
  },
  adjustwindow: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "464px",
    height: "491px",
    left: "55%",
    top: "-300px",
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
    position: "absolute",
    width: "300px",
    top: "600px",
    marginLeft: "50px",
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
        <div style={styles.uploadWindow}>
          <div style={styles.insideUploadWindow}>
            <div style={styles.textupload}>Upload your image</div>
            <div style={styles.textupload2}>
              Click here to upload from your computer. Your image needs to be at
              least 1328x1820 in PNG or JPG format.
            </div>
          </div>
        </div>
        <div style={styles.adjustwindow}>
          <div style={styles.textadjust}>Adjust your design</div>
        </div>
        <Button
          style={styles.button}
          sx={{ left: "80px" }}
          variant="contained"
          color="secondary"
        >
          Upload / change picture
        </Button>
        <Button
          style={styles.button}
          sx={{ left: "400px" }}
          variant="contained"
          color="secondary"
        >
          Browse card designs
        </Button>
      </Typography>
    </Box>
  );
};

export default CreateFront;
