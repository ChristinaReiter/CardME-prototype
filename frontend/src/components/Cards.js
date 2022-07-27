import React, { useEffect, useState } from "react";
import {
  Alert,
  Typography,
  Button,
  Box,
  Collapse,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  InputAdornment,
  TextareaAutosize,
} from "@mui/material";
import CardService from "../services/CardService";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import CardsFilterHeader from "./CardsFilterHeader";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import Product from "./Product";

const Cards = () => {
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
  const { headerfilter } = useParams();

  useEffect(() => {
    CardService.getAllCards().then(
      (result) => {
        if (result !== undefined) {
          setProducts(result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    AuthService.getMe().then(
      (result) => {
       
        if (!result.status) {
          console.log("hi")
          setUserID(result._id);
          CardService.getFavorites(result._id).then(
            (res) => {
              setFavorites(res);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
    if (headerfilter === "birthday") {
      setOccasionFilter({ ...occasionFilter, [headerfilter]: true });
      setSeasonFilter({ ...seasonFilter, ["summer"]: false });
      setStyleFilter({ ...styleFilter, ["simple"]: false });
    }

    if (headerfilter === "summer") {
      setSeasonFilter({ ...seasonFilter, [headerfilter]: true });
      setOccasionFilter({ ...occasionFilter, ["birthday"]: false });
      setStyleFilter({ ...styleFilter, ["simple"]: false });
    }

    if (headerfilter === "simple") {
      setStyleFilter({ ...styleFilter, [headerfilter]: true });
      setOccasionFilter({ ...occasionFilter, ["birthday"]: false });
      setSeasonFilter({ ...seasonFilter, ["summer"]: false });
    }
  }, [headerfilter]);

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
    if (sortFilter === "titlea") {
      return products.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    if (sortFilter === "titlez") {
      return products.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
    if (sortFilter == "designera") {
      return products.sort((a, b) => (a.designer > b.designer ? 1 : -1));
    }
    if (sortFilter == "designerz") {
      return products.sort((a, b) => (a.designer > b.designer ? -1 : 1));
    }
    if (sortFilter == "mostpopular") {
      return products.sort(function(a, b) {
        return b.popularity - a.popularity;
      }); //small hack to simulate popularity
    }
    if (sortFilter == "trending") {
      //return products.sort(() => Math.random() - 0.5); //we would need to check the clicks in a certain time interval here
      return products.sort();
    }
    if (sortFilter == "newest") {
      return products.sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    if (sortFilter == "oldest") {
      return products.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else {
      return products;
    }
  };

  const filteredCards = productsSort().filter((el) => {
    var filterArray = [];

    Object.keys(colorFilter).map((key) => {
      if (colorFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(vibeFilter).map((key) => {
      if (vibeFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(styleFilter).map((key) => {
      if (styleFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(recipientsFilter).map((key) => {
      if (recipientsFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(occasionFilter).map((key) => {
      if (occasionFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(seasonFilter).map((key) => {
      if (seasonFilter[key]) {
        filterArray.push(key);
      }
    });
    if (searchTerm.length === 0 && filterArray.length === 0) {
      return el;
    } else if (searchTerm.length === 0 && filterArray.length !== 0) {
      return filterArray.every((filter) => {
        return (
          el.vibe.includes(filter) ||
          el.color.includes(filter) ||
          el.style.includes(filter) ||
          el.recipient.includes(filter) ||
          el.occasion.includes(filter) ||
          el.season.includes(filter)
        );
      });
    } else if (searchTerm.length !== 0 && filterArray.length === 0) {
      return (
        el.title
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        el.designer
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
      );
    } else {
      return (
        (el.title
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
          el.designer
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())) &&
        filterArray.every((filter) => {
          return (
            el.vibe.includes(filter) ||
            el.color.includes(filter) ||
            el.style.includes(filter) ||
            el.recipient.includes(filter) ||
            el.occasion.includes(filter) ||
            el.season.includes(filter)
          );
        })
      );
    }
  });

  return (
    <div>     
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <CardsFilterHeader
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          vibeFilter={vibeFilter}
          setVibeFilter={setVibeFilter}
          styleFilter={styleFilter}
          setStyleFilter={setStyleFilter}
          recipientsFilter={recipientsFilter}
          setRecipientsFilter={setRecipientsFilter}
          occasionFilter={occasionFilter}
          setOccasionFilter={setOccasionFilter}
          seasonFilter={seasonFilter}
          setSeasonFilter={setSeasonFilter}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
        />
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
      <Product products={filteredCards} gift={false} headerfilter={headerfilter} />   
    </div>
  );
};

export default Cards;
