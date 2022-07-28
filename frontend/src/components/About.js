import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Christina from "../assets/images/Christina.png";
import Constantin from "../assets/images/Constantin.png";
import Justus from "../assets/images/Justus.png";
import Viola from "../assets/images/Viola.png";

const styles = {
  image: {
    objectFit: "cover",
    width: "150px",
    height: "210px",
    boxShadow:
      "0px 6px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
  },
  text: {
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "20px",
  },
};

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.primary.main}
      height="100%"
      position="absolute"
      width="100%"
    >
      <Grid container spacing={2} mt="10px">
        <Grid item xs={12} textAlign="center">
          <Typography fontFamily="Abril Fatface" fontSize="32px" color="black">
            Business idea
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} textAlign="center">
          <Typography color="black" style={styles.text}>
            CardME is a subscription service to help individuals to stay in
            touch or remember different special occasions from acquaintances by
            sending physical, customisable and thoughtful cards with optional
            small gifts.
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={12} textAlign="center">
          <Typography fontFamily="Abril Fatface" fontSize="32px" color="black">
            CardMe team
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography style={styles.text} color="black">
            We are a team of Information System Master students from the
            Technical University of Munich.
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2} textAlign="center">
          <img src={Christina} alt="christina" style={styles.image} />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <img src={Constantin} alt="christina" style={styles.image} />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <img src={Justus} alt="christina" style={styles.image} />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <img src={Viola} alt="christina" style={styles.image} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container spacing={2} mt="10px">
        <Grid item xs={2}></Grid>
        <Grid item xs={2} textAlign="center" style={styles.text}>
          Christina Reiter
        </Grid>
        <Grid item xs={2} textAlign="center" style={styles.text}>
          Constantin Harms
        </Grid>
        <Grid item xs={2} textAlign="center" style={styles.text}>
          Justus Schönborn
        </Grid>
        <Grid item xs={2} textAlign="center" style={styles.text}>
          Viola Stumpf
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
