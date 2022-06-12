import React from "react";
import logo from "./../assets/images/logo_transparent.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
        <NavLink to="/">
          <img src={logo} alt="logo" width="15%"></img>
        </NavLink>
        <NavLink to="/cards">Every Day</NavLink>
        <NavLink to="/cards">Occasion</NavLink>
        <NavLink to="/cards">Seasonal</NavLink>
        <NavLink to="/create">Create</NavLink>
    </nav>
  );
};

export default Header;
