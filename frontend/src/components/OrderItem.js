import { useState, useEffect } from 'react'
import { Typography, Button, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import SubscriptionService from '../services/SubscriptionService'
import AddressService from '../services/AddressService'

function OrderItem({ order }) {
  const [isSub, setIsSub] = useState(false);
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [streetNumber, setStreetNumber] = useState('');

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
    console.log(order.products)
    SubscriptionService.getSubscriptions().then(res => {
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
    AddressService.getAddress(order.recipientAddress).then(res => {
      setStreet(res.street)
      setZipCode(res.zipCode)
      setCity(res.city)
      setCountry(res.country)
      setStreetNumber(res.streetNumber)
    })

  }, []);

  


    
  return (
    <>
    
    <div>
    <Card sx={{backgroundColor: "#a7cda7"}}>
        <CardHeader       
          title= {`Recipient: ${order.recipientName}`}
            />
        <CardContent>
          <Typography variant="h6">Details:</Typography>
          <Typography variant="body1">Delivery Date: {order.deliveryDate.split('T')[0]}</Typography>
          <Typography variant="body1">Product: {order.products.cardTitle}</Typography>
          <Typography variant="body1">Price: {order.products.cardPrice+order.products.giftPrice}€</Typography>
          <Typography variant="body1">Delivery Address: </Typography>
          <Typography variant="body1">{street} {streetNumber}</Typography>
          <Typography variant="body1">{zipCode} {city} </Typography>
          <Typography variant="body1">{country}</Typography>         
        </CardContent>
        <CardActions disableSpacing>
        {isSub ?   
            (<Button  color="secondary" variant="contained" disabled>Already Subscribed!</Button>):
            (<Button onClick={() => subscribe(order._id)} color="secondary" variant="contained">Set as Subscription</Button>)}
        </CardActions>
      </Card>    
   </div> 
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default OrderItem