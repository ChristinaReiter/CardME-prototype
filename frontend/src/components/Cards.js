import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Paper, Card, CardActions, CardContent} from "@mui/material";
import { styled } from '@mui/material/styles';
import CardService from "../services/CardService";
import CardPlaceholder from "./../assets/images/card_placeholder.jpg";
import { margin } from "@mui/system";



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

          
  return (
    <div>
      <Box sx={{ width: '100%', margin:'90px 30px 30px 30px'}}>
        <Typography variant="h4">All Cards:</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{margin:'20px 10px 10px 10px'}}>
          {products.map((product, i) => (
            <Grid item xs={3}>
              <Item>
                <img 
                  alt = "Card-Preview"
                  source={CardPlaceholder}
                  width ="100%"
                  sx={{ display: "block", height: "auto" }}
                />
                <p key={product._id}>
                  <Typography variant="h5" gutterBottom="true">{product.title}</Typography>
                  <Typography variant="h10" gutterBottom="true">by {product.designer}</Typography>
                </p>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Cards;
