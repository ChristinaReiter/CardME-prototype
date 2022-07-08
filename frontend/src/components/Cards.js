import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import CardService from "../services/CardService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ShoppingCartService from "../services/ShoppingCartService";
import FilterHeader from "./FilterHeader";

const Cards = (colorFilter) => {
  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    CardService.getAllCards().then(
      (result) => {
        setProducts(result);
      },
      (error) => {
        console.log(error);
      }
    );
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
      marginLeft: "auto",
    },
    image: {
      objectFit: "cover",
    },
  };

  //search bar design
  const SearchBarStyle = {
    boxShadow: "1px 3px 9px rgba(0,0,0,0.75)",
    width: "500px",
    height: "40px",
  };



  const addProductToCart = (product) => {
    ShoppingCartService.addItem(product);
    navigate("/create");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <FilterHeader />
      </Box>
      <Box
        sx={{
          margin: "200px 0px 0px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Search for…"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          style={SearchBarStyle}
        ></Input>
      </Box>
      <Box sx={{ margin: "30px 30px 30px 30px" }}>
        <Typography variant="h4">All Cards:</Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: "20px 10px 10px 10px" }}
        >
          {products
            .filter((el) => {
              var filterArray = [];
              Object.keys(colorFilter).map((key) => {
                  if (colorFilter[key]) {
                    filterArray.push(key);
                  }
              })
              console.log(colorFilter);
              if (searchTerm.length === 0 && filterArray.length === 0) {
                return el;
                
              } 
              else if(searchTerm.length === 0 && filterArray.length !== 0) {
                return(
                  filterArray
                  .every(colors => 
                    {return el.color.includes(colors)}
                  )
                )
              }
              else if(searchTerm.length !== 0 && filterArray.length === 0) {
                return (
                  el.title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()) ||
                  el.designer
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()))
              }
              else {
                return (
                  (el.title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()) ||
                  el.designer
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase())) &&
                  filterArray
                  .every(colors => 
                    {return el.color.includes(colors)}
                    )
                );
              }
            })
            .map((product) => (
              <Grid item xs={3} key={product._id}>
                <Card
                  sx={{
                    width: 270,
                    height: 430,
                    bgcolor: "#F3F3F3",
                  }}
                >
                  <CardActions>
                    <IconButton
                      aria-label="add to favorites"
                      style={styles.favorites}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      style={styles.image}
                      component="img"
                      sx={{ width: 146.67, height: 220, objectFit: "cover" }}
                      src={imageUrl + product.url}
                      alt="Card-Preview"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <CardContent>
                    <Typography
                      fontFamily={"Antic"}
                      fontSize="20px"
                      fontWeight={"500"}
                      textAlign="center"
                      component="div"
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      fontFamily={"Antic"}
                      fontSize="16px"
                      textAlign={"center"}
                      component="div"
                    >
                      by {product.designer}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={styles.button}
                        href=".././ViewCard"
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={styles.button}
                        onClick={() => {
                          addProductToCart(product);
                        }}
                      >
                        Write
                      </Button>
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
