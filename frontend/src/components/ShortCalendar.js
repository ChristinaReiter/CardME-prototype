import { useState, useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
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

        <section >
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        
      />
      </section>
     
        <Box justifyContent="flex-end">
        <Button  variant="contained" color="secondary"onClick={seeCalendar}>Create new Event</Button>
        </Box>
        </Box>
        
    
   </div> 
   </> 
  )
}

export default ShortCalendar