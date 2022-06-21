import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import OrderService from "../services/OrderService";

const CheckoutData = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const inputBoxPadding = "1em";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/checkout-overview");
  };

  return (
    <Box display="flex" justifyContent="center" padding="3em">
      <form onSubmit={handleSubmit}>
        <Box padding={inputBoxPadding}>
          <Typography variant="h6">Contact details</Typography>
          <TextField
            type="email"
            placeholder="Email address"
            value={inputs.email || ""}
            name="email"
            onChange={handleChange}
          ></TextField>
        </Box>
        <Box padding={inputBoxPadding}>
          <Typography variant="h6">Billing address</Typography>
          <TextField
            type="text"
            placeholder="First Name"
            value={inputs.billingFirstName || ""}
            name="billingFirstName"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="Last Name"
            value={inputs.billingLastName || ""}
            name="billingLastName"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="text"
            placeholder="Street"
            value={inputs.billingStreet || ""}
            name="billingStreet"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="Number"
            value={inputs.billingNumber || ""}
            name="billingNumber"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="number"
            placeholder="Zipcode"
            value={inputs.billingZipcode || ""}
            name="billingZipcode"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="City"
            value={inputs.billingCity || ""}
            name="billingCity"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="text"
            placeholder="Country"
            value={inputs.billingCountry || ""}
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
            value={inputs.recipientFirstName || ""}
            name="recipientFirstName"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="Last Name"
            value={inputs.recipientLastName || ""}
            name="recipientLastName"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="text"
            placeholder="Street"
            value={inputs.recipientStreet || ""}
            name="recipientStreet"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="Number"
            value={inputs.recipientNumber || ""}
            name="recipientNumber"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="number"
            placeholder="Zipcode"
            value={inputs.recipientZipcode || ""}
            name="recipientZipcode"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            type="text"
            placeholder="City"
            value={inputs.recipientCity || ""}
            name="recipientCity"
            onChange={handleChange}
            required
          ></TextField>
          <br />
          <TextField
            type="text"
            placeholder="Country"
            value={inputs.recipientCountry || ""}
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
            value={inputs.deliveryDate || ""}
            name="deliveryDate"
            onChange={handleChange}
            required
          ></TextField>
          <FormControlLabel control={<Checkbox />} label="Recurring delivery" />{" "}
        </Box>
        <Box display="flex" justifyContent="end">
          <Button variant="contained" color="secondary" type="submit">
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CheckoutData;
