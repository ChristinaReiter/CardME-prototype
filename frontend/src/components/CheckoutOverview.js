import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

const CheckoutOverview = ({ checkoutData }) => {
  const theme = useTheme();
  useEffect(() => {
    console.log(checkoutData);
  }, []);

  return (
    <Box padding="3em">
      <Typography variant="h2">Checkbox</Typography>
      <Box></Box>
      <Box bgcolor={theme.palette.tertiary.main}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">Delivery details</Typography>
          </Grid>
          <Grid item xs={3} bgcolor="#fff">
            <Typography variant="h5">Your details</Typography>
            <Typography fontFamily="Antic">{checkoutData.email}</Typography>
          </Grid>
          <Grid item xs={3} bgcolor="#fff">
            <Typography variant="h5">Billing address</Typography>
            <Typography fontFamily="Antic">
              {checkoutData.billingFirstName} {checkoutData.billingLastName}
              <br />
              {checkoutData.billingStreet} {checkoutData.billingNumber} <br />
              {checkoutData.billingZipcode} {checkoutData.billingCity} <br />
              {checkoutData.billingCountry}
            </Typography>
          </Grid>
          <Grid item xs={3} bgcolor="#fff">
            <Typography variant="h5">Recipient address</Typography>
            <Typography fontFamily="Antic">
              {checkoutData.recipientFirstName} {checkoutData.recipientLastName}
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
      <Box bgcolor={theme.palette.tertiary.main}>
        <Typography variant="h4">Payment</Typography>
      </Box>
    </Box>
  );
};

export default CheckoutOverview;
