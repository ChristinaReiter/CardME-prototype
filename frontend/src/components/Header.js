import React from "react";
import Logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/material";

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
        position="static"
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "60px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="/">
            <img src={Logo} alt="logo" width="100px"></img>
          </NavLink>
          <Tabs sx={{ justifyContent: "center" }}>
            <Tab label="Every Day" href="/cards"></Tab>
            <Tab label="Occasion" href="/cards"></Tab>
            <Tab label="Seasonal" href="/cards"></Tab>
            <Tab label="Create" href="/create"></Tab>
          </Tabs>
          <div>[Icons]</div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
