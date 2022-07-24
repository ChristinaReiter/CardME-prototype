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
  const cardtext = document.getElementById("card-text");

  const { cardStyle, id, mode } = useParams();
  const [text, setText] = useState(null);
  const [product, setProduct] = useState();

  // Used to save images (both own and chosen)
  const [image, setImage] = useState(null);

  // Individual Style attributes of the own image
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);

  // Applied Style of the own image
  const [imageFilters, setImageFilters] = useState(null);

  useEffect(() => {
    if (cardStyle === "chosen" && mode !== "edit") {
      CardService.getSingleCard(id).then((item) => {
        setProduct(item);
      });
    } else if (mode === "edit") {
      let key = parseInt(id);
      ShoppingCartService.getItem(key).then((item) => {
        setProduct(item);
        setImage(item.cardImage);
        setText(item.cardText);
      });
    } else {
      // Reset all states for new card
      setRotation(0);
      setBrightness(100);
      setContrast(100);
      setSaturate(100);
      setGrayscale(0);
      setSepia(0);
      setImage(null);
    }
  }, [cardStyle, mode, id]);

  // Adjust applied filter on change
  useEffect(() => {
    const newFilters = {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%) grayscale(${grayscale}%)`,
      transform: `rotate(${rotation}deg)`,
    };

    setImageFilters(newFilters);
  }, [rotation, brightness, contrast, saturate, grayscale, sepia]);

  const handleTextPersist = (text) => {
    setText(text);
  };

  //states for text styles
  const [textFilters, setTextFilters] = useState(null);
  const [fontstyle, setfontstyle] = React.useState("Annie Use Your Telescope");
  const [fontcolor, setfontcolor] = React.useState("black");
  const [fontsize, setfontsize] = React.useState(20);
  const [fontalign, setfontalign] = React.useState("left");
  const [lineHeight, setlineHeight] = React.useState(1);

  const tobedeleted = () => {
    const newFilters = {
      fontFamily: `${fontstyle}`,
      color: `${fontcolor}`,
      fontSize: `${fontsize}px`,
      textAlign: `${fontalign}`,
      lineHeight: `${lineHeight}`,
    };

    cardtext.style.fontFamily = "" + fontstyle;
    cardtext.style.color = "" + fontcolor;
    cardtext.style.fontSize = "" + fontsize + "px";
    cardtext.style.textAlign = "" + fontalign;
    cardtext.style.lineHeight = "" + lineHeight;
  };

  //updating styles of the text
  useEffect(() => {
    const newFilters = {
      fontFamily: `${fontstyle}`,
      color: `${fontcolor}`,
      fontSize: `${fontsize}px`,
      textAlign: `${fontalign}`,
      lineHeight: `${lineHeight}`,
    };

    setTextFilters(newFilters);
  }, [fontstyle, fontcolor, fontsize, fontalign, textFilters, lineHeight]);

  return (
    <div>
      {cardStyle === "own" ? (
        <CreateFront
          setImage={setImage}
          image={image}
          id={id}
          rotation={rotation}
          setRotation={setRotation}
          brightness={brightness}
          setBrightness={setBrightness}
          contrast={contrast}
          setContrast={setContrast}
          saturate={saturate}
          setSaturate={setSaturate}
          grayscale={grayscale}
          setGrayscale={setGrayscale}
          sepia={sepia}
          setSepia={setSepia}
          imageFilters={imageFilters}
        />
      ) : (
        <ShowFront
          product={product}
          setImage={setImage}
          image={image}
          mode={mode}
        />
      )}
      <CreateText
        text={text}
        handleTextPersist={handleTextPersist}
        setText={setText}
        setfontstyle={setfontstyle}
        setfontcolor={setfontcolor}
        setfontsize={setfontsize}
        setfontalign={setfontalign}
        textFilters={textFilters}
      />
      <CreateAddGift />
      <CreateFinal
        id={id}
        text={text}
        image={image}
        product={product}
        cardStyle={cardStyle}
        mode={mode}
        rotation={rotation}
        brightness={brightness}
        contrast={contrast}
        saturate={saturate}
        grayscale={grayscale}
        sepia={sepia}
        imageFilters={imageFilters}
        fontstyle={fontstyle}
        fontcolor={fontcolor}
        fontsize={fontsize}
        fontalign={fontalign}
        textFilters={textFilters}
      />
    </div>
  );
};

export default Create;
