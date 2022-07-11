import { Typography, Slider, Button, Grid } from "@mui/material";
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
  return (
    <div>
      <Typography style={styles.textadjust}>Adjust your design</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "40px" }}
        spacing={1}
      >
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <Rotate90DegreesCcwIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Rotate </div>
        </Grid>
        <Grid item xs={2}>
          <RotateLeftIcon />
        </Grid>
        <Grid item xs={2}>
          <RotateRightIcon />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <LightModeIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Brightness </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <ContrastIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Contrast </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <OpacityIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Saturation </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <AutoAwesomeIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Vibrance </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={2}>
          <div> </div>
        </Grid>
        <Grid item xs={1}>
          <DetailsIcon fontSize="large" />
        </Grid>
        <Grid item xs={3}>
          <div style={styles.text1}> Sharpen </div>
        </Grid>
        <Grid item xs={4}>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ marginTop: "10px" }}
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
