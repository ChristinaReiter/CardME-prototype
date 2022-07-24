import React from 'react'
import { Typography } from '@mui/material'

function OrderItem({ order }) {
  return (
    <>
    
    <div><Typography>{order.recipientName}</Typography>
    <Typography>{order.deliveryDate}</Typography>   
    <Typography>{order._id}</Typography>
   </div> 
   <p></p>
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default OrderItem