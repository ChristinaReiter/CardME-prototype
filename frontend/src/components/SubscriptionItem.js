import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubscriptionService from "../services/SubscriptionService";
import PayPalService from "../services/PayPalService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderService from "../services/OrderService";

function SubscriptionItem({
  subscription,
  allSubscriptions,
  changeSubscription,
}) {
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const[card, setCard] = useState("");

  useEffect(() => {
    //get order of subscription for additional information
    OrderService.getOrders().then(res => {
     

       const order = res.filter((order) => order._id === subscription.order);
       setName(order[0].recipientName);
        setPrice(order[0].total);
        setCard(order[0].products.cardTitle);
         
    
    })}, []);


  //delete subscription from database and paypal
  const deleteSubscription = async (id, paypalId) => {
    await PayPalService.cancelSubscription(paypalId);
    await SubscriptionService.deleteSubscription({ id });
    toast("Subscription deleted");
    const updated = allSubscriptions.filter((sub) => sub._id !== id);
    changeSubscription(updated);
  };

  return (
    <>
      <div>
        <Card sx={{ backgroundColor: "#a7cda7" }}>
          <CardHeader
            action={
              <IconButton
                onClick={() =>
                  deleteSubscription(
                    subscription._id,
                    subscription.paypalSubscription
                  )
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            }
            title={`Subscription for: ${name}` }
          />
          <CardContent>
            <Typography variant="h6">Details:</Typography>
             <Typography variant="body1">Card: {card}</Typography> 
            <Typography variant="body1">Price: {price}€</Typography>  
            <Typography variant="body1">Subscription ID: {subscription._id}</Typography> 
            <Typography variant="body1">Order ID: {subscription.order}</Typography>
          </CardContent>
        </Card>
      </div>
      <p></p>
      <ToastContainer />  
    </> 
  );
}

export default SubscriptionItem;
