import { useState, useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material'

import { useNavigate } from 'react-router-dom';

function ShortCalendar() {  
    const navigate = useNavigate();

    const seeCalendar = () => {
        navigate('/profile/calendar');
    }


    
  return (
    <>
    
    <div>
        <Box>
        <Typography variant="h5">Current Month</Typography>
        <Typography>1</Typography>

        <Box justifyContent="flex-end">
        <Button  variant="contained" color="secondary"onClick={seeCalendar}>Create new Event</Button>
        </Box>
        </Box>
        
    
   </div> 
   </> 
  )
}

export default ShortCalendar