import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import CreateFront from "./CreateFront";
import CreateText from "./CreateText";
import CreateAddGift from "./CreateAddGift";
import CreateFinal from "./CreateFinal";

const Create = () => {
  return (
    <div>
      <CreateFront />
      <CreateText />
      <CreateAddGift />
      <CreateFinal />
    </div>
  );
};

export default Create;
