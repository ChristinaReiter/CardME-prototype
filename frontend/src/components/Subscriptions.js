import { useState, useEffect } from 'react'
import SubscriptionService from '../services/SubscriptionService'
import SubscriptionItem from './SubscriptionItem'
import { Box } from '@mui/material'




const Subscriptions = () => {

  const [subscriptions, setSubscriptions] = useState([]);

useEffect(() => {
  SubscriptionService.getSubscriptions().then(res => {
    console.log(res)
      setSubscriptions(res);
  })
}, []); 

  return (
    
      <Box>
        {subscriptions.length > 0 ? (
          <div className ="contacts">
            {subscriptions.map((subscription) => (
              <SubscriptionItem key={subscription._id} subscription={subscription} changeSubscription = {setSubscriptions} allSubscriptions = {subscriptions}/>
            ))}
          </div>
        ) : (<h3> You have no Subscriptions </h3>)}

      </Box>



      
  )
}

export default Subscriptions