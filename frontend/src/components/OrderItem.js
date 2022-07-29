import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import SubscriptionService from "../services/SubscriptionService";
import AddressService from "../services/AddressService";

const OrderItem = ({ order }) => {
  const [isSub, setIsSub] = useState(false);
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [streetNumber, setStreetNumber] = useState("");

  useEffect(() => {
    //check if order has a subscription
    SubscriptionService.getSubscriptions()
      .then((res) => {
        const check = res.filter((sub) => sub.order == order._id);
        if (check.length > 0) {
          setIsSub(true);
        } else {
          setIsSub(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //get address of order
    AddressService.getAddress(order.recipientAddress)
      .then((res) => {
        setStreet(res.street);
        setZipCode(res.zipCode);
        setCity(res.city);
        setCountry(res.country);
        setStreetNumber(res.streetNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <Card sx={{ backgroundColor: "#a7cda7" }}>
          <CardHeader title={`Recipient: ${order.recipientName}`} />
          <CardContent>
            <Typography variant="h6">Details:</Typography>
            <Typography variant="body1">
              Delivery Date: {order.deliveryDate.split("T")[0]}
            </Typography>
            <Typography variant="body1">
              Card: {order.products.cardTitle}
            </Typography>
            <Typography variant="body1">Price: {order.total}€</Typography>
            <Typography variant="body1">Delivery Address: </Typography>
            <Typography variant="body1">
              {street} {streetNumber}
            </Typography>
            <Typography variant="body1">
              {zipCode} {city}{" "}
            </Typography>
            <Typography variant="body1">{country}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            {isSub ? (
              <Chip color="secondary" label="Already Subscribed!" />
            ) : (
              <Chip color="secondary" label="Not Subscribed" />
            )}
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default OrderItem;
