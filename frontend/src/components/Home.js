import React from "react";
import { Button, Box, Typography, Grid, Divider } from "@mui/material";
import WelcomePostcard from "./../assets/images/welcome-postcard.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import UpdateIcon from "@mui/icons-material/Update";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const styles = {
  image: {
    backgroundImage: `url(${WelcomePostcard})`,
    backgroundSize: "100%",
    position: "absolute",
  },
  button: {
    fontFamily: "typography",
    fontSize: 15,
    position: "relative",
    width: "300px",
  },
  greenbackground: {
    position: "absolute",
    top: "50%",
  },
  icons: {
    fontSize: "90px",
    padding: "0.5em 0em",
  },
  divide: {
    width: "120px",
    borderWidth: "1px",
  },
};

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <Box
        style={styles.image}
        width="100%"
        height="50%"
        sx={{
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "auto",
          flexDirection: "row",
        }}
      >
        <Button
          style={styles.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/cards");
          }}
        >
          Browse Cards
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(
              "/create/own/" + Math.floor(Math.random() * 100000000) + "/new"
            );
          }}
        >
          Create your own Card
        </Button>
      </Box>
      <Box
        style={styles.greenbackground}
        width="100%"
        bgcolor={theme.palette.primary.main}
        textAlign="center"
      >
        <Grid container padding="3em">
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Divider style={styles.divide}></Divider>
              <Typography
                variant="h3"
                fontFamily="Abrib Fatface"
                padding="0em 2em"
              >
                Send postcards effortlessly with CardME
              </Typography>
              <Divider style={styles.divide}></Divider>
            </Box>
          </Grid>

          <Grid item xs={2}>
            <CalendarMonthIcon style={styles.icons}></CalendarMonthIcon>
            <Typography>Schedule and manage cards via a timetable.</Typography>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2}>
            <CardGiftcardIcon style={styles.icons}></CardGiftcardIcon>
            <Typography>Add small gifts (envelope-size).</Typography>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2}>
            <UpdateIcon style={styles.icons}></UpdateIcon>
            <Typography>Subscribe option to send cards anually.</Typography>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2}>
            <ForwardToInboxIcon style={styles.icons}></ForwardToInboxIcon>
            <Typography>Premium delivery.</Typography>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2}>
            <NotificationsIcon style={styles.icons}></NotificationsIcon>
            <Typography>Notification before the sending.</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
