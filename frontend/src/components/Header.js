import React from "react";
import Logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { fontSize } from "@mui/system";

const Header = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppBar
        position="absolute"
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
            <img src={Logo} alt="logo" width="130px"></img>
          </NavLink>
          <Tabs
            sx={{
              justifyContent: "center",
            }}
          >
            <Tab
              sx={{
                fontFamily: "typography2",
                fontSize: 20,
                borderRightColor: "#a7cda7",
                borderRightWidth: 0.5,
                borderRightStyle: "solid",
              }}
              label="Every Day"
              href="/cards"
            ></Tab>
            <Tab
              sx={{
                fontFamily: "typography2",
                fontSize: 20,
                borderRightColor: "#a7cda7",
                borderRightWidth: 0.5,
                borderRightStyle: "solid",
              }}
              label="Occasion"
              href="/cards"
            ></Tab>
            <Tab
              sx={{
                fontFamily: "typography2",
                fontSize: 20,
                borderRightColor: "#a7cda7",
                borderRightWidth: 0.5,
                borderRightStyle: "solid",
              }}
              label="Seasonal"
              href="/cards"
            ></Tab>
            <Tab
              sx={{ fontFamily: "typography2", fontSize: 20 }}
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
