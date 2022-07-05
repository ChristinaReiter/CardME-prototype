import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

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
  uploadWindow: {
    position: "relative",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: "20px",
    textAlign: "center",
    width: "241px",
    height: "306px",
    background: "#F3F3F3",
    marginRight: "20px",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
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
    display: "block",
    fontSize: 15,
    position: "relative",
    width: "300px",
    marginTop: "20px",
    marginRight: "20px",
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
            <Box style={styles.uploadWindow}>
              <div style={styles.textupload}>Upload your image</div>
              <div style={styles.textupload2}>
                Click here to upload from your computer. Your image needs to be
                at least 1328x1820 in PNG or JPG format.
              </div>
            </Box>

            <Button style={styles.button} variant="contained" color="secondary">
              Upload / change picture
            </Button>
            <Button style={styles.button} variant="contained" color="secondary">
              Browse card designs
            </Button>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <Box style={styles.adjustwindow}>
              <Typography style={styles.textadjust}>
                Adjust your design
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default CreateFront;
