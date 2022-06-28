import React from "react";
import Logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";
import { Tabs, Tab, Typography, Toolbar, AppBar, Box } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const styles = {
  menuText: {
    fontFamily: "typography2",
    fontSize: 20,
    borderRightColor: "#a7cda7",
    borderRightWidth: 0.5,
    borderRightStyle: "solid",
  },
};

const Header = () => {
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
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
