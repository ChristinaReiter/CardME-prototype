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
import CardService from "../services/CardService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import FilterHeader from "./FilterHeader";
import AuthService from "../services/AuthService";

const Cards = () => {
  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [colorFilter, setColorFilter] = useState({});
  const [vibeFilter, setVibeFilter] = useState({});
  const [styleFilter, setStyleFilter] = useState({});
  const [recipientsFilter, setRecipientsFilter] = useState({});
  const [occasionFilter, setOccasionFilter] = useState({});
  const [seasonFilter, setSeasonFilter] = useState({});
  const [sortFilter, setSortFilter] = useState("trending");
  const [favorites, setFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    CardService.getAllCards().then(
      (result) => {
        setProducts(result);     
      },
      (error) => {
        console.log(error);
      }
    );
    AuthService.getMe().then(
      (result) => {
        setUserID(result._id);
        CardService.getFavorites(result._id).then(
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
      width: "92px",
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
        if(sortFilter == "mostpopular") {
          return products.sort(); //don't know what to do here lol
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
      Object.keys(colorFilter).map((key) => {
          if (colorFilter[key]) {
            filterArray.push(key);
          }
      })
      Object.keys(vibeFilter).map((key) => {
        if(vibeFilter[key]) {
          filterArray.push(key);
        }
      })
      Object.keys(styleFilter).map((key) => {
        if(styleFilter[key]) {
          filterArray.push(key);
        }
      })
      Object.keys(recipientsFilter).map((key) => {
        if(recipientsFilter[key]) {
          filterArray.push(key);
        }
      })
      Object.keys(occasionFilter).map((key) => {
        if(occasionFilter[key]) {
          filterArray.push(key);
        }
      })
      Object.keys(seasonFilter).map((key) => {
        if(seasonFilter[key]) {
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
              return (
                el.vibe.includes(filter) || 
                el.color.includes(filter) || 
                el.style.includes(filter) || 
                el.recipient.includes(filter) ||
                el.occasion.includes(filter) ||
                el.season.includes(filter))}
          )
        )
      }
      else if(searchTerm.length !== 0 && filterArray.length === 0) {
        return (
          el.title
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          el.designer
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()))
      }
      else {
        return (
          (el.title
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          el.designer
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())) &&
            filterArray
            .every(filter => 
              {
                return (
                  el.vibe.includes(filter) || 
                  el.color.includes(filter) || 
                  el.style.includes(filter) || 
                  el.recipient.includes(filter) ||
                  el.occasion.includes(filter) ||
                  el.season.includes(filter))}
            )
        );
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
          onClick={(event) => {
            CardService.removeFavorite({product: props.productObject}).then(
              (result) => {
                setFavorites(result);
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
          onClick={(event) => {
            CardService.setFavorites({product: props.productObject}).then(
              (result) => {
                setFavorites(result);
                
              }
            )
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
        <FilterHeader 
          colorFilter={colorFilter} setColorFilter={setColorFilter} 
          vibeFilter={vibeFilter} setVibeFilter={setVibeFilter} 
          styleFilter={styleFilter} setStyleFilter={setStyleFilter}
          recipientsFilter={recipientsFilter} setRecipientsFilter={setRecipientsFilter}
          occasionFilter={occasionFilter} setOccasionFilter={setOccasionFilter}
          seasonFilter={seasonFilter} setSeasonFilter={setSeasonFilter}
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
      <Box sx={{ margin: "30px 30px 30px 30px" }}>
        <Typography variant="h4">All Cards:</Typography>
          <div>
          { filteredCards.length > 0 ? 
            (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ margin: "20px 10px 10px 10px" }}
              >
              {filteredCards.map((product) => (
              
                <Grid item xs={3} key={product._id}>
                  <Card
                    sx={{
                      width: 270,
                      height: 430,
                      bgcolor: "#F3F3F3",
                    }}
                  >
                    <FavoriteButton productObject={product} res=""></FavoriteButton>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        style={styles.image}
                        component="img"
                        sx={{ width: 146.67, height: 220, objectFit: "cover" }}
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
                      <Typography
                        fontFamily={"Antic"}
                        fontSize="16px"
                        textAlign={"center"}
                        component="div"
                      >
                        by {product.designer}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          style={styles.button}
                          onClick={() => {
                            navigate("/ViewCard/" + product._id);
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
                          Write
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>))}
              </Grid>
            ): 
            <Typography style={{alignContent:"center", marginLeft:"1%", marginTop:"1%", fontSize:"24px"}}>
              No Cards Available.
            </Typography>}
            </div>
        
      </Box>
    </div>
  );
};

export default Cards;
