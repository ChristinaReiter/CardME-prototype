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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubscriptionService from "../services/SubscriptionService";
import PayPalService from "../services/PayPalService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubscriptionItem({
  subscription,
  allSubscriptions,
  changeSubscription,
}) {
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
            title={subscription._id}
          />
          <CardContent>
            <Typography variant="h6">Details:</Typography>
            <Typography variant="body1">{subscription.order}</Typography>
          </CardContent>
        </Card>

        {/* <Typography>{subscription._id}</Typography>
    <Button  onClick={() => deleteSubscription(subscription._id)} startIcon={<DeleteForeverIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Delete
        </Button>   */}
      </div>
      <p></p>
      <ToastContainer />  
    </> 
  );
}

export default SubscriptionItem;
