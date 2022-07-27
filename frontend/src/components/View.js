
import { Grid, Typography, Stack } from '@mui/material'
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
       <Grid key= "1" item xs={6} sx={{pr:"30px"}} >
         <ShortCalendar key = "6"/>
       </Grid>
       <Grid key = "2" item xs={6} >
        <Stack key = "3" spacing={4}>
          <ShortOrder key = "4"/>
          <ShortFavoriteItem key = "5"/>
        </Stack>
       </Grid>
     </Grid> 

   </>
  )
  
}

export default View