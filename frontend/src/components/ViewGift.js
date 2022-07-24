import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GiftService from "../services/GiftService";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ViewCard = () => {

 const {giftid} = useParams();
 const [singleProduct, setSingleProduct] = useState();
 const imageUrl = "http://localhost:3001/public/";
 const [favorites, setFavorites] = useState([]);
 const navigate = useNavigate();

useEffect(() => {
    console.log(giftid);
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
      <FavoriteIcon style={{fontSize: "90px", color: "#DC9292"}}
        onClick={(event) => {
          GiftService.removeFavorite({product: singleProduct}).then(
            (result) => {
              setFavorites(result);
            }
          )
        }
      } />
    )
  }
  else {
    return (
      <FavoriteIcon style={{fontSize: "90px", color: "grey"}}
        onClick={(event) => {
          GiftService.setFavorites({product: singleProduct}).then(
            (result) => {
              setFavorites(result);
            }
          )
        }
      } />
    )
  }
}

  return(
    <div style= {{display:"flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "7%"}}>
      <div style = {{position:"absolute", paddingLeft: "8%", paddingTop:"2%"}}>
        <Card style={{
            backgroundColor: "#F3F3F3", 
            width: "450px", 
            height: "500px", 
            objectFit: "contain",
            marginLeft:"7%"
          }} elevation={22}>
          <CardMedia 
            component="img" 
            src={singleProduct? (imageUrl + "/" + singleProduct.foldername + "/" + singleProduct.url) : ""} 
            alt="Card-Preview" 
            crossOrigin="anonymous" 
            style={{
              minHeight:"93%", 
              alignItems:"center", 
              display:"block", 
              height:"100%"
            }} />
        </Card>
        </div>
    
      
      <div style={{
            position:"absolute", 
            left:"48%"
          }}>
        <SwitchFavoriteButton></SwitchFavoriteButton>
      </div>

      <div style={{
          display:"flex", 
          flexDirection:"column", 
          position:"absolute", 
          left:"58%", 
          right:"10%",
        }}>
        <Typography style={{
            fontSize:"50px", 
            fontWeight:"400"
          }}>{singleProduct? singleProduct.title : ""}</Typography>
        <Typography style={{
            fontSize:"30px", 
            paddingTop:"40px"
          }}>Description:</Typography>
        <Typography style={{
            fontSize:"20px", 
            paddingTop:"20px"
          }}>{singleProduct? singleProduct.description: ""}</Typography>
        <div style={{
            display:"flex", 
            flexDirection:"row", 
            paddingTop:"5%"
          }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            style={{fontFamily: "Annie Use Your Telescope", fontSize: 20, height:"50px", width: "40%", marginRight:"6%"}}
            onClick={() => {
              addProductToCart(singleProduct? singleProduct: null);
            }}   
          >
            Add to Basket
          </Button>
          <div style={{fontSize: "30px"}}>
            {singleProduct? singleProduct.price: ""} €
          </div>
        </div>
      </div>
    </div>
  )
};

export default ViewCard;