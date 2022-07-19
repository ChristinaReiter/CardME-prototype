import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CheckoutService from "../services/CheckoutService";
import ShoppingCartService from "../services/ShoppingCartService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import OrderService from "../services/OrderService";

const CheckoutOverview = ({images}) => {
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

  const handleSuccessfulCheckout = async () => {
    const response = await OrderService.createOrder(checkoutData, cartItem)
    if (response.response == "success"){
      CheckoutService.removeData()
      ShoppingCartService.removeItem(id)
      navigate("/successful-order/" + response.order._id);

    }
  };

  const handleFailedCheckout = () => {
    console.log("Failed payment");
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
            <NavLink style={styles.breadcrumbs} to={"/create/" + id}>
              Edit card
            </NavLink>
            <NavLink style={styles.breadcrumbs} to={"/checkout-data/" + id}>
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
              {cartItem.cardTitle !== "Own Card" &&
              <img
                src={imageUrl + cartItem.cardImg}
                crossOrigin="anonymous"
                width="65%"
              ></img>
              }
              {cartItem.cardTitle === "Own Card" &&
              <img
                src={URL.createObjectURL(images[0])}
                crossOrigin="anonymous"
                width="65%"
              ></img>
              }
              <Typography fontFamily="Antic">
                Delivery on {checkoutData.deliveryDate}
              </Typography>
              <Typography fontFamily="Antic">Recurring delivery: {checkoutData.recurrentDelivery ? "yearly" : "no"}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">Text:</Typography>
              <Typography fontFamily="Antic">{cartItem.text}</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              alignItems="flex-end"
              display="flex"
              justifyContent="flex-end"
            >
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
              <Typography fontFamily="Antic" variant="h3">
                {cartItem.cardPrice + cartItem.giftPrice},-
              </Typography>
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
            <Grid item xs={11} paddingBottom="2em">
              <Typography variant="h4">Delivery details</Typography>
            </Grid>
            <Grid item xs={1} paddingBottom="2em">
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
              <Typography color="#808080" fontSize="14px">For sending the order confirmation and to notify about the delivery.</Typography>
              <Typography fontFamily="Antic" paddingTop="1em">{checkoutData.email}</Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Billing address</Typography>
              <Typography color="#808080" fontSize="14px">For sending the bill</Typography>
              <Typography fontFamily="Antic" paddingTop="1em">
                {checkoutData.billingFirstName} {checkoutData.billingLastName}
                <br />
                {checkoutData.billingStreet} {checkoutData.billingNumber} <br />
                {checkoutData.billingZipcode} {checkoutData.billingCity} <br />
                {checkoutData.billingCountry}
              </Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Recipient address</Typography>
              <Typography color="#808080" fontSize="14px">Who are you sending to?</Typography>
              <Typography fontFamily="Antic" paddingTop="1em">
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
        <Box
          bgcolor={theme.palette.tertiary.main}
          marginTop="4em"
          padding="4em"
        >
          <Typography variant="h4">Payment</Typography>
          <Box textAlign="center" padding="2em">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AWhQbQw5irWMzQRjp7gn4yYP4V7qomnXWIE4krmMbZi3M5NwPz-cnAUVk9-7uvBkmOgnCPqTgEfROIDP",
                currency: "EUR",
                components: "buttons",
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                fundingSource="paypal"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (cartItem.cardPrice + cartItem.giftPrice),
                        },
                        shipping: {
                          name: {
                            full_name:
                              checkoutData.recipientFirstName +
                              " " +
                              checkoutData.recipientLastName,
                          },
                          address: {
                            address_line_1:
                              checkoutData.recipientStreet +
                              " " +
                              checkoutData.recipientNumber,
                            postal_code: checkoutData.recipientZipcode,
                            admin_area_2: checkoutData.recipientCity,
                            country_code: "DE",
                          },
                        },
                      },
                    ],
                    application_context: {
                      brand_name: "CardMe",
                      shipping_preference: "SET_PROVIDED_ADDRESS",
                    },
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleSuccessfulCheckout();
                  });
                }}
              />
              <PayPalButtons
                style={{ layout: "horizontal" }}
                fundingSource="card"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    payer: {
                      email_address: checkoutData.email,
                      name: {
                        given_name: checkoutData.billingFirstName,
                        surname: checkoutData.billingLastName,
                      },
                      address: {
                        postal_code: checkoutData.billingZipcode,
                        country_code: "DE",
                      },
                    },
                    purchase_units: [
                      {
                        amount: {
                          value: (cartItem.cardPrice + cartItem.giftPrice),
                        },
                      },
                    ],
                    application_context: {
                      brand_name: "CardMe",
                      shipping_preference: "NO_SHIPPING",
                    },
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleSuccessfulCheckout();
                  });
                }}
              />
            </PayPalScriptProvider>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CheckoutOverview;
