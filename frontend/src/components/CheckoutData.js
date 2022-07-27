import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Breadcrumbs,
} from "@mui/material";
import CheckoutService from "../services/CheckoutService";
import ShoppingCartService from "../services/ShoppingCartService";
import AuthService from "../services/AuthService";

const CheckoutData = () => {
  const [checkoutData, setCheckoutData] = useState({});
  const [firstShipmentDate, setFirstShipmentDate] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountError, setAccountError] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();
  const inputBoxPadding = "1em";

  const styles = {
    breadcrumbs: {
      textDecoration: "none",
      fontFamily: "Abril Fatface",
      color: "#000",
    },
  };

  useEffect(() => {
    let checkoutData = CheckoutService.getCheckoutData();
    if (checkoutData) {
      setCheckoutData(checkoutData);
    }

    ShoppingCartService.getItem(id).then((item) => {
      setCartItem(item);
    });

    // Set date for delivery date picker
    let date = new Date();
    date.setDate(date.getDate() + 3);
    setFirstShipmentDate(date.toISOString().split("T")[0]);

    AuthService.getMe().then((result) => {
      if (result) {
        setAccount(result);
        setCheckoutData((values) => ({ ...values, email: result.email }));
      }
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // For local state
    setCheckoutData((values) => ({ ...values, [name]: value }));
  };

  const handleToggle = (event) => {
    const value = event.target.checked;

    if(value && account === null){
      setAccountError(true)
    }else{
      setAccountError(false)
      setCheckoutData((values) => ({ ...values, accountPassword: null }))
    }

    setCheckoutData((values) => ({ ...values, recurrentDelivery: value }));
  };

  const handleAccountTry = () => {
    if(checkoutData.recurrentDelivery){
      AuthService.checkFree({email: checkoutData.email}).then(free => {
        if(free && checkoutData.accountPassword){
          setAccountError(false)
        }else{
          setAccountError(true)
        }
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!accountError){
      CheckoutService.setData(checkoutData);
      navigate("/checkout-overview/" + id);
    }
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
            <Typography fontFamily="Abril Fatface">
              Delivery Information
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" padding="3em">
        <form onSubmit={handleSubmit}>
          <Box padding={inputBoxPadding}>
            <Typography variant="h6">Contact details</Typography>
            {account === null ? (
              <TextField
                type="email"
                placeholder="Email address"
                value={checkoutData.email || ""}
                name="email"
                onChange={handleChange}
                onBlur={handleAccountTry}
                error={accountError}
                helperText={accountError && ("Account already taken, use a differnt one")}
              ></TextField>
            ) : (
              <Typography>{account.email}</Typography>
            )}
          </Box>
          <Box padding={inputBoxPadding}>
            <Typography variant="h6">Billing address</Typography>
            <TextField
              type="text"
              placeholder="First Name"
              value={checkoutData.billingFirstName || ""}
              name="billingFirstName"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="Last Name"
              value={checkoutData.billingLastName || ""}
              name="billingLastName"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="text"
              placeholder="Street"
              value={checkoutData.billingStreet || ""}
              name="billingStreet"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="Number"
              value={checkoutData.billingNumber || ""}
              name="billingNumber"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="number"
              placeholder="Zipcode"
              value={checkoutData.billingZipcode || ""}
              name="billingZipcode"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="City"
              value={checkoutData.billingCity || ""}
              name="billingCity"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="text"
              placeholder="Country"
              value={checkoutData.billingCountry || ""}
              name="billingCountry"
              onChange={handleChange}
              required
            ></TextField>
          </Box>
          <Box padding={inputBoxPadding}>
            <Typography variant="h6">Recipient address</Typography>
            <TextField
              type="text"
              placeholder="First Name"
              value={checkoutData.recipientFirstName || ""}
              name="recipientFirstName"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="Last Name"
              value={checkoutData.recipientLastName || ""}
              name="recipientLastName"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="text"
              placeholder="Street"
              value={checkoutData.recipientStreet || ""}
              name="recipientStreet"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="Number"
              value={checkoutData.recipientNumber || ""}
              name="recipientNumber"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="number"
              placeholder="Zipcode"
              value={checkoutData.recipientZipcode || ""}
              name="recipientZipcode"
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              placeholder="City"
              value={checkoutData.recipientCity || ""}
              name="recipientCity"
              onChange={handleChange}
              required
            ></TextField>
            <br />
            <TextField
              type="text"
              placeholder="Country"
              value={checkoutData.recipientCountry || ""}
              name="recipientCountry"
              onChange={handleChange}
              required
            ></TextField>
            <br />
          </Box>
          <Box padding={inputBoxPadding}>
            <Typography variant="h6">Delivery</Typography>
            <TextField
              type="date"
              placeholder="Delivery date"
              value={checkoutData.deliveryDate || ""}
              name="deliveryDate"
              onChange={handleChange}
              InputProps={{ inputProps: { min: firstShipmentDate } }}
              required
            ></TextField>
          </Box>
          <Box padding={inputBoxPadding}>
            <Typography variant="h5">
              Want to resend the card every year?
            </Typography>
            <Typography>
              Tick recurrent delivery{" "}
              {account === null && "and create an account"}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="recurrentDelivery"
                  onChange={handleToggle}
                  checked={checkoutData.recurrentDelivery || false}
                />
              }
              label="Recurring delivery"
            />{" "}
            <br />
            {account === null && (
              <TextField
                type="password"
                placeholder="Account password"
                value={checkoutData.accountPassword || ""}
                name="accountPassword"
                onChange={handleChange}
                onBlur={handleAccountTry}
                error={accountError}
              ></TextField>
            )}
          </Box>
          <Box display="flex" justifyContent="end">
            <Button variant="contained" color="secondary" type="submit">
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default CheckoutData;
