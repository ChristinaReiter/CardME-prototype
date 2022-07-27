import React, { useEffect, useState } from "react";
import {
    CardActions,
    IconButton,
  } from "@mui/material";
  import CardService from "../services/CardService";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { ToastContainer, toast } from 'react-toastify';
import { Scale } from "@mui/icons-material";

const FavoriteButton = ({productObject, favorites, setFavorites, userID, singleProduct}) => {

    const styles = {
        productfavoritesenabled: {
          color: "#DC9292", 
          marginLeft: "auto",
          fontSize:"30px"
        },
        productfavoritesdisabled: {
          color: "grey", 
          marginLeft:"auto",
        },
        singleproductfavoritesenabled: {
          fontSize: "90px", 
          color: "#DC9292"
        },
        singleproductfavoritesdisabled: {
          fontSize: "90px", 
          color: "grey"
        },
    };
   
        const found = favorites.find(
            (element) => element._id === productObject._id
          );
        
        if (found) {
          return (
              <IconButton
                aria-label="add to favorites"
                style={styles.productfavoritesenabled}
                onClick={() => {
                    CardService.removeFavorite({ product: productObject }).then(
                      () => {
                        toast("Favorite removed");
                        const updated = favorites.filter((fav) => fav._id !== productObject._id);
                        setFavorites(updated);
                      }
                    ); 
                }}
              >
                <FavoriteIcon style={singleProduct ? styles.singleproductfavoritesenabled : {}}/>
              </IconButton>
            
          );
        } else {
          return (
              <IconButton
                aria-label="add to favorites"
                style={styles.productfavoritesdisabled}
                onClick={() => {
                  if(userID === undefined)
                  {
                    toast("not logged in");
                  }
                  else {
                    CardService.setFavorites({ product: productObject }).then(
                      () => {
                        toast("Favorite added") 
                        setFavorites([...favorites, productObject]);
                      }
                  );
                  }              
                }}
              >
                <FavoriteIcon style={singleProduct? styles.singleproductfavoritesdisabled : {}}/>
              </IconButton>
          );
        }
      
};

export default FavoriteButton;