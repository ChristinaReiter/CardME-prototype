import React, { useState } from "react";
import Logo from "./../assets/images/logo_transparent.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  Popover,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@emotion/react";

import ShoppingCartService from "../services/ShoppingCartService";

const imageUrl = "http://localhost:3001/public/";
const styles = {
  menuText: {
    fontFamily: "typography2",
    fontSize: 20,
    borderColor: "#a7cda7",
    borderWidth: 0.5,
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
    color: "#999999",
    textDecoration: "none",
    padding: "0.5em 1em",
    fontWeight: 500,
    textTransform: "uppercase",
  },
};

const Header = () => {
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverOpened = Boolean(popoverAnchor);
  const [shoppingCart, setShoppingCart] = useState([]);
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(null);

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
          <Box sx={{ justifyContent: "center" }}>
            <NavLink style={styles.menuText} to="/cards">
              Every Day
            </NavLink>
            <NavLink style={styles.menuText} to="/cards">
              Occasion
            </NavLink>
            <NavLink style={styles.menuText} to="/cards">
              Seasonal
            </NavLink>
            <NavLink style={styles.menuText} to="/create">
              Create
            </NavLink>
          </Box>
          <Box>
            <Typography color="primary">
              <Button sx={{ minWidth: 2 }} onClick={openShoppingCart}>
                <ShoppingCartOutlined fontSize="large" />
              </Button>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                aria-controls="profile-menu"
                onClick={e => setProfileMenu(e.currentTarget)}
              >
                <PermIdentityOutlinedIcon fontSize="large" />
              </IconButton>

              <Menu
                id="profile-menu"
                open={Boolean(profileMenu)}
                anchorEl={profileMenu}
                onClose={() => setProfileMenu(null)}
                disableAutoFocusItem
              >
                <MenuItem
                  component={Link}
                  onClick={() => setProfileMenu(null)}
                  to="/login"
                >
                  Log In
                </MenuItem>
                <MenuItem
                  component={Link}
                  onClick={() => setProfileMenu(null)}
                  to="/register"
                >
                  Register
                </MenuItem>
                <MenuItem
                  component={Link}
                  onClick={() => setProfileMenu(null)}
                  to="/profile/view"
                >
                  Profile-Temporary
                </MenuItem>
              </Menu>           
              <Button sx={{ minWidth: 2 }}>
                <SearchOutlinedIcon fontSize="large" />
              </Button>
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
                {shoppingCart.length === 0 && (
                  <Typography>No products in your cart, add some...</Typography>
                )}
                {shoppingCart.map((item) => (
                  <Grid
                    container
                    bgcolor={theme.palette.tertiary.main}
                    padding="2em"
                    borderRadius="25px"
                    marginTop="1em"
                    key={item.cardId}
                  >
                    <Grid item xs={4}>
                      <img
                        src={imageUrl + item.cardImg}
                        width="80%"
                        crossOrigin="anonymous"
                        alt="Product"
                      ></img>
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
                        onClick={() => {
                          navigate("/create");
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 4 }}
                        onClick={() => {
                          navigate("checkout-data");
                        }}
                      >
                        Checkout
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
