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

useEffect(() => {
  CardService.getSingleCard(cardid).then(
    (result) => {
      setSingleProduct(result);
      console.log(result);
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
          
        </Paper>
      </div>
      <div style={{position:"absolute", left:"48%"}}>
        <FavoriteIcon style={{fontSize: "90px"}}></FavoriteIcon>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems:"start", position:"absolute", left:"58%", right:"10%",}}>
        
      </div>
    </div>
  )
};

export default ViewCard;