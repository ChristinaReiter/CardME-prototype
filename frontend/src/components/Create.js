import { AppBar, Box, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateFront from "./CreateFront";
import CreateText from "./CreateText";
import CreateAddGift from "./CreateAddGift";
import CreateFinal from "./CreateFinal";
import ShowFront from "./ShowFront";
import ShoppingCartService from "../services/ShoppingCartService";
import { useParams } from "react-router-dom";
import CardService from "../services/CardService";

const Create = () => {
  const { cardStyle, id, mode } = useParams();
  const [text, setText] = useState(null);
  const [product, setProduct] = useState();

  // Used to save images (both own and chosen)
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (cardStyle === "chosen" && mode !== "edit") {
      CardService.getSingleCard(id).then((item) => {
        setProduct(item);
      });
    }else if(mode === "edit"){
      let key = parseInt(id)
      ShoppingCartService.getItem(key).then((item) =>{
        setProduct(item)
        setImage(item.cardImage)
        setText(item.cardText)
      })
    }else{
      setImage(null)
    }
  }, [cardStyle, mode, id]);

  const handleTextPersist = (text) => {
    setText(text);
  };

  return (
    <div>
      {cardStyle === "own" ? (
        <CreateFront setImage={setImage} image={image} id={id}/>
      ) : (
        <ShowFront product={product} setImage={setImage} image={image} mode={mode}/>
      )}
      <CreateText
        text={text}
        handleTextPersist={handleTextPersist}
        setText={setText}
      />
      <CreateAddGift />
      <CreateFinal id={id} text={text} image={image} product={product} cardStyle={cardStyle} mode={mode}/>
    </div>
  );
};

export default Create;
