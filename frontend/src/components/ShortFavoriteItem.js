import { useState, useEffect } from 'react'
import { Box,Typography, Button, Card, CardContent, CardMedia, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper } from '@mui/material'


import { useNavigate } from 'react-router-dom';
import CardService from '../services/CardService';
import AuthService from '../services/AuthService';

function ShortFavoriteItem() {  
  const imageUrl = "http://localhost:3001/public/";
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [shortFavoriteLength, setShortFavoriteLength] = useState(0);


    const seeFavorites = () => {
        navigate('/profile/favorites');
    }

    useEffect(() => {
      /* AuthService.getMe().then(
        (result) => {
          if (result !== undefined) { */
            CardService.getFavorites(/* result._id */).then(
              (res) => {
                setFavorites(res);
                if(res.length < 4) {
                  setShortFavoriteLength(res.length);
                }
                else {
                  setShortFavoriteLength(4);
                }
                console.log(res)
              }/* ,
              (err) => {
                console.log(err);
              } */
             
            );
       /*    }
        },
        (error) => {
          console.log(error);
        } 
      );*/
    }, []);

    
  return (
    <>
    
    <div>
        <Box justify="flex-end">
          <Typography variant="h5">Recent Favorites</Typography>
          <div style={{background: "#D9D9D9", marginBottom:"20px", width:"100%", height:"200px", display:"flex", flexOrientation:"column", justifyContent: "center"}}>
            {favorites.slice(favorites.length - shortFavoriteLength, favorites.length).map((fave) => {
              return(
              <Button key = {fave._id} style={{display:"flex", flexDirection:"column", color:"black"}}
                onClick={() => {
                if(fave.foldername ==="gifts") {
                    navigate("/ViewProduct/gift/" + fave._id);
                }
                else {
                      navigate("/ViewProduct/card/" + fave._id);
                }
              }}>
                <div>
                <img
                  style={{objectFit: "cover",
                  width: 80, 
                  height: 120,
                  paddingLeft:"30px", paddingTop:"20px", paddingRight:"30px"}}
                  src={imageUrl + fave.foldername + "/" + fave.url}
                  alt="Card-Preview"
                  crossOrigin="anonymous"
                />
                </div>
                <div>
                  <Typography
                      fontFamily={"Annie Use Your Telescope"}
                      fontSize="15px"
                      fontWeight={"500"}
                      textAlign="center"
                      component="div"
                  >
                      {fave.title}
                  </Typography>
                </div>
              </Button>
              )
            })}
          </div>
        <Box justifyContent="flex-end">
        <Button  variant="contained" color="secondary"onClick={seeFavorites}>View all Favorites</Button>
        </Box>
        </Box>
        
    
   </div> 
   </> 
  )
}

export default ShortFavoriteItem