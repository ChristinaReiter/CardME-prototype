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
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import CardService from "../services/CardService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ShoppingCartService from "../services/ShoppingCartService";

const Cards = () => {
  const imageUrl = "http://localhost:3001/public/";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
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
  }, []);

  const styles = {
    filterHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      borderRight: "1px solid",
      background: "#A7CDA7",
      "&:hover": {
        background: "#FF69B4",
      },
    },
    filterBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      background: "#A7CDA7",
      "&:hover": {
        background: "#FF69B4",
      },
      boxShadow:
        "0px 2px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
      top: "60px",
      zIndex: "1",
    },
    tableRow: {
      height: 70,
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    tableCell: {
      borderRight: "1px solid",
      backgroundColor: "FF69B4",
      width: "100%",
      borderBottom: "none",
      background: "#A7CDA7",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "5px 10px",
    },
    tableCellHover: {
      borderRight: "1px solid",
      background: "rgba(10, 81, 8, 0.61)",
      width: "100%",
      borderBottom: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "5px 10px",
    },
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

  const productsCopy = JSON.parse(JSON.stringify(products));

  //search bar design
  const SearchBarStyle = {
    boxShadow: "1px 3px 9px rgba(0,0,0,0.75)",
    width: "500px",
    height: "40px",
  };

  //search bar logic
  const searchInputHandler = (e) => {
    const value = e.target.value;

    {
      /*const filteredCards = [];
  for (var i = 0; i < products.length; i++) {
    if(products[i].title.toString().toLowerCase().includes(value.toString().toLowerCase())) {
      filteredCards.push(products[i]);
    }
  }*/
    }
    const filteredCards = products.filter((el) => {
      console.log(el);
      if (value === "") {
        return el;
      } else {
        return el.title.toString().toLowerCase().includes(value.toLowerCase());
      }
    });
    setProducts(filteredCards);
  };

  const addProductToCart = (product) => {
    ShoppingCartService.addItem(product);
    navigate("/create");
  };

  const [filterIsHovering, setFilterIsHovering] = useState(-1);
  const [filterIsClicked, setFilterIsClicked] = useState(-1);

  function handleFilterMouseEnter(index) {
    setFilterIsHovering(index);
  }

  function clickOnFilter(index) {
    setFilterIsClicked(index);
  }

  function EnableBox({ index }) {
      var positionIndex = "0px";
      if(index === 1) {
        positionIndex = "14%";
      }
      if(index === 2) {
        positionIndex = "28%";
      }
      if(index === 3) {
        positionIndex = "42%";
      }
      if(index === 4) {
        positionIndex = "56%";
      }
      if(index === 5) {
        positionIndex = "70%";
      }
      if(index === 6) {
        positionIndex = "85%";
      }
      if (filterIsHovering != index) {
        return <Box disabled></Box>;
      }
      else {
        return (
          <Box
            style={{
              position: "absolute",
              width: 300,
              height: 200,
              top: "70px",
              left: positionIndex,
              background: "rgba(167, 205,	167, 0.8)",
              zIndex: 1,
            }}
          >
            <div style= {{display:"flex", flexDirection: "row", paddingLeft:"5%"}}>
            <div style={{display: "flex", flexDirection: "column", paddingRight:"15%"}}>
              <FormGroup>
                <FormControlLabel value= "end" control={<Checkbox style={{color: "black", "&$checked": "black"}}></Checkbox>} label="Red"></FormControlLabel>
              </FormGroup>
              <FormGroup>
                <FormControlLabel value= "end" control={<Checkbox style={{color: "black", "&$checked": "black"}}></Checkbox>} label="Yellow"></FormControlLabel>
              </FormGroup>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
              <FormGroup>
                <FormControlLabel value= "end" control={<Checkbox style={{color: "black", "&$checked": "black"}}></Checkbox>} label="Yellow"></FormControlLabel>
              </FormGroup>
              <FormGroup>
                <FormControlLabel value= "end" control={<Checkbox style={{color: "black", "&$checked": "black"}}></Checkbox>} label="Green"></FormControlLabel>
              </FormGroup>
            </div>
            </div>
          </Box>
        );
      }

  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, flexShrink: 1, position: "relative" }}>
        <Box position="fixed" style={styles.filterBar}>
          <Table>
            <TableHead>
              <TableRow style={styles.tableRow}>
                <TableCell
                  style={
                    filterIsHovering === 0
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(0)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(0)}
                >
                  <div>
                    <Typography variant="h5">
                      <b>Color</b>
                    </Typography>
                    <Typography variant="h7">All Colors</Typography>
                  </div>
                  <EnableBox index={0}></EnableBox>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 1
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(1)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(1)}
                >
                  <div>
                    <Typography variant="h5">
                      <b>Vibes</b>
                    </Typography>
                    <Typography variant="h7">All Vibes</Typography>
                  </div>
                  <EnableBox index={1}></EnableBox>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 2
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(2)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(2)}
                >
                  <div>
                  <EnableBox index={2}></EnableBox>
                    <Typography variant="h5">
                      <b>Styles</b>
                    </Typography>
                    <Typography variant="h7">All Styles</Typography>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 3
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(3)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(3)}
                >
                  <div>
                  <EnableBox index={3}></EnableBox>
                    <Typography variant="h5">
                      <b>Recipients</b>
                    </Typography>
                    <Typography variant="h7">All Recipients</Typography>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 4
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(4)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(4)}
                >
                  <div>
                  <EnableBox index={4}></EnableBox>
                    <Typography variant="h5">
                      <b>Occasion</b>
                    </Typography>
                    <Typography variant="h7">All Occasions</Typography>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 5
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(5)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(5)}
                >
                  <div>
                  <EnableBox index={5}></EnableBox>
                    <Typography variant="h5">
                      <b>Season</b>
                    </Typography>
                    <Typography variant="h7">All Seasons</Typography>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 6
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(6)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                  onClick={() => clickOnFilter(6)}
                >
                  <div>
                  <EnableBox index={6}></EnableBox>
                    <Typography variant="h5">
                      <b>Sort By</b>
                    </Typography>
                    <Typography variant="h7">Most Trending</Typography>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Box>
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
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: "20px 10px 10px 10px" }}
        >
          {products
            .filter((el) => {
              if (searchTerm == "") {
                return el;
              } else {
                return (
                  el.title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  el.designer
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                );
              }
            })
            .map((product) => (
              <Grid item xs={3}>
                <Card
                  sx={{
                    width: 270,
                    height: 430,
                    bgcolor: "#F3F3F3",
                  }}
                >
                  <CardActions>
                    <IconButton
                      aria-label="add to favorites"
                      style={styles.favorites}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
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
                      src={imageUrl + product.url}
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
                        href=".././ViewCard"
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
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Cards;
