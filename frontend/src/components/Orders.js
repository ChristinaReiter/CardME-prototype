import { useState, useEffect } from 'react'
import OrderService from '../services/OrderService'
import OrderItem from './OrderItem'
import { Box, Typography } from '@mui/material'




const Orders = () => {

  const [orders, setOrders] = useState([]);

useEffect(() => {
  OrderService.getOrders().then(res => {
      setOrders(res);
  })
}, []); 

  return (
    
      <Box>
        {orders.length > 0 ? (
          <div className ="contacts">
            {orders.map((order) => (
              <OrderItem key={order._id} order={order}/>
            ))}
          </div>
        ) : (<h3> You have no Orders </h3>)}

      </Box>


      
  )
}

export default Orders