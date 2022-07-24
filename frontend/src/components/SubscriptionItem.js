import React from 'react'
import { Typography, Button } from '@mui/material'
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
    <Typography>{subscription._id}</Typography>
    <Button  onClick={() => deleteSubscription(subscription._id)} startIcon={<DeleteForeverIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Delete
        </Button>  
    
    
   </div> 
   <p></p>
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default SubscriptionItem