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
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import CardService from "../services/CardService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";


const Favorites = () => {
  const imageUrl = "http://localhost:3001/public/";
  const [favorites, setFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getMe().then(
      (result) => {
        if (result !== undefined) {
          setUserID(result._id);
          CardService.getFavorites(result._id).then(
            (res) => {
              setFavorites(res);
            },
            (err) => {
              console.log(err);
            }
          );
        }
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

  const giftFavorites = favorites.filter((el) => {
    return(el.foldername === "gifts")
  })

  const cardFavorites = favorites.filter((el) => {
    return(el.foldername !== "gifts")
  })

  const addProductToCart = async (product) => {
    //let index = await ShoppingCartService.addItem(product);
    navigate("/create/chosen/" + product._id);
  };

  function FavoriteButton(props) {
      return (
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            style={styles.favorites}
            sx={{ color: "#DC9292" }}
            onClick={() => {
              CardService.removeFavorite({ product: props.productObject }).then(
                () => {
                  const updated = favorites.filter((fav) => fav._id !== props.productObject._id);
                
                  setFavorites(updated);
                }
              );
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      );
  }



  return (
    <><Box sx={{ margin: "30px 30px 30px 30px" }}>
      <Typography variant="h4">My Card Favorites:</Typography>
      <div>
        {cardFavorites.length > 0 ? (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ margin: "20px 10px 10px 10px" }}
          >
            {cardFavorites.map((product) => (
              <Grid item xs={3} key={product._id} style={{marginLeft:"1%"}}>
                <Card
                  key = {product.title}
                  sx={{
                    width: 270,
                    height: 430,
                    bgcolor: "#F3F3F3",
                  }}
                >
                  <FavoriteButton
                    productObject={product}
                  ></FavoriteButton>
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
                      src={imageUrl + product.foldername + "/" + product.url}
                      alt="Card-Preview"
                      crossOrigin="anonymous" />
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
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={styles.button}
                        onClick={() => {
                          navigate("/ViewCard/" + product._id);
                        } }
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
                        } }
                      >
                        Write
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) :
          <Typography
            style={{
              alignContent: "center",
              marginLeft: "1%",
              marginTop: "1%",
              fontSize: "24px",
            }}
          >
            No Card Favorites.
          </Typography>}
      </div>
    </Box>
    <Box sx={{ margin: "100px 30px 30px 30px" }}>
        <Typography variant="h4">My Gift Favorites:</Typography>
        <div>
          {giftFavorites.length > 0 ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ margin: "20px 10px 10px 10px" }}
            >
              {giftFavorites.map((product) => (
                <Grid item xs={3} key={product._id} style={{marginLeft:"1%", marginBottom:"2%"}}>
                <Card
                  sx={{
                    width: 300,
                    height: 430,
                    bgcolor: "#F3F3F3",
                  }}
                >
                  <FavoriteButton productObject={product} res=""></FavoriteButton>
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
                      sx={{ width: 240, height: 220, objectFit: "cover" }}
                      src={imageUrl + product.foldername + "/" + product.url}
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
                  </CardContent>
                  <CardActions>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={styles.button}
                        onClick={() => {
                          navigate("/ViewGift/" + product._id);
                        }}
                        
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
                        Add
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
              ))}
            </Grid>
          ) :
            <Typography
              style={{
                alignContent: "center",
                marginLeft: "1%",
                marginTop: "1%",
                fontSize: "24px",
              }}
            >
              No Gift Favorites.
            </Typography>}
        </div>
      </Box></>     
  )
}

export default Favorites