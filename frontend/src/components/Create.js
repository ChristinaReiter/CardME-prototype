import { AppBar, Box, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateFront from "./CreateFront";
import CreateText from "./CreateText";
import CreateAddGift from "./CreateAddGift";
import CreateFinal from "./CreateFinal";
import ShoppingCartService from "../services/ShoppingCartService";
import { useParams } from "react-router-dom";

const Create = () => {
  const { id } = useParams()
  const [text, setText] = useState(null)

  useEffect(() => {
    async function getData(){
      let item = await ShoppingCartService.findItemById(id)
      if(item){
        console.log(item.text)
        setText(item.text)
      }
    }
    getData()
  }, [])

  const handleTextPersist = (text) =>{
    setText(text)
    ShoppingCartService.updateText(id, text)
  }

  return (
    <div>
      <CreateFront id={id}/>
      <CreateText text={text} handleTextPersist={handleTextPersist} setText={setText}/>
      <CreateAddGift />
      <CreateFinal text={text}/>
    </div>
  );
};

export default Create;
