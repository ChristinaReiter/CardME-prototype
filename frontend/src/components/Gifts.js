import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  InputAdornment,
} from "@mui/material";
import GiftService from "../services/GiftService";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import GiftsFilterHeader from "./GiftsFilterHeader";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import Product from "./Product";

const Gifts = ({ 
  setChosenGift, 
  giftSearchTerm, setGiftSearchTerm, 
  giftSizeFilter, setGiftSizeFilter, 
  giftPriceFilter, setGiftPriceFilter, 
  giftOccasionFilter, setGiftOccasionFilter, 
  giftSortFilter, setGiftSortFilter }) => {

  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
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
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //search bar design
  const SearchBarStyle = {
    boxShadow: "1px 3px 9px rgba(0,0,0,0.75)",
    width: "500px",
    height: "40px",
  };

  const productsSort = () => {
    if (giftSortFilter === "titlea") {
      return products.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    if (giftSortFilter === "titlez") {
      return products.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
    if (giftSortFilter == "designera") {
      return products.sort((a, b) => (a.designer > b.designer ? 1 : -1));
    }
    if (giftSortFilter == "designerz") {
      return products.sort((a, b) => (a.designer > b.designer ? -1 : 1));
    }
    if (giftSortFilter == "mostpopular") {
      return products.sort(function (a, b) {
        return b.popularity - a.popularity;
      }); //small hack to simulate popularity
    }
    if (giftSortFilter == "trending") {
      var randomNumber = 0;
      randomNumber = Math.floor(Math.random());
      return products.sort(() => randomNumber - 0.5);
    }
    if (giftSortFilter == "newest") {
      return products.sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    if (giftSortFilter == "oldest") {
      return products.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else {
      return products;
    }
  };

  const filteredCards = productsSort().filter((el) => {
    var filterArray = [];
    Object.keys(giftSizeFilter).map((key) => {
      if (giftSizeFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(giftPriceFilter).map((key) => {
      if (giftPriceFilter[key]) {
        filterArray.push(key);
      }
    });
    Object.keys(giftOccasionFilter).map((key) => {
      if (giftOccasionFilter[key]) {
        filterArray.push(key);
      }
    });
    if (giftSearchTerm.length === 0 && filterArray.length === 0) {
      return el;
    } else if (giftSearchTerm.length === 0 && filterArray.length !== 0) {
      return filterArray.every((filter) => {
        console.log(el.size === filter);
        return (
          el.size === filter ||
          el.pricerange === filter ||
          el.occasion.includes(filter)
        );
      });
    } else if (giftSearchTerm.length !== 0 && filterArray.length === 0) {
      return el.title
        .toString()
        .toLowerCase()
        .includes(giftSearchTerm.toString().toLowerCase());
    } else {
      return (
        el.title
          .toString()
          .toLowerCase()
          .includes(giftSearchTerm.toString().toLowerCase()) &&
        filterArray.every((filter) => {
          return (
            el.size.includes(filter) ||
            el.pricerange.includes(filter) ||
            el.occasion.includes(filter)
          );
        })
      );
    }
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <GiftsFilterHeader
          giftSizeFilter={giftSizeFilter}
          setGiftSizeFilter={setGiftSizeFilter}
          giftPriceFilter={giftPriceFilter}
          setGiftPriceFilter={setGiftPriceFilter}
          occasionFilter={giftOccasionFilter}
          setOccasionFilter={setGiftOccasionFilter}
          sortFilter={giftSortFilter}
          setSortFilter={setGiftSortFilter}
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
            setGiftSearchTerm(event.target.value);
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
      <Product products={filteredCards} gift={true} headerfilter={null} setChosenGift={setChosenGift}/>
      <ToastContainer />
    </div>
  );
};

export default Gifts;
