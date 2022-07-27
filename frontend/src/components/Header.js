import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useTheme } from "@emotion/react";
import AuthService from "../services/AuthService";
import ShoppingCartService from "../services/ShoppingCartService";

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

const Header = ({ images, currentAccount, setCurrentAccount }) => {
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverOpened = Boolean(popoverAnchor);
  const [shoppingCart, setShoppingCart] = useState([]);
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(null);


   useEffect(() => {
    AuthService.getMe().then((res) => {
      setCurrentAccount(res);
    });
  }, []); 

  const openShoppingCart = (event) => {
    ShoppingCartService.getCart().then((card) => {
      setShoppingCart(card);
    });
    setPopoverAnchor(event.currentTarget);
  };

  const closeShoppingCart = () => {
    setPopoverAnchor(null);
  };

  const handleRemove = (id) => {
    ShoppingCartService.removeItem(id);

    ShoppingCartService.getCart().then((card) => {
      setShoppingCart(card);
    });
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
            <NavLink style={styles.menuText} to="/cards/simple">
              Every Day
            </NavLink>
            <NavLink style={styles.menuText} to={"/cards/birthday"}>
              Occasion
            </NavLink>
            <NavLink style={styles.menuText} to="/cards/summer">
              Seasonal
            </NavLink>
            <NavLink
              style={styles.menuText}
              to={"/create/own/" + Math.floor(Math.random() * 100000000) + "/new"}
            >
              Create
            </NavLink>
          </Box>
          <Box>
            <Typography color="primary">
              <Button sx={{ minWidth: 2 }} onClick={openShoppingCart}>
                <ShoppingCartOutlined fontSize="large" />
              </Button>
              <IconButton // functionality that different things are shown based on wether user is logged in still needs to be implemented
                aria-haspopup="true"
                color="inherit"
                aria-controls="profile-menu"
                onClick={(e) => setProfileMenu(e.currentTarget)}
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
                {!currentAccount && (
                  <MenuItem
                    component={Link}
                    onClick={() => setProfileMenu(null)}
                    to="/login"
                  >
                    Log In
                  </MenuItem>
                )}
                {!currentAccount && (
                  <MenuItem
                    component={Link}
                    onClick={() => setProfileMenu(null)}
                    to="/register"
                  >
                    Register
                  </MenuItem>
                )}
                {currentAccount && (
                  <MenuItem
                    component={Link}
                    onClick={() => setProfileMenu(null)}
                    to="/profile/view"
                  >
                    Profile
                  </MenuItem>
                )}
                {currentAccount && (
                  <MenuItem
                    component={Link}
                    onClick={() => {
                      setProfileMenu(null);
                      setCurrentAccount(undefined)
                      AuthService.logout();
                    }}
                    to="/login"
                  >
                    LogOut
                  </MenuItem>
                )}
              </Menu>
              <Button sx={{ minWidth: 2 }}>
                <QuestionMarkIcon
                  fontSize="large"
                  onClick={() => {
                    navigate("/about");
                  }}
                />
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
                    key={item.id}
                  >
                    <Grid item xs={4}>
                      <img
                        src={URL.createObjectURL(item.cardImage)}
                        width="80%"
                        alt="Product"
                        style={item.cardImageFilters}
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
                          handleRemove(item.id);
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ ml: 4 }}
                        style={{ color: theme.palette.secondary.main }}
                        onClick={() => {
                          let path =
                            item.cardTitle === "Own Card" ? "own/" : "chosen/";
                          navigate("/create/" + path + item.id + "/edit");
                          closeShoppingCart();
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 4 }}
                        onClick={() => {
                          navigate("/checkout-data/" + item.id);
                          closeShoppingCart();
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
