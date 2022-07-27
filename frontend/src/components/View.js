
import { Box, Grid, Paper, Typography, Stack } from '@mui/material'
import ShortOrder from './ShortOrder';
import ShortCalendar from './ShortCalendar';
import ShortFavoriteItem from './ShortFavoriteItem';


const styles = {
}


const View = () => {


  return (
    <>

    <Typography sx={{ pl: "25px", pt: "10px", pb: "20px"  }} variant="h3">Your Overview</Typography>
   

      <Grid container sx={{pl: "25px", pr:"25px"}} >
       <Grid item xs={6} sx={{pr:"30px"}} >
         <ShortCalendar/>
       </Grid>
       <Grid item xs={6} >
        <Stack spacing={4}>
          <ShortOrder/>
          <ShortFavoriteItem/>
        </Stack>
       </Grid>
     </Grid> 

   </>
  )
  
}

export default View