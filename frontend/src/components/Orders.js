import { useState, useEffect } from 'react'
import OrderService from '../services/OrderService'
import OrderItem from './OrderItem'
import { Box, Grid, Typography } from '@mui/material'




const Orders = () => {

  const [orders, setOrders] = useState([]);

useEffect(() => {
  OrderService.getOrders().then(res => {
      setOrders(res);
  })
}, []); 

  return (
    <>
    <Typography variant="h3" sx={{ pt: "10px", pb: "20px"  }}>My Orders</Typography>
    
      <Box>
        
        {orders.length > 0 ? (
          <div>
            <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid key={order._id} item xs={12} md = {6} lg={4} >
              <OrderItem  order={order}/>
              </Grid>))}
            
            </Grid>
          </div>
        ) : (<h3> You have no Orders </h3>)}

      </Box>

      </>


      
  )
}

export default Orders