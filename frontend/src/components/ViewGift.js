import { Box, Button, Card, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GiftService from "../services/GiftService";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { toast, ToastContainer } from "react-toastify";

const ViewCard = () => {

 const {giftid, headerfilter} = useParams();
 const [singleProduct, setSingleProduct] = useState();
 const imageUrl = "http://localhost:3001/public/";
 const [favorites, setFavorites] = useState([]);
 const navigate = useNavigate();
 const[userID, setUserID] = useState();

useEffect(() => {
  GiftService.getSingleGift(giftid).then(
    (result) => {
      setSingleProduct(result);
    },
    (error) => {
      console.log(error);
    }
  );
  AuthService.getMe().then(
    (result) => {
      setUserID(result._id);
      GiftService.getFavorites(result._id).then(
        (res) => {
          setFavorites(res);
        }
      )
    },
    (error) => {
      console.log(error);
    }
  )
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
};

const addProductToCart = async (product) => {
  navigate("/create/chosen/" + product._id);
};

function SwitchFavoriteButton() {
  const found = favorites.find(element => element._id === singleProduct._id);
  if(found) {
    return (
      <IconButton
        onClick={() => {
          GiftService.removeFavorite({product: singleProduct}).then(
            () => {
              toast("Favorite removed")
              const updated = favorites.filter((fav) => fav._id !== (singleProduct? singleProduct._id: ""));
              setFavorites(updated);
            }
          )
        }}>
        <FavoriteIcon style={{fontSize: "90px", color: "#DC9292"}} />
      </IconButton>     
    )
  }
  else {
    return (
      <IconButton
        onClick={() => {
          if(userID === undefined)
              {
                toast("not logged in");
              }
          GiftService.setFavorites({product: singleProduct}).then(
            () => {
              toast("Favorite added")
              setFavorites([...favorites, singleProduct]);
            }
          )
        }
      }>
        <FavoriteIcon style={{fontSize: "90px", color: "grey"}} />
      </IconButton>
      
    )
  }
}

  return(
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <Box position="fixed" style={styles.backBar}>
            <Button 
            variant="contained"
            disableElevation
            style={{height:"80%", width:"10%", marginLeft: "2%", display:"flex", flexDirection:"row", justifyContent:"start", backgroundColor:"transparent"}} 
            onClick={() => {
                navigate("/gifts"); //logic to save previous state
              
            }}>
            <ArrowBackIosNewOutlinedIcon style={{paddingLeft:"2%"}}/>
            <Typography style={{paddingLeft:"1%", fontSize:"20px", fontFamily: "Abril Fatface"}}>Back</Typography>
          </Button>       
        </Box>
      
    </Box><div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "180px"}}>
        <div style={{ position: "absolute", paddingLeft: "8%", paddingTop: "2%" }}>
          <Card style={{
            backgroundColor: "#F3F3F3",
            width: "450px",
            height: "500px",
            objectFit: "contain",
            marginLeft: "7%"
          }} elevation={22}>
            <CardMedia
              component="img"
              src={singleProduct ? ( imageUrl + "/" + singleProduct.foldername + "/" + singleProduct.url) : ""}
              alt="Card-Preview"
              crossOrigin="anonymous"
              style={{
                minHeight: "93%",
                alignItems: "center",
                display: "block",
                height: "100%"
              }} />
          </Card>
        </div>


        <div style={{
          position: "absolute",
          left: "48%"
        }}>
          <SwitchFavoriteButton></SwitchFavoriteButton>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: "58%",
          right: "10%",
        }}>
          <Typography style={{
            fontSize: "50px",
            fontWeight: "400"
          }}>{singleProduct ? singleProduct.title : ""}</Typography>
          <Typography style={{
            fontSize: "30px",
            paddingTop: "40px"
          }}>Description:</Typography>
          <Typography style={{
            fontSize: "20px",
            paddingTop: "20px"
          }}>{singleProduct ? singleProduct.description : ""}</Typography>
          <div style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "5%"
          }}>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              style={{ fontFamily: "Annie Use Your Telescope", fontSize: 20, height: "50px", width: "40%", marginRight: "6%" }}
              onClick={() => {
                addProductToCart(singleProduct ? singleProduct : null);
              } }
            >
              Add to Basket
            </Button>
            <div style={{ fontSize: "30px" }}>
              {singleProduct ? singleProduct.price : ""} €
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
};

export default ViewCard;