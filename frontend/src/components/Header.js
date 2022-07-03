import React, { useState } from "react";
import Logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";
import {
  Tabs,
  Tab,
  Typography,
  Toolbar,
  AppBar,
  Box,
  Popover,
  Button,
  Grid,
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@emotion/react";

import image01 from "../assets/images/happymothersday.jpg";
import { border } from "@mui/system";
import ShoppingCartService from "../services/ShoppingCartService";

const styles = {
  menuText: {
    fontFamily: "typography2",
    fontSize: 20,
    borderRightColor: "#a7cda7",
    borderRightWidth: 0.5,
    borderRightStyle: "solid",
  },
};

const Header = ({ removeProductFromShoppingCart }) => {
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverOpened = Boolean(popoverAnchor);
  const [shoppingCart, setShoppingCart] = useState([]);

  const openShoppingCart = (event) => {
    setShoppingCart(ShoppingCartService.getCart());

    setPopoverAnchor(event.currentTarget);
  };

  const closeShoppingCart = () => {
    setPopoverAnchor(null);
  };

  const handleRemove = (id) => {
    ShoppingCartService.removeItem(id);
    setShoppingCart(ShoppingCartService.getCart());
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "60px",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="/">
            <img src={Logo} alt="logo" height="55px"></img>
          </NavLink>
          <Tabs sx={{ justifyContent: "center" }}>
            <Tab style={styles.menuText} label="Every Day" href="/cards"></Tab>
            <Tab style={styles.menuText} label="Occasion" href="/cards"></Tab>
            <Tab style={styles.menuText} label="Seasonal" href="/cards"></Tab>
            <Tab
              sx={{
                fontFamily: "typography2",
                fontSize: 20,
              }}
              label="Create"
              href="/create"
            ></Tab>
          </Tabs>
          <Tabs>
            <Typography color="primary">
              <Tab
                icon={<ShoppingCartOutlined fontSize="large" />}
                sx={{ minWidth: 2 }}
                onClick={openShoppingCart}
              />
              <Tab
                icon={<PermIdentityOutlinedIcon fontSize="large" />}
                sx={{ minWidth: 2 }}
                href="/profile"
              />
              <Tab
                icon={<SearchOutlinedIcon fontSize="large" />}
                sx={{ minWidth: 2 }}
              />
            </Typography>
            <Popover
              open={popoverOpened}
              onClose={closeShoppingCart}
              anchorEl={popoverAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Box padding="2em" maxWidth="20em">
                {shoppingCart.length == 0 && (
                  <Typography>No products in your cart, add some...</Typography>
                )}
                {shoppingCart.map((item) => (
                  <Grid
                    container
                    bgcolor={theme.palette.tertiary.main}
                    padding="2em"
                    borderRadius="25px"
                  >
                    <Grid item xs={4}>
                      <img src={image01} width="80%"></img>
                    </Grid>
                    <Grid item xs={8} textAlign="right">
                      <Typography>{item.cardTitle}</Typography>
                      <Typography fontFamily="Antic">
                        {item.cardPrice},-
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      justifyContent="center"
                      display="flex"
                      paddingTop="1em"
                    >
                      <Button
                        variant="contained"
                        style={{ color: theme.palette.secondary.main }}
                        onClick={() => {
                          handleRemove(item.cardId);
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ ml: 4 }}
                        style={{ color: theme.palette.secondary.main }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 4 }}
                      >
                        Checkout
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Popover>
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
