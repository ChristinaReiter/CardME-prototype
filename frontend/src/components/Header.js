import React from "react";
import logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink to="/">
          <img src={logo} alt="logo" width="15%"></img>
        </NavLink>
        <NavLink to="/cards">
          <Typography>Every Day</Typography>
        </NavLink>
        <NavLink to="/cards">
          <Typography>Occasion</Typography>
        </NavLink>
        <NavLink to="/cards">
          <Typography>Seasonal</Typography>
        </NavLink>
        <NavLink to="/create">
          <Typography>Create</Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );

  //   <nav>
  //       <NavLink to="/">
  //         <img src={logo} alt="logo" width="15%"></img>
  //       </NavLink>
  //       <NavLink to="/cards">Every Day</NavLink>
  //       <NavLink to="/cards">Occasion</NavLink>
  //       <NavLink to="/cards">Seasonal</NavLink>
  //       <NavLink to="/create">Create</NavLink>
  //   </nav>
  // );
};

export default Header;
