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

const Create = ({ setImages, images }) => {
  const { mode, id } = useParams();
  const [text, setText] = useState(null);
  const [product, setProduct] = useState();

  useEffect(() => {
    if (mode === "chosen") {
      CardService.getSingleCard(id).then((item) => {
        setProduct(item);
      });
    }
  }, []);

  const handleTextPersist = (text) => {
    setText(text);
    ShoppingCartService.updateText(id, text);
  };

  return (
    <div>
      {mode === "own" ? (
        <CreateFront setImages={setImages} images={images} />
      ) : (
        <ShowFront product={product} />
      )}
      <CreateText
        text={text}
        handleTextPersist={handleTextPersist}
        setText={setText}
      />
      <CreateAddGift />
      <CreateFinal id={id} text={text} images={images} product={product} mode={mode}/>
    </div>
  );
};

export default Create;
