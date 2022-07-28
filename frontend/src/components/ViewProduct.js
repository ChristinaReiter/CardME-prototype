import {
  Box,
  Button,
  IconButton,
  Card,
  CardMedia,
  Typography,
  Icon,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardService from "../services/CardService";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import GiftService from "../services/GiftService";
import FavoriteButton from "./FavoriteButton";

const ViewCard = ({ setImage }) => {
  const { producttype, productid, headerfilter } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [diffColorCards, setdiffColorCards] = useState([]);
  const imageUrl = "http://localhost:3001/public/";
  const [currentImage, setCurrentImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [userID, setUserID] = useState();

  useEffect(() => {
    if (producttype === "card") {
      CardService.getSingleCard(productid).then(
        (result) => {
          setSingleProduct(result);
          CardService.getImages(result.foldername).then((res) => {
            setdiffColorCards(res);
          });
          setCurrentImage(result.url);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (producttype === "gift") {
      GiftService.getSingleGift(productid).then(
        (result) => {
          setSingleProduct(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    AuthService.getMe().then(
      (result) => {
        setUserID(result._id);
        CardService.getFavorites(result._id).then((res) => {
          setFavorites(res);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const styles = {
    backBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 70,
      alignItems: "center",
      background: "#A7CDA7",
      "&:hover": {
        background: "#FF69B4",
      },
      boxShadow:
        "0px 2px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
      top: "60px",
      zIndex: "1",
    },
    button: {
      fontFamily: "Annie Use Your Telescope",
      fontSize: 18,
      marginRight: 20,
      marginLeft: 20,
      width: "92px",
    },
    cardimage: {
      backgroundColor: "#F3F3F3",
      width: "400px",
      height: "560px",
      objectFit: "contain",
      marginLeft: "7%",
    },
    giftimage: {
      backgroundColor: "#F3F3F3",
      width: "450px",
      height: "500px",
      objectFit: "contain",
      marginLeft: "7%",
    },
    favorites: {
      marginLeft: "auto",
    },
  };

  const addProductToCart = async (product) => {
    if (producttype === "gift") {
      //setChosenGift(product);
      /*navigate(
        "/" +
          path +
          "/" +
          cardStyle +
          "/" +
          id +
          (mode !== undefined && mode !== "new" ? "/" + mode : "")
      );*/
    } else {
      let result = await fetch(
        imageUrl + singleProduct.foldername + "/" + currentImage,
        { method: "GET" }
      );
      result = await result.blob();
      setImage(result);

      navigate("/create/chosen/" + product._id + "/new");
    }
  };

  const changeDisplayImage = (displayImage) => {
    setCurrentImage(displayImage);
  };

  function SwitchFavoriteButton() {
    const found = favorites.find(
      (element) => element._id === singleProduct._id
    );
    if (found) {
      return (
        <IconButton
          onClick={() => {
            CardService.removeFavorite({ product: singleProduct }).then(() => {
              toast("Favorite removed");
              const updated = favorites.filter(
                (fav) => fav._id !== (singleProduct ? singleProduct._id : "")
              );
              setFavorites(updated);
            });
          }}
        >
          <FavoriteIcon style={{ fontSize: "90px", color: "#DC9292" }} />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={() => {
            if (userID === undefined) {
              toast("not logged in");
            } else {
              CardService.setFavorites({ product: singleProduct }).then(() => {
                toast("Favorite added");
                setFavorites([...favorites, singleProduct]);
              });
            }
          }}
        >
          <FavoriteIcon style={{ fontSize: "90px", color: "grey" }} />
        </IconButton>
      );
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <Box position="fixed" style={styles.backBar}>
          <Button
            variant="contained"
            disableElevation
            style={{
              height: "80%",
              width: "10%",
              marginLeft: "2%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              if (producttype === "card") {
                if (headerfilter) {
                  navigate("/cards/" + headerfilter);
                } else {
                  navigate("/cards"); //logic to save previous state
                }
              }
              if (producttype === "gift") {
                navigate("/gifts");
              }
            }}
          >
            <ArrowBackIosNewOutlinedIcon style={{ paddingLeft: "2%" }} />
            <Typography
              style={{
                paddingLeft: "1%",
                fontSize: "20px",
                fontFamily: "Abril Fatface",
              }}
            >
              Back
            </Typography>
          </Button>
        </Box>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "180px",
        }}
      >
        <div
          style={{ position: "absolute", paddingLeft: "8%", paddingTop: "2%" }}
        >
          <Card
            style={producttype === "gift" ? styles.giftimage : styles.cardimage}
            elevation={22}
          >
            <CardMedia
              component="img"
              src={
                singleProduct
                  ? producttype === "gift"
                    ? imageUrl +
                      singleProduct.foldername +
                      "/" +
                      singleProduct.url
                    : imageUrl + singleProduct.foldername + "/" + currentImage
                  : ""
              }
              alt="Card-Preview"
              crossOrigin="anonymous"
              style={{
                minHeight: "93%",
                alignItems: "center",
                display: "block",
                height: "100%",
              }}
            />
          </Card>
          {producttype === "card" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                position: "absolute",
                paddingTop: "30px",
                paddingRight: "10%",
              }}
            >
              {diffColorCards.map((otherCol) => (
                <Box
                  key={otherCol.toString()}
                  variant="outlined"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderColor: "black",
                    backgroundColor: "#E8E8E8",
                    marginRight: "5%",
                  }}
                  onClick={() => changeDisplayImage(otherCol)}
                >
                  <CardMedia
                    component="img"
                    src={
                      singleProduct
                        ? imageUrl + singleProduct.foldername + "/" + otherCol
                        : ""
                    }
                    alt="Card-Preview"
                    crossOrigin="anonymous"
                    style={{
                      marginLeft: "10%",
                      marginTop: "10%",
                      width: "80%",
                      height: "80%",
                    }}
                  />
                </Box>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "48%",
            width: "30px",
          }}
        >
          <FavoriteButton
            productObject={singleProduct ? singleProduct : ""}
            favorites={favorites}
            setFavorites={setFavorites}
            userID={userID}
            singleProduct={true}
          ></FavoriteButton>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: "58%",
            right: "10%",
          }}
        >
          <Typography
            style={{
              fontSize: "50px",
              fontWeight: "400",
            }}
          >
            {singleProduct ? singleProduct.title : ""}
          </Typography>
          {producttype === "card" ? (
            <Typography
              style={{
                fontSize: "30px",
                paddingLeft: "70px",
              }}
            >
              by {singleProduct ? singleProduct.designer : ""}
            </Typography>
          ) : (
            <></>
          )}
          <Typography
            style={{
              fontSize: "30px",
              paddingTop: "40px",
            }}
          >
            Description:
          </Typography>
          {producttype === "gift" ? (
            <>
              <Typography
                style={{
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                {singleProduct ? singleProduct.description : ""}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                style={{
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                {singleProduct ? singleProduct.description.catchphrase : ""}
              </Typography>
              <Typography
                style={{
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                {singleProduct ? singleProduct.description.details : ""}
              </Typography>
              <Typography
                style={{
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                {singleProduct ? singleProduct.description.color : ""}
              </Typography>
              <Typography
                style={{
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                {singleProduct ? singleProduct.description.sizeandmaterial : ""}
              </Typography>
            </>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "5%",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="secondary"
              style={{
                fontFamily: "Annie Use Your Telescope",
                fontSize: 20,
                height: "50px",
                width: "40%",
                marginRight: "6%",
              }}
              onClick={() => {
                addProductToCart(singleProduct ? singleProduct : null);
              }}
            >
              {producttype === "gift" ? "Add to Basket" : "Write on Card"}
            </Button>
            <div style={{ fontSize: "30px" }}>
              {singleProduct ? singleProduct.price : ""} €
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewCard;
