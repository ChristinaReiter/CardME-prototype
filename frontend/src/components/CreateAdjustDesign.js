import { Typography, Slider, Button } from "@mui/material";
import React, { useEffect } from "react";

const styles = {
  textadjust: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "32px",
    top: "20px",
  },
};

const CreateAdjustDesign = () => {
  return (
    <div>
      <Typography style={styles.textadjust}>Adjust your design</Typography>

      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default CreateAdjustDesign;
