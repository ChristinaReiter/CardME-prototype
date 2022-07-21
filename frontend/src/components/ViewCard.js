import { Box, Card, CardMedia, Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { shadows } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardService from "../services/CardService";

const ViewCard = () => {

 const {cardid} = useParams();
 const [singleProduct, setSingleProduct] = useState();
 const imageUrl = "http://localhost:3001/public/";
 var singleProduct2 = null;

useEffect(() => {
  CardService.getAllCards().then(
    (result) => {
      let singleCard = result.find((element) => {
        return (element._id === cardid)
      });
      setSingleProduct(singleCard);
      singleProduct2 = singleCard;
      console.log(singleProduct);
    },
    (error) => {
      console.log(error);
    }
  );
}, []);


  return(
    <div style= {{display:"flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "7%"}}>
      <div style = {{position:"absolute", left: "13%", paddingTop:"2%"}}>
        <Paper style={{backgroundColor: "#F3F3F3", width: "400px", height: "560px"}} elevation={22}>
          <img src={imageUrl + singleProduct2? singleProduct2.url : ""}></img>
        </Paper>
      </div>
      <div style={{position:"absolute", left:"48%"}}>
        <FavoriteIcon style={{fontSize: "90px"}}></FavoriteIcon>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems:"start", position:"absolute", left:"58%", right:"10%",}}>
        <Typography style={{fontSize:"60px", alignSelf:"center", fontWeight: "500"}}>{singleProduct2.title}</Typography>
        <Typography style={{fontSize:"30px", alignSelf:"center"}}>by {singleProduct2.designer}</Typography>
        <Typography style={{paddingTop:"30px", fontSize: "30px", fontWeight: "500"}}>Description:</Typography>
        <Typography style={{paddingTop:"10px", fontSize:"20px"}}>{singleProduct2.description}</Typography>
      </div>
    </div>
  )
};

export default ViewCard;