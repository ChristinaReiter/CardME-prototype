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

const CheckoutData = () => {
  const [checkoutData, setCheckoutData] = useState({});

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
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // For local state
    setCheckoutData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    CheckoutService.setData(checkoutData);
    console.log(id);
    navigate("/checkout-overview/" + id);
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
            <TextField
              type="email"
              placeholder="Email address"
              value={checkoutData.email || ""}
              name="email"
              onChange={handleChange}
            ></TextField>
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
              required
            ></TextField>
            <FormControlLabel
              control={<Checkbox />}
              label="Recurring delivery"
            />{" "}
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
