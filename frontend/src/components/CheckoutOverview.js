import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const CheckoutOverview = ({ checkoutData }) => {
  const theme = useTheme();
  const styles = {
    detailBox: {
      marginLeft: "3em",
      padding: "2em",
      borderRadius: "15px",
      background: "#fff",
    },
    breadcrumbs: {
      textDecoration: "none",
      fontFamily: "Abril Fatface",
      color: "#000",
    },
  };

  return (
    <div>
      <Box className="subheader">
        <Box paddingLeft="1em">
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=">"
            style={styles.breadcrumbs}
          >
            <NavLink style={styles.breadcrumbs} to="/create">
              Edit card
            </NavLink>
            <NavLink style={styles.breadcrumbs} to="/checkout-data">
              Delivery Information
            </NavLink>
            <Typography fontFamily="Abril Fatface">Checkout</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box padding="3em">
        <Typography variant="h2">Checkout</Typography>
        <Box bgcolor={theme.palette.tertiary.main} padding="4em" fontFamily="Antic">
          <Typography fontFamily="Antic">Delivery on {checkoutData.deliveryDate}</Typography>
          <Typography fontFamily="Antic">Recurring delivery: -</Typography>
        </Box>
        <Box
          bgcolor={theme.palette.tertiary.main}
          padding="4em"
          marginTop="4em"
        >
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4">Delivery details</Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Your details</Typography>
              <Typography fontFamily="Antic">{checkoutData.email}</Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Billing address</Typography>
              <Typography fontFamily="Antic">
                {checkoutData.billingFirstName} {checkoutData.billingLastName}
                <br />
                {checkoutData.billingStreet} {checkoutData.billingNumber} <br />
                {checkoutData.billingZipcode} {checkoutData.billingCity} <br />
                {checkoutData.billingCountry}
              </Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Recipient address</Typography>
              <Typography fontFamily="Antic">
                {checkoutData.recipientFirstName}{" "}
                {checkoutData.recipientLastName}
                <br />
                {checkoutData.recipientStreet} {checkoutData.recipientNumber}{" "}
                <br />
                {checkoutData.recipientZipcode} {checkoutData.recipientCity}{" "}
                <br />
                {checkoutData.recipientCountry}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box bgcolor={theme.palette.tertiary.main} marginTop="4em">
          <Typography variant="h4">Payment</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CheckoutOverview;
