import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Paper, Card, CardActions, CardContent, CardMedia, IconButton, InputBase} from "@mui/material";
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

  useEffect(() => {
    CardService.getAllCards().then((result) => {
      setProducts(result);
    }, (error) => {
      console.log(error)
    });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#F3F3F3',
    elevation: 1,
    width: 237,
    height: 369,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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



//search bar design

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1.0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  boxShadow: '1px 3px 9px rgba(0,0,0,0.75)',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontSize:'24px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '85ch',
      '&:focus': {
        width: '85ch',
      },
    },
  },
}));


//search bar logic
{/*const [searchInputText, setSearchInput] = useState("");
let searchInputHandler = (e) => {
  console.log(e.target.value);
};*/}
const [Result, setResult] = useState(null);
const searchInputHandler = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  if(e.key === 'Enter') {
    console.log(value);
    const filteredCards= (
      products.map( (product) => {
        if(product.title.toString().toLowerCase().includes(value.toString().toLowerCase()))
          console.log(product.title);         
      })
     
    )
    const searchResult = products.filter((element) => element.title.includes(value))
    setResult(searchResult);
    console.log(filteredCards);
  }
  
}
          
  return (
    <div>
      <Box sx={{margin: '90px 0px 0px 0px', display: 'flex', justifyContent: 'center'}}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
              name= "searchInputText"
              onKeyDown = {searchInputHandler}
              placeholder="Search for…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </Box>
      <Box sx={{ margin:'30px 30px 30px 30px'}}>
        <Typography variant="h4">All Cards:</Typography>
        <Grid 
          products = {Result!==null?Result:products}
          container 
          rowSpacing={1} 
          columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
          sx={{margin:'20px 10px 10px 10px'}}>
          {products.map((product) => (
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


{/*<Item>
                <img 
                  alt = "Card-Preview"
                  source= {"../assets/images/" + product.url}
                  width ="100%"
                  sx={{ display: "block", height: "auto" }}
                />
                <p key={product._id}>
                  <Typography variant="h5" gutterBottom="true">{product.title}</Typography>
                  <Typography variant="h10" gutterBottom="true">by {product.designer}</Typography>
                </p>
</Item>*/}