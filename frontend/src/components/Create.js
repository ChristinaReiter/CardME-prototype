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

  // Used to save custom images
  const [images, setImages] = useState([]);

  // Used as state for chosen image
  const [chosenImage, setChosenImage] = useState(null);

  useEffect(() => {
    if (cardStyle === "chosen" && mode !== "edit") {
      CardService.getSingleCard(id).then((item) => {
        setProduct(item);
      });
    }else if(mode === "edit"){
      let key = parseInt(id)
      ShoppingCartService.getItem(key).then((item) =>{
        console.log(item)
        setProduct(item)

        if(cardStyle === "chosen"){
          setChosenImage(item.cardImage)
        }else{
          setImages([{id: id, file: item.cardImage}])
        }
        setText(item.cardText)
      })
    }
  }, [cardStyle, mode]);

  const handleTextPersist = (text) => {
    setText(text);
  };

  return (
    <div>
      {cardStyle === "own" ? (
        <CreateFront setImages={setImages} images={images} id={id}/>
      ) : (
        <ShowFront product={product} setChosenImage={setChosenImage} chosenImage={chosenImage} mode={mode}/>
      )}
      <CreateText
        text={text}
        handleTextPersist={handleTextPersist}
        setText={setText}
      />
      <CreateAddGift />
      <CreateFinal id={id} text={text} images={images} product={product} cardStyle={cardStyle} chosenImage={chosenImage} mode={mode}/>
    </div>
  );
};

export default Create;
