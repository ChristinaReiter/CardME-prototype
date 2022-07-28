import { Box } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const ShowFront = ({ product, setImage, mode }) => {
  const styles = {
    image: {
      position: "relative",
      width: "300px",
      height: "390px",
      boxShadow:
        "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
      marginTop: "40px",
      marginDown: "40px",
    },
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
    button: {
      fontFamily: "typography",
      display: "block",
      fontSize: 15,
      position: "relative",
      width: "300px",
      margin: "10px",
    },
  };
  const navigate = useNavigate();
  // For internal image dipslay
  const [imageUrl, setImageUrl] = useState(null);
  const baseUrl = "http://localhost:3001/public/";

  const setBackendImage = async () => {
    if (mode !== "edit") {
      let result = await fetch(
        baseUrl + product.foldername + "/" + product.url,
        { method: "GET" }
      );

      result = await result.blob();
      setImage(result);
      setImageUrl(URL.createObjectURL(result));
    } else {
      setImageUrl(URL.createObjectURL(product.cardImage));
    }
  };

  useEffect(() => {
    // Get image from backend, convert to blob for further usage
    if (product !== undefined) {
      setBackendImage();
    }
  }, [product]);

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }}>
              <div style={styles.kreis}>1.</div>
            </IconButton>
            <div fontSize={"30px"}>View card front</div>
          </Toolbar>
        </AppBar>
      </Typography>
      <Box display="flex" justifyContent="center">
        {imageUrl !== null && (
          <img src={imageUrl} crossOrigin="anonymous" style={styles.image} alt="Card"/>
        )}
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginBottom={"20px"}
        marginTop={"20px"}
        textAlign="center"
      >
        <Grid item xs={6}>
          <NavLink
            style={styles.menuText}
            to={"/create/own/" + Math.floor(Math.random() * 100000000)}
          >
            <Button
              style={styles.button}
              sx={{ float: "right" }}
              variant="contained"
              color="secondary"
            >
              Upload your own design
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Button
            style={styles.button}
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/cards");
            }}
          >
            Browse card designs
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowFront;
