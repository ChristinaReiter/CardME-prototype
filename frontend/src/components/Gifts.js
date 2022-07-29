import React, { useEffect, useState } from "react";
import { Box, Input, InputAdornment } from "@mui/material";
import GiftService from "../services/GiftService";
import FavoriteService from "../services/FavoriteService";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import GiftsFilterHeader from "./GiftsFilterHeader";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import Product from "./Product";

const Gifts = ({
  setChosenGift,
  setImage,
  giftSearchTerm,
  setGiftSearchTerm,
  giftSizeFilter,
  setGiftSizeFilter,
  giftPriceFilter,
  setGiftPriceFilter,
  giftOccasionFilter,
  setGiftOccasionFilter,
  giftSortFilter,
  setGiftSortFilter,
}) => {
  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    //get all gifts
    GiftService.getAllGifts().then(
      (result) => {
        setProducts(result);
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

  //sort the products based on the filter clicked in the header
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
      return products.sort(function (a, b) { return b.popularity - a.popularity; });
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

  //returns the products filtered by all checked filters
  const filteredGifts = productsSort().filter((el) => {

    var filterArray = [];

    //push all checked filters to the filter array
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

    //filter the products based on the search bar result and the filters
    if (giftSearchTerm.length === 0 && filterArray.length === 0) {
      return el;
    } 
    else if (giftSearchTerm.length === 0 && filterArray.length !== 0) {
      return filterArray.every((filter) => {
        return (
          el.size === filter ||
          el.pricerange === filter ||
          el.occasion.includes(filter)
        );
      });
    } 
    else if (giftSearchTerm.length !== 0 && filterArray.length === 0) {
      return el.title
        .toString()
        .toLowerCase()
        .includes(giftSearchTerm.toString().toLowerCase());
    } 
    else {
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


  //renders the gifts
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
      {/*search bar*/}
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

      {/*product render*/}
      <Product
        products={filteredGifts}
        gift={true}
        headerfilter={null}
        setChosenGift={setChosenGift}
        setImage={setImage}
      />
      <ToastContainer />
    </div>
  );
};

export default Gifts;
