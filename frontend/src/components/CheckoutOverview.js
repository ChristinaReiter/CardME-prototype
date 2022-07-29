import { useTheme } from "@emotion/react";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import PayPalService from "../services/PayPalService";
import AuthService from "../services/AuthService";
import SubscriptionService from "../services/SubscriptionService";

const CheckoutOverview = () => {
  const [cartItem, setCartItem] = useState({});
  const [total, setTotal] = useState(0.01);
  const [checkoutData, setCheckoutData] = useState({});

  // Subscription ID from PayPal
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  // Starting date of subscription (first payment)
  const [startingDate, setStartingDate] = useState(null);

  // Error states
  const [paymentError, setPaymentError] = useState(false);
  const [orderError, setOrderError] = useState(false);

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
    // Set local state
    let checkoutData = CheckoutService.getCheckoutData();
    setCheckoutData(checkoutData);

    ShoppingCartService.getItem(id).then((item) => {
      setCartItem(item);
      setTotal(item.cardPrice + item.giftPrice);
    });
  }, []);

  useEffect(() => {
    // Setting total
    if (cartItem != null) {
      setTotal(cartItem.cardPrice + cartItem.giftPrice);
    }

    // If subscription wanted
    if (checkoutData.recurrentDelivery) {
      // Starting date
      let deliveryDate = Date.parse(checkoutData.deliveryDate);
      setStartingDate(new Date(deliveryDate).toISOString());

      // Create subscription plan with indiviual price
      PayPalService.createSubscriptionPlan(total).then((result) => {
        if (result) {
          setSubscriptionPlan(result.id);
        }
      });
    }
  }, [cartItem]);

  const handleExit = (orderId) => {
    // Remove persistent data and redirect
    CheckoutService.removeData();
    ShoppingCartService.removeItem(id);
    navigate("/successful-order/" + orderId);
  };

  // If just regular order
  const handleSuccessfulCheckout = async () => {
    const response = await OrderService.createOrder(checkoutData, cartItem);
    if (response.response === "success") {
      handleExit(response.order._id);
    } else {
      setOrderError(true);
    }
  };

  // If subscription wanted
  const handleSuccessfulSubscription = async (subscriptionId) => {
    const order = await OrderService.createOrder(checkoutData, cartItem);

    const currentUser = await AuthService.getLog();
    let account = null;
    // If no user logged in, no account existent (checked before)
    if (currentUser === null) {
      // Create new account
      account = await AuthService.register({
        name:
          checkoutData.billingFirstName + " " + checkoutData.billingLastName,
        email: checkoutData.email,
        password: checkoutData.accountPassword,
      });
    } else {
      // User logged in
      account = currentUser;
    }

    if (
      order.response === "success" &&
      order.order._id &&
      account &&
      account._id
    ) {
      const subscription = await SubscriptionService.setSubscription({
        order: order.order._id,
        account: account._id,
        paypalSubscription: subscriptionId,
      });

      if (subscription !== null) {
        handleExit(order.order._id);
      } else {
        setOrderError(true);
      }
    } else {
      console.log("Subscription error");
      setOrderError(true);
    }
  };

  // Error on payment
  const handleFailedCheckout = (error) => {
    console.log(error);
    setPaymentError(true);
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
            <NavLink
              style={styles.breadcrumbs}
              to={
                "/create/" +
                (cartItem && cartItem.cardTitle === "Own Card"
                  ? "own/"
                  : "chosen/") +
                id +
                "/edit"
              }
            >
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
              <Box
                width="180px"
                overflow="hidden"
                height="230px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="rgba(0, 0, 0, 0.1) 2px 2px 30px, rgba(0, 0, 0, 0.1) -2px -2px 30px"
              >
                {cartItem.cardImage && (
                  <img
                    src={URL.createObjectURL(cartItem.cardImage)}
                    width="180px"
                    style={cartItem.cardImageFilters}
                    alt="Card preview"
                  ></img>
                )}
              </Box>
              <Typography fontFamily="Antic" paddingTop="2em">
                Delivery on {checkoutData.deliveryDate}
              </Typography>
              <Typography fontFamily="Antic">
                Recurring delivery:{" "}
                {checkoutData.recurrentDelivery ? "yearly" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">
                Inside Text (displayed here without styling):
              </Typography>
              <Typography fontFamily="Antic" whiteSpace="pre-wrap">{cartItem.cardText}</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              alignItems="flex-end"
              display="flex"
              justifyContent="flex-end"
            >
              <Typography fontFamily="Antic" variant="h4">
                {cartItem.cardPrice}€
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate(
                    "/create/" +
                      (cartItem && cartItem.cardTitle === "Own Card"
                        ? "own/"
                        : "chosen/") +
                      id +
                      "/edit"
                  );
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
              {cartItem.giftId !== null && (
                <Typography fontFamily="Antic" variant="h6">
                  Additional gift: {cartItem.giftPrice}€
                </Typography>
              )}
              <Typography fontFamily="Antic" variant="h6">
                Free delivery: 0€ <br />
                incl. VAT:{" "}
                {(total * 0.16).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                €
              </Typography>
              <Divider></Divider>
              <Typography fontFamily="Antic" variant="h3">
                {total}€
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
                  navigate("/checkout-data/" + id);
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Your details</Typography>
              <Typography color="#808080" fontSize="14px">
                For sending the order confirmation and to notify about the
                delivery.
              </Typography>
              <Typography fontFamily="Antic" paddingTop="1em">
                {checkoutData.email}
              </Typography>
            </Grid>
            <Grid item xs={3} style={styles.detailBox}>
              <Typography variant="h5">Billing address</Typography>
              <Typography color="#808080" fontSize="14px">
                For sending the bill
              </Typography>
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
              <Typography color="#808080" fontSize="14px">
                Who are you sending to?
              </Typography>
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
            {/* If regular order */}
            {!checkoutData.recurrentDelivery && total && (
              <PayPalScriptProvider
                options={{
                  "client-id": PayPalService.clientId,
                  currency: "EUR",
                  components: "buttons",
                }}
              >
                {/* Regular paypal button */}
                <PayPalButtons
                  forceReRender={[checkoutData]}
                  style={{ layout: "horizontal" }}
                  fundingSource="paypal"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: total,
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
                    // Payment successful
                    return actions.order.capture().then((details) => {
                      handleSuccessfulCheckout();
                    });
                  }}
                  onError={(error) => {
                    // Payment failed
                    handleFailedCheckout(error);
                  }}
                />
                {/* (Credit) card button */}
                <PayPalButtons
                  forceReRender={[checkoutData]}
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
                            value: total,
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
                    // Payment successful
                    return actions.order.capture().then((details) => {
                      handleSuccessfulCheckout();
                    });
                  }}
                  onError={(error) => {
                    // Payment failed
                    handleFailedCheckout(error);
                  }}
                />
              </PayPalScriptProvider>
            )}
            {/* If subscription wanted */}
            {checkoutData.recurrentDelivery && (
              <PayPalScriptProvider
                options={{
                  "client-id": PayPalService.clientId,
                  currency: "EUR",
                  components: "buttons",
                  vault: true,
                }}
              >
                {/* Regular paypal button */}
                <PayPalButtons
                  forceReRender={[subscriptionPlan, checkoutData]}
                  style={{ layout: "horizontal" }}
                  fundingSource="paypal"
                  createSubscription={(data, actions) => {
                    return actions.subscription.create({
                      plan_id: subscriptionPlan,
                      start_time: startingDate,
                      subscriber: {
                        email_address: checkoutData.email,
                        name: {
                          given_name: checkoutData.billingFirstName,
                          surname: checkoutData.billingLastName,
                        },
                        shipping_address: {
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
                      application_context: {
                        brand_name: "CardMe",
                        shipping_preference: "NO_SHIPPING",
                      },
                    });
                  }}
                  onApprove={(data, actions) => {
                    // Subscription payment successful
                    handleSuccessfulSubscription(data.subscriptionID);
                  }}
                  onError={(error) => {
                    // Subscription payment failure
                    handleFailedCheckout(error);
                  }}
                ></PayPalButtons>
              </PayPalScriptProvider>
            )}
            <Typography>
              By clicking on{" "}
              {checkoutData.recurrentDelivery
                ? "the button"
                : "one of the buttons"}{" "}
              above you agree to the Privacy Regulations and Terms & Conditions
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Popup for payment error */}
      <Dialog
        open={paymentError}
        onClose={() => setPaymentError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Payment Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There was an error during payment, please refresh the site and try
            again
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Popup for order error */}
      <Dialog
        open={orderError}
        onClose={() => setOrderError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Order Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There was an error creating the order, please try again
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutOverview;
