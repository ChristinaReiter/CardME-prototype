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
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import GiftService from "../services/GiftService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import GiftsFilterHeader from "./GiftsFilterHeader";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import Product from "./Product";

const Gifts = () => {
  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [giftSizeFilter, setGiftSizeFilter] = useState({});
  const [giftPriceFilter, setGiftPriceFilter] = useState({});
  const [occasionFilter, setOccasionFilter] = useState({});
  const [sortFilter, setSortFilter] = useState("trending");
  const [favorites, setFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    GiftService.getAllGifts().then(
      (result) => {
        console.log(result);
        setProducts(result);     
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
            console.log(res);
            setFavorites(res);
          },
          (err) => {
            console.log(err);
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
      width: "110px",
    },
    favorites: {
      marginLeft: "auto",
    },
    image: {
      objectFit: "cover",
    },
  };

  //search bar design
  const SearchBarStyle = {
    boxShadow: "1px 3px 9px rgba(0,0,0,0.75)",
    width: "500px",
    height: "40px",
  };



  const addProductToCart = async (product) => {
    //let index = await ShoppingCartService.addItem(product);
    navigate("/create/chosen/" + product._id);
  };

  const productsSort = () => {

    
        if(sortFilter === "titlea") {
          return products.sort((a,b) => a.title > b.title? 1: -1)
        }  
        if(sortFilter === "titlez") {
          return products.sort((a,b) => a.title > b.title? -1: 1)
        }  
        if(sortFilter == "designera") {
          return products.sort((a,b) => a.designer > b.designer? 1: -1)
        }  
        if(sortFilter == "designerz") {
          return products.sort((a,b) => a.designer > b.designer? -1: 1)
        }  
        if (sortFilter == "mostpopular") {
          return products.sort(function(a, b) {
            return b.popularity - a.popularity;
          }); //small hack to simulate popularity
        }
        if(sortFilter == "trending") {
          var randomNumber = 0;
          randomNumber = Math.floor(Math.random());
          return products.sort(() => randomNumber - 0.5);
        } 
        if(sortFilter == "newest") {
          return products.sort((a,b) => a.date > b.date? -1 : 1);
        } 
        if(sortFilter == "oldest") {
          return products.sort((a,b) => a.date > b.date? 1 : -1);
        } 
        else {
          return products; 
        }
          
  };

  const filteredCards = productsSort().filter (
    (el) => {
      var filterArray = [];
      Object.keys(giftSizeFilter).map((key) => {
          if (giftSizeFilter[key]) {
            filterArray.push(key);
          }
      })
      Object.keys(giftPriceFilter).map((key) => {
        if(giftPriceFilter[key]) {
          filterArray.push(key);
        }
      })
      Object.keys(occasionFilter).map((key) => {
        if(occasionFilter[key]) {
          filterArray.push(key);
        }
      })
      if (searchTerm.length === 0 && filterArray.length === 0) {
        return el;      
      } 
      else if(searchTerm.length === 0 && filterArray.length !== 0) {
        return(
          filterArray
          .every(filter => 
            {
              console.log(el.size === filter);
              return (
                el.size === (filter) || 
                el.pricerange === (filter) || 
                el.occasion.includes(filter))}
          )
        )
      }
      else if(searchTerm.length !== 0 && filterArray.length === 0) {
        return (
          el.title
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()))
      }
      else {
        return (
          (el.title
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) &&
            filterArray
            .every(filter => 
              {
                return (
                  el.size.includes(filter) || 
                  el.pricerange.includes(filter) || 
                  el.occasion.includes(filter))}
            )
        ));
      }
    }
  )
  
  
  function FavoriteButton(props) {
    const found = favorites.find(element => element._id === props.productObject._id);
    if(found) {    
      return(         
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          style={styles.favorites}
          sx={{color:"#DC9292"}}
          onClick={() => {
            GiftService.removeFavorite({product: props.productObject}).then(
              () => {
                toast("Favorite removed")
                const updated = favorites.filter((fav) => fav._id !== props.productObject._id);
              
                setFavorites(updated);
              }
            )
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>    
      )      
    
  }
  else {
    return(
    <CardActions>
        <IconButton
          aria-label="add to favorites"
          style={styles.favorites}
          sx={{color:"grey"}}
          onClick={() => {
            if(userID === undefined)
              {
                toast("not logged in");
              }
              else {
                GiftService.setFavorites({product: props.productObject}).then(
                  () => {
                    toast("Favorite added")
                  
                    setFavorites([...favorites, props.productObject]);
                  }
                )
              }
            
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions> 
    )
  }
  }
  

  return (
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <GiftsFilterHeader 
          giftSizeFilter={giftSizeFilter} setGiftSizeFilter={setGiftSizeFilter} 
          giftPriceFilter={giftPriceFilter} setGiftPriceFilter={setGiftPriceFilter} 
          occasionFilter={occasionFilter} setOccasionFilter={setOccasionFilter}
          sortFilter={sortFilter} setSortFilter={setSortFilter}/>
      </Box>
      <Box
        sx={{
          margin: "200px 0px 0px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Search for…"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          style={SearchBarStyle}
        ></Input>
      </Box>
      <Product products={products} gift={true} headerfilter={null} />
      <ToastContainer />
    </div>
  );
};

export default Gifts;
