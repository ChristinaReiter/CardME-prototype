import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Paper, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import { styled } from '@mui/material/styles';
import CardService from "../services/CardService";
import CardPlaceholder from "./../assets/images/happymothersday.jpg";
import { margin } from "@mui/system";
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

let images = new Map();
images.set('happymothersday', image01);
images.set('flowerywishes', image02);
images.set('pastellflowers', image03);
images.set('imoustacheyou', image04);
          
  return (
    <div>
      <Box sx={{ width: '100%', margin:'90px 30px 30px 30px'}}>
        <Typography variant="h4">All Cards:</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{margin:'20px 10px 10px 10px'}}>
          {products.map((product) => (
            <Grid item xs={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image={images.get(product.url)}
                  alt="Card-Preview"
                />
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