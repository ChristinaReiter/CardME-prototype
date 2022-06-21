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
    width: "100%",
    height: "60px",
    background: "#A7CDA7",
    boxShadow:
      "0px 6px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
    top: "60px",
    fontSize: "30px",
  },
  kreis: {
    fontFamily: '"Annie Use Your Telescope"',
    position: "absolute",
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
    position: "absolute",
    width: "464px",
    height: "491px",
    left: "698px",
    top: "182px",
    background: "#F3F3F3",
    borderRadius: "30px",
  },
};

const CreateFront = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }}>
              <div style={styles.kreis}>1.</div>
            </IconButton>
            <div fontSize={"30px"}>Create card front</div>
          </Toolbar>
        </AppBar>
      </Typography>
      <div></div>
    </Box>
  );
};

export default CreateFront;
