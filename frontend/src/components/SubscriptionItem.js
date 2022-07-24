import React from 'react'
import { Typography, Button, IconButton, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SubscriptionService from '../services/SubscriptionService';

function SubscriptionItem({ subscription, allSubscriptions, changeSubscription }) {

    const deleteSubscription = (id) => {
     SubscriptionService.deleteSubscription({id}).then(
            () => {  
              //alert("Subscription deleted");
              console.log("Subscription deleted");
              const updated = allSubscriptions.filter(sub => sub._id !== id);
              changeSubscription(updated);
              
            }
          ).catch (err => {
            console.log(err)
          })
    }
   
  return (
    <>
    
    <div> 
    <Card sx={{backgroundColor: "#a7cda7"}}>
        <CardHeader
          action={
            <IconButton onClick={() => deleteSubscription(subscription._id)}>
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
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default SubscriptionItem