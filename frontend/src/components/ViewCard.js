import { Box, Button, Card, CardMedia, Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { shadows } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardService from "../services/CardService";
import { useNavigate } from "react-router-dom";

const ViewCard = () => {

 const {cardid} = useParams();
 const [singleProduct, setSingleProduct] = useState();
 const [diffColorCards, setdiffColorCards] = useState([]);
 const imageUrl = "http://localhost:3001/public/";
 const [currentImage, setCurrentImage] = useState(null);
 const navigate = useNavigate();

useEffect(() => {
  CardService.getSingleCard(cardid).then(
    (result) => {
      setSingleProduct(result);
      if (result.title === "Heartly Mother's Day Card") {
        setdiffColorCards(["hmd_blue.png", "hmd_bright.png", "hmd_pale.png", "hmd_yellow.png"]);     
      }
      if (result.title === "Flowery Wishes") {
        setdiffColorCards(["fw_blue.jpg", "fw_green.jpg", "fw_pink.jpg", "fw_orange.jpg"]);
      }
      if (result.title === "I Moustache You") {
        setdiffColorCards(["imy_blue.jpg", "imy_gold.jpg", "imy_red.jpg", "imy_violet.jpg"]);
      }
      if (result.title === "Pastell Flowers") {
        setdiffColorCards(["fp_green.jpg", "fp_violet.jpg", "fp_brown.jpg", "fp_pink.jpg"]);
      }
      setCurrentImage(result.url);
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
};

const addProductToCart = async (product) => {
  //let index = await ShoppingCartService.addItem(product);
  navigate("/create/chosen/" + product._id);
};

const changeDisplayImage= (displayImage) => {
  setCurrentImage(displayImage);
  console.log(displayImage);
}

  return(
    <div style= {{display:"flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "7%"}}>
      <div style = {{position:"absolute", paddingLeft: "8%", paddingTop:"2%"}}>
        <Card style={{
            backgroundColor: "#F3F3F3", 
            width: "400px", 
            height: "560px", 
            objectFit: "contain",
            marginLeft:"7%"
          }} elevation={22}>
          <CardMedia 
            component="img" 
            src={singleProduct? (imageUrl + "/" + singleProduct.foldername + "/" + currentImage) : ""} 
            alt="Card-Preview" 
            crossOrigin="anonymous" 
            style={{
              minHeight:"93%", 
              alignItems:"center", 
              display:"block", 
              height:"100%"
            }} />
        </Card>
        <div style={{display:"flex", flexDirection: "row", justifyContent: "center", position:"absolute", paddingTop:"30px", paddingRight:"10%"}}>
          <Box 
            variant="outlined" 
            style={{width:"100px", height:"100px", borderColor: "black", backgroundColor:"#E8E8E8", marginRight:"5%"}} 
            onClick={() => changeDisplayImage(singleProduct? singleProduct.url : "")}>
            <CardMedia 
                component="img"
                src= {singleProduct? (imageUrl + "/" + singleProduct.foldername + "/" + singleProduct.url) : ""} 
                alt="Card-Preview" 
                crossOrigin="anonymous" 
                style={{
                  marginLeft: "10%", 
                  marginTop:"10%", 
                  width:"80%", 
                  height:"80%"
                }}
                 />
          </Box>
          {diffColorCards.map((otherCol) => (
            <Box 
              key={otherCol.toString()} 
              variant="outlined" 
              style={{width:"100px", height:"100px", borderColor: "black", backgroundColor:"#E8E8E8", marginRight:"5%"}}
              onClick={() => changeDisplayImage(otherCol)}
            >
              <CardMedia 
                component="img"
                src= {singleProduct? (imageUrl + singleProduct.foldername + "/" + otherCol): ""} 
                alt="Card-Preview" 
                crossOrigin="anonymous" 
                style={{
                  marginLeft: "10%", 
                  marginTop:"10%", 
                  width:"80%", 
                  height:"80%"
                }} />
            </Box>
          ))}
        </div>
      </div>
      
      <div style={{
            position:"absolute", 
            left:"48%"
          }}>
        <FavoriteIcon style={{fontSize: "90px"}}></FavoriteIcon>
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
            paddingLeft:"70px"
          }}>by {singleProduct? singleProduct.designer : ""}</Typography>
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
            Write on Card
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