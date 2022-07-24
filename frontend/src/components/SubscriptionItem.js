import React from 'react'
import { Typography } from '@mui/material'

function SubscriptionItem({ subscription }) {
   
  return (
    <>
    
    <div> 
    <Typography>{subscription._id}</Typography>
    
    
   </div> 
   <p></p>
   </> // still missing: maybe Nr. instead of ID, status, total
  )
}

export default SubscriptionItem