import { useState, useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material'

import { useNavigate } from 'react-router-dom';

function ShortFavoriteItem() {  
    const navigate = useNavigate();

    const seeFavorites = () => {
        navigate('/profile/favorites');
    }


    
  return (
    <>
    
    <div>
        <Box justify="flex-end">
        <Typography variant="h5">Recent Favorites</Typography>
        <Typography>1</Typography>

        <Box justifyContent="flex-end">
        <Button  variant="contained" color="secondary"onClick={seeFavorites}>View all Favorites</Button>
        </Box>
        </Box>
        
    
   </div> 
   </> 
  )
}

export default ShortFavoriteItem