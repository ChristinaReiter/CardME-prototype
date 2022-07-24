import { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import SubscriptionService from '../services/SubscriptionService'

function OrderItem({ order }) {
  const [isSub, setIsSub] = useState(false);

  const subscribe = (id) => {
    SubscriptionService.setSubscription({id}).then(res => {
      console.log(res)
      setIsSub(true)
    }).catch(err => {
      console.log(err)
    }
    )

  }

  useEffect(() => {
    SubscriptionService.getSubscriptions().then(res => {
      console.log(res)
      const check = res.filter(sub => sub.order == order._id);      
      if (check.length > 0){
        setIsSub(true)
      }else {
        setIsSub(false)
      }
    }).catch(err => {
      console.log(err)
    }
    )

  }, []);


    
  return (
    <>
    
    <div><Typography>{order.recipientName}</Typography>
    <Typography>{order.deliveryDate}</Typography>   
    <Typography>{order._id}</Typography>
    <Typography>{order.user.name}</Typography>
    {isSub ?   
            (<Button  color="secondary" variant="contained" disabled>Already Subscribed!</Button>):
            (<Button onClick={() => subscribe(order._id)} color="secondary" variant="contained">Set as Subscription</Button>)}
    
   </div> 
   <p></p>
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default OrderItem