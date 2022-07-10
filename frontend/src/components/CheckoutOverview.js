import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Breadcrumbs, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CheckoutService from "../services/CheckoutService";
import ShoppingCartService from "../services/ShoppingCartService";

const CheckoutOverview = () => {
  const imageUrl = "http://localhost:3001/public/";
  const [cartItem, setCartItem] = useState({});
  const [checkoutData, setCheckoutData] = useState({});
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
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

  useEffect(() => {
    let checkoutData = CheckoutService.getCheckoutData();
    setCheckoutData(checkoutData);

    let cartItem = ShoppingCartService.getItem(id);
    setCartItem(cartItem);
  }, []);

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
        <Box
          bgcolor={theme.palette.tertiary.main}
          padding="4em"
          fontFamily="Antic"
        >
          <Grid container>
            <Grid item xs={3}>
              <img
                src={imageUrl + cartItem.cardImg}
                crossOrigin="anonymous"
                width="65%"
              ></img>
              <Typography fontFamily="Antic">
                Delivery on {checkoutData.deliveryDate}
              </Typography>
              <Typography fontFamily="Antic">Recurring delivery: -</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">Text:</Typography>
              <Typography fontFamily="Antic">{cartItem.text}</Typography>
            </Grid>
            <Grid item xs={3} alignItems="flex-end" display="flex" justifyContent="flex-end">
              <Typography fontFamily="Antic" variant="h4">
                {cartItem.cardPrice},-
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate("/create/" + id);
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box padding="2em 4em">
          <Grid container>
            <Grid item xs={8}></Grid>
            <Grid item xs={3} textAlign="right">
              <Typography fontFamily="Antic" variant="h6">
                Free delivery: 0,- <br />
                incl. VAT: {(cartItem.cardPrice + cartItem.giftPrice) * 0.16},-
              </Typography>
              <Divider></Divider>
              <Typography fontFamily="Antic" variant="h3">{cartItem.cardPrice + cartItem.giftPrice},-</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
        <Box
          bgcolor={theme.palette.tertiary.main}
          padding="4em"
          marginTop="4em"
        >
          <Grid container justifyContent="center">
            <Grid item xs={11}>
              <Typography variant="h4">Delivery details</Typography>
            </Grid>
            <Grid item xs={1}>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate("/create/" + id);
                }}
              >
                Edit
              </Button>
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
