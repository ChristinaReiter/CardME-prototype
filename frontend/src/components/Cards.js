import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Paper, Card, CardActions, CardContent, CardMedia, IconButton, InputBase, Input, InputAdornment} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import CardService from "../services/CardService";
import { margin, palette } from "@mui/system";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import image01 from '../assets/images/happymothersday.jpg'
import image02 from '../assets/images/flowerywishes.jpg'
import image03 from '../assets/images/flowerpastel.jpg'
import image04 from '../assets/images/imoustacheyou.png'




const Cards = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  

  useEffect(() => {
    CardService.getAllCards().then((result) => {
      setProducts(result);
    }, (error) => {
      console.log(error)
    });
  }, []);

  const styles = {
    button: {
      fontFamily: "Annie Use Your Telescope",
      fontSize: 18,
      marginRight: 20,
      marginLeft: 20,
      width: "92px",
    },
    favorites: {
      marginLeft:"auto",
    },
    image: {
      objectFit: "cover",
    }
  }

let images = new Map();
images.set('happymothersday', image01);
images.set('flowerywishes', image02);
images.set('pastellflowers', image03);
images.set('imoustacheyou', image04);

const productsCopy = JSON.parse(JSON.stringify(products));



//search bar design
const SearchBarStyle = {
  boxShadow: '1px 3px 9px rgba(0,0,0,0.75)',
  width: "500px",
  height: "40px"
}

//search bar logic
const searchInputHandler = (e) => {
  const value = e.target.value;

  {/*const filteredCards = [];
  for (var i = 0; i < products.length; i++) {
    if(products[i].title.toString().toLowerCase().includes(value.toString().toLowerCase())) {
      filteredCards.push(products[i]);
    }
  }*/}
  const filteredCards = products.filter((el) => {
    console.log(el);
    if (value === "") {
      return el;
    }
    else {
      return el.title.toString().toLowerCase().includes(value.toLowerCase());
    }
  })
  setProducts(filteredCards);
  {/*console.log(filteredCards);*/}
  
}
          
  return (
    <div>
      <Box sx={{margin: '90px 0px 0px 0px', display: 'flex', justifyContent: 'center'}}>
      <Input
          onChange={event => {setSearchTerm(event.target.value)}}
          placeholder="Search for…"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          style={SearchBarStyle}
        ></Input>
      </Box>
      <Box sx={{ margin:'30px 30px 30px 30px'}}>
        <Typography variant="h4">All Cards:</Typography>
        <Grid 
          container 
          rowSpacing={1} 
          columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
          sx={{margin:'20px 10px 10px 10px'}}>
          {products.filter((el) => {
            if (searchTerm == "") {
              return el;
            }
            else {
              return el.title.toString().toLowerCase().includes(searchTerm.toLowerCase()) || el.designer.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }
          }).map((product) => (
            <Grid item xs={3}>
              <Card sx={{
                width: 270,
                height: 430,
                bgcolor: "#F3F3F3",
              }}>
                <CardActions>
                  <IconButton aria-label="add to favorites" style={styles.favorites}>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
                <div style={{ display:'flex', justifyContent:'center', alignItems:"center"}}>
                  <CardMedia style={styles.image}
                    component="img"
                    sx={{width:146.67, height:220, objectFit:"cover"}}
                    image={images.get(product.url)}
                    alt="Card-Preview"
                  />
                </div>
                <CardContent>
                  <Typography fontFamily={'Antic'} fontSize="20px" fontWeight={"500"} textAlign="center" component="div">
                    {product.title}
                  </Typography>
                  <Typography fontFamily={'Antic'} fontSize='16px' textAlign={"center"} component="div">
                    by {product.designer}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <Button size="small" variant="contained" color="secondary" style={styles.button} href=".././ViewCard">View</Button>
                    <Button size="small" variant="contained" color="secondary" style={styles.button} href=".././Create">Write</Button>
                  </div>    
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Cards;