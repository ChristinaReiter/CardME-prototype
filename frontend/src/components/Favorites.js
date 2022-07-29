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
} from "@mui/material";
import FavoriteService from "../services/FavoriteService";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteButton from "./FavoriteButton";

const Favorites = ({ setSelectedTab, setImage }) => {
  const imageUrl = "http://localhost:3001/public/";
  const [favorites, setFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedTab(4);

    //get all favorites from backend
    AuthService.getMe().then(
      (result) => {
        if (result !== undefined) {
          setUserID(result._id);
          FavoriteService.getFavorites(result._id).then(
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

  //distinguish between gift favorites and card favorites
  const giftFavorites = favorites.filter((el) => {
    return el.foldername === "gifts";
  });

  const cardFavorites = favorites.filter((el) => {
    return el.foldername !== "gifts";
  });

  const addProductToCart = async (product) => {
    let result = await fetch(
      imageUrl + product.foldername + "/" + product.url,
      { method: "GET" }
    );
    result = await result.blob();
    setImage(result);

    navigate("/create/chosen/" + product._id + "/new");
  };

  //render favorites in profile
  return (
    <>
      <Box sx={{ margin: "30px 30px 30px 30px" }}>
        <Typography variant="h4">My Card Favorites:</Typography>
        <div>
          {/*display message if card favorites are empty*/}
          {cardFavorites.length > 0 ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ margin: "20px 10px 10px 10px" }}
            >
              {cardFavorites.map((product) => (
                <Grid
                  item
                  xs={3}
                  key={product._id}
                  style={{ marginLeft: "1%" }}
                >
                  <Card
                    key={product.title}
                    sx={{
                      width: 270,
                      height: 430,
                      bgcolor: "#F3F3F3",
                    }}
                  >
                    <FavoriteButton
                      productObject={product}
                      userID={userID}
                      favorites={favorites}
                      setFavorites={setFavorites}
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
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          style={styles.button}
                          onClick={() => {
                            navigate("/ViewProduct/card/" + product._id);
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
                          Write
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              style={{
                alignContent: "center",
                marginLeft: "1%",
                marginTop: "1%",
                fontSize: "24px",
              }}
            >
              No Card Favorites.
            </Typography>
          )}
        </div>
      </Box>
      <Box sx={{ margin: "100px 30px 30px 30px" }}>
        <Typography variant="h4">My Gift Favorites:</Typography>
        <div>
          {/*display message if gift favorites are empty*/}
          {giftFavorites.length > 0 ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ margin: "20px 10px 10px 10px" }}
            >
              {giftFavorites.map((product) => (
                <Grid
                  item
                  xs={3}
                  key={product._id}
                  style={{ marginLeft: "1%", marginBottom: "2%" }}
                >
                  <Card
                    sx={{
                      width: 300,
                      height: 430,
                      bgcolor: "#F3F3F3",
                    }}
                  >
                    <FavoriteButton
                      productObject={product}
                      userID={userID}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      singleProduct={false}
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          style={styles.button}
                          onClick={() => {
                            navigate(
                              "/ViewProduct/gift/favorites/" + product._id
                            );
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              style={{
                alignContent: "center",
                marginLeft: "1%",
                marginTop: "1%",
                fontSize: "24px",
              }}
            >
              No Gift Favorites.
            </Typography>
          )}
        </div>
        <ToastContainer />
      </Box>
    </>
  );
};

export default Favorites;
