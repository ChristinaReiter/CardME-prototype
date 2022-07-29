import React, { useEffect, useState } from "react";
import { Box, Input, InputAdornment } from "@mui/material";
import CardService from "../services/CardService";
import FavoriteService from "../services/FavoriteService";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import CardsFilterHeader from "./CardsFilterHeader";
import AuthService from "../services/AuthService";
import Product from "./Product";

const Cards = ({
  searchTerm,
  setSearchTerm,
  colorFilter,
  setColorFilter,
  vibeFilter,
  setVibeFilter,
  styleFilter,
  setStyleFilter,
  recipientsFilter,
  setRecipientsFilter,
  occasionFilter,
  setOccasionFilter,
  seasonFilter,
  setSeasonFilter,
  sortFilter,
  setSortFilter,
  setImage,
}) => {
  const [products, setProducts] = useState([]);
  const { headerfilter } = useParams();

  useEffect(() => {

    //get all cards
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

    //set the filters on checked if one of the options in the header are used
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
    SearchBarStyle : {
      boxShadow: "1px 3px 9px rgba(0,0,0,0.75)",
      width: "500px",
      height: "40px",
    },
  };

  //sort the products based on the filter clicked in the header
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
      return products.sort(function (a, b) { return b.popularity - a.popularity;}); 
    }
    if (sortFilter == "newest") {
      return products.sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    if (sortFilter == "oldest") {
      return products.sort((a, b) => (a.date > b.date ? 1 : -1));
    } 
    else {
      return products;
    }
  };

  //returns the products filtered by all checked filters
  const filteredCards = productsSort().filter((el) => {
    var filterArray = [];

    //push all checked filters to the filter array
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

    //filter the products based on the search bar result and the filters
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

  //render
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
            setSearchTerm(event.target.value);
          }}
          placeholder="Search for…"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          style={styles.SearchBarStyle}
        ></Input>
      </Box>
      
      {/*render products*/}
      <Product
        products={filteredCards}
        gift={false}
        headerfilter={headerfilter}
        setImage={setImage}
      />
    </div>
  );
};

export default Cards;
