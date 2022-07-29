import React, { useEffect, useState } from "react";
import {
    IconButton,
  } from "@mui/material";
  import FavoriteService from "../services/FavoriteService";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { ToastContainer, toast } from 'react-toastify';

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

        //find a single favorite 
        var found = undefined;
        if(favorites.length > 0) {
          found = favorites.find(
            (element) => element._id === productObject._id
          );
        }
        
        //display pink heart if favorite was found
        if (found) {
          return (
              <IconButton
                aria-label="add to favorites"
                style={styles.productfavoritesenabled}
                onClick={() => {

                    //one click removes the favorite
                    FavoriteService.removeFavorite({ product: productObject }).then(
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
        } 
        //display grey heart if the product is not a favorite
        else {
          return (
              <IconButton
                aria-label="add to favorites"
                style={styles.productfavoritesdisabled}
                onClick={() => {
                  //only set favorite when logged in
                  if(userID === undefined)
                  {
                    toast("not logged in");
                  }
                  else {
                    FavoriteService.setFavorites({ product: productObject }).then(
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