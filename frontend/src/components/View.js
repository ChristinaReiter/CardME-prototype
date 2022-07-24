import React from 'react'
import AuthService from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material'



const View = () => {

  return (
   
    <Box sx={{ flexGrow: 1 }}>
     <Grid container>
       <Grid item xs={6} >
         <Paper>1</Paper>
       </Grid>
       <Grid item xs={6}>
         <Paper>2</Paper>
       </Grid>
       <Grid item >
         <Paper>3</Paper>
       </Grid>
     </Grid>
   </Box>
  )
}

export default View