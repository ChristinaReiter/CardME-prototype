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
import FavoriteButton from "./FavoriteButton";

const Product = ({ products, gift, headerfilter, setChosenGift, setImage }) => {
  const { path, cardStyle, id, mode } = useParams();
  const imageUrl = "http://localhost:3001/public/";
  const [favorites, setFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getMe().then(
      (result) => {
        if (!result.status) {
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
    cardstyle: {
      width: 270,
      height: 430,
      background: "#F3F3F3",
    },
    giftstyle: {
      width: 300,
      height: 430,
      background: "#F3F3F3",
    },
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
    cardimage: {
      objectFit: "cover",
      width: 146.67,
      height: 220,
    },
    giftimage: {
      objectFit: "cover",
      width: 240,
      height: 220,
    },
  };

  const addProductToCart = async (product) => {
    if (gift) {
      setChosenGift(product);
      navigate(
        "/" +
          path +
          "/" +
          cardStyle +
          "/" +
          id +
          (mode !== undefined && mode !== "new" ? "/" + mode : "")
      );
    } else {
      let result = await fetch(
        imageUrl + product.foldername + "/" + product.url,
        { method: "GET" }
      );
      result = await result.blob();
      setImage(result);

      navigate("/create/chosen/" + product._id + "/new");
    }
  };

  return (
    <div>
      <Box sx={{ margin: "30px 30px 30px 30px" }}>
        {gift ? (
          <Typography variant="h4">All Gifts:</Typography>
        ) : (
          <Typography variant="h4">All Cards:</Typography>
        )}

        <div>
          {products.length > 0 ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 3 }}
              sx={{ margin: "20px 10px 10px 10px" }}
            >
              {products.map((product) => (
                <Grid
                  item
                  xs={gift ? 3 : 2}
                  key={product._id}
                  style={{ marginLeft: "5%", marginBottom: "2%" }}
                >
                  <Card style={gift ? styles.giftstyle : styles.cardstyle}>
                    <CardActions>
                      <FavoriteButton
                        productObject={product}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        userID={userID}
                        singleProduct={false}
                      ></FavoriteButton>
                    </CardActions>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        style={gift ? styles.giftimage : styles.cardimage}
                        component="img"
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
                      {gift ? (
                        <></>
                      ) : (
                        <Typography
                          fontFamily={"Antic"}
                          fontSize="16px"
                          textAlign={"center"}
                          component="div"
                        >
                          by {product.designer}
                        </Typography>
                      )}
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
                            if (gift) {
                              navigate(
                                "/ViewProduct/gift/" +
                                  product._id +
                                  "/" +
                                  path +
                                  "/" +
                                  cardStyle +
                                  "/" +
                                  id +
                                  (mode !== undefined && mode !== "new"
                                    ? "/" + mode
                                    : "")
                              );
                            } else {
                              if (headerfilter) {
                                navigate(
                                  "/ViewProduct/card/" +
                                    headerfilter +
                                    "/" +
                                    product._id
                                );
                              } else {
                                navigate("/ViewProduct/card/" + product._id);
                              }
                            }
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
                          {gift ? "Add" : "Write"}
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
              {gift ? "No Gifts Available." : "No Cards Available-"}
            </Typography>
          )}
        </div>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default Product;
