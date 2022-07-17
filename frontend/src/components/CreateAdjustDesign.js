import { Typography, Slider, Button, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import OpacityIcon from "@mui/icons-material/Opacity";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DetailsIcon from "@mui/icons-material/Details";
import UploadImages from "./UploadImages";

const styles = {
  textadjust: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "32px",
    top: "20px",
  },
  text1: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "20px",
    float: "left",
  },
};

const CreateAdjustDesign = () => {
  const cardImage = document.getElementById("card-image");

  const [brightness, setBrightness] = React.useState(100);
  const [contrast, setContrast] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [grayscale, setGrayscale] = React.useState(0);
  const [sepia, setSepia] = React.useState(0);

  function updateFilters() {
    cardImage.style.filter =
      "brightness(" +
      brightness +
      "%) contrast(" +
      contrast +
      "%) saturate(" +
      saturate +
      "%)  sepia(" +
      sepia +
      "%)  grayscale(" +
      grayscale +
      "%)";
  }

  return (
    <div>
      <Typography style={styles.textadjust}>Adjust your design</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "60px" }}
        spacing={1}
      >
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <Rotate90DegreesCcwIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Rotate </div>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <RotateLeftIcon fontSize="medium" />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <RotateRightIcon fontSize="medium" />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <LightModeIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Brightness </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            aria-label="Small"
            onChange={(event, newValue) => {
              setBrightness(newValue);
              updateFilters();
            }}
            value={brightness}
            valueLabelDisplay="auto"
            property="brightness"
            name="Brightness"
            min={0}
            max={200}
            unit="%"
            sx={{
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <ContrastIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Contrast </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            aria-label="Small"
            onChange={(event, newValue) => {
              setContrast(newValue);
              updateFilters();
            }}
            value={contrast}
            valueLabelDisplay="auto"
            property="contrast"
            name="Contrast"
            min={0}
            max={200}
            unit="%"
            sx={{
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <OpacityIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Saturation </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            aria-label="Small"
            onChange={(event, newValue) => {
              setSaturate(newValue);
              updateFilters();
            }}
            value={saturate}
            valueLabelDisplay="auto"
            property="saturation"
            name="Saturation"
            min={0}
            max={200}
            unit="%"
            sx={{
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <AutoAwesomeIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> B/W </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            aria-label="Small"
            onChange={(event, newValue) => {
              setGrayscale(newValue);
              updateFilters();
            }}
            value={grayscale}
            valueLabelDisplay="auto"
            property="vibrance"
            name="Vibrance"
            min={0}
            max={100}
            unit="%"
            sx={{
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <DetailsIcon fontSize="medium" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Sepia </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            aria-label="Small"
            onChange={(event, newValue) => {
              setSepia(newValue);
              updateFilters();
            }}
            value={sepia}
            valueLabelDisplay="auto"
            property="blur"
            name="Blur"
            min={0}
            max={100}
            unit="%"
            sx={{
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateAdjustDesign;
