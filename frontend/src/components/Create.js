import React, { useEffect, useState } from "react";
import CreateFront from "./CreateFront";
import CreateText from "./CreateText";
import CreateAddGift from "./CreateAddGift";
import CreateFinal from "./CreateFinal";
import ShowFront from "./ShowFront";
import ShoppingCartService from "../services/ShoppingCartService";
import { useParams } from "react-router-dom";
import CardService from "../services/CardService";

const Create = ({
  image,
  setImage,
  text,
  setText,
  rotation,
  setRotation,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturate,
  setSaturate,
  grayscale,
  setGrayscale,
  sepia,
  setSepia,
  imageFilters,
  setImageFilters,
  cardheight,
  setCardheight,
  cardwidth,
  setCardwidth,
  fontstyle,
  setfontstyle,
  fontcolor,
  setfontcolor,
  fontsize,
  setfontsize,
  fontalign,
  setfontalign,
  textFilters,
  setTextFilters,
  lineHeight,
  setlineHeight,
  chosenGift,
  setChosenGift,
  popoverDrafts,
  setPopoverDrafts,
}) => {
  const { cardStyle, id, mode } = useParams();
  const [product, setProduct] = useState();

  //setting up ShoppingCart with different cardstyles (chosen or own) and different modes (edit or not edit)
  useEffect(() => {
    // Chosen card, but not in edit
    if (cardStyle === "chosen" && mode !== "edit") {
      // Get product details
      CardService.getSingleCard(id).then((item) => {
        setProduct(item);
      });
      // All cards in edit mode
    } else if (mode === "edit") {
      // Get stored values from Shopping cart
      let key = parseInt(id);
      ShoppingCartService.getItem(key).then((item) => {
        setProduct(item);
        setImage(item.cardImage);
        setText(item.cardText);
        setTextFilters(item.cardTextFilters);
        setfontalign(item.fontAlign);
        setfontcolor(item.fontColor);
        setfontsize(item.fontSize);
        setfontstyle(item.fontStyle);
        setlineHeight(item.lineHeight);

        // Filters only for own cards
        if (cardStyle === "own") {
          setRotation(item.cardImageFilterValues.rotation);
          setBrightness(item.cardImageFilterValues.brightness);
          setContrast(item.cardImageFilterValues.contrast);
          setSaturate(item.cardImageFilterValues.saturate);
          setGrayscale(item.cardImageFilterValues.grayscale);
          setSepia(item.cardImageFilterValues.sepia);
          setCardheight(item.cardImageFilterValues.cardheight);
          setCardwidth(item.cardImageFilterValues.cardwidth);
        }

        // If gift was saved and no new one was chosen
        if (item.giftId !== null && chosenGift === null) {
          setChosenGift({
            _id: item.giftId,
            price: item.giftPrice,
            foldername: "gifts",
            url: item.giftImage,
          });
        } else if (item.giftId === null) {
          // Reset gift
          setChosenGift(null);
        }
      });
    }
    if (mode === "new") {
      // Reset all states for new card
      setRotation(0);
      setBrightness(100);
      setContrast(100);
      setSaturate(100);
      setGrayscale(0);
      setSepia(0);
      setCardheight(320);
      setCardwidth(260);
      setTextFilters(null);
      setText(null);
      setChosenGift(null);
      setfontalign("left");
      setfontcolor("black");
      setfontsize(20);
      setfontstyle("Annie Use Your Telescope");
      setlineHeight(1);

      // If own card also reset image state
      if (cardStyle === "own") {
        setImage(null);
      }
    }
  }, [cardStyle, mode, id]);

  // Adjust applied filter on change
  useEffect(() => {
    const newFilters = {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%) grayscale(${grayscale}%)`,
      transform: `rotate(${rotation}deg)`,
    };
    setImageFilters(newFilters);
  }, [
    rotation,
    brightness,
    contrast,
    saturate,
    grayscale,
    sepia,
    cardwidth,
    cardheight,
  ]);

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
  }, [fontstyle, fontcolor, fontsize, fontalign, lineHeight]);

  return (
    <div>
      {cardStyle === "own" ? (
        <CreateFront //Create card front (Upload Image und Adjust design)
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
          setCardheight={setCardheight}
          setCardwidth={setCardwidth}
        />
      ) : (
        <ShowFront //View card front (choosen card)
          product={product}
          image={image}
          mode={mode}
        />
      )}
      <CreateText //Create card text (Create Text & Adjust Text )
        text={text}
        setText={setText}
        setfontstyle={setfontstyle}
        setfontcolor={setfontcolor}
        setfontsize={setfontsize}
        setfontalign={setfontalign}
        textFilters={textFilters}
        fontsize={fontsize}
        lineHeight={lineHeight}
      />
      <CreateAddGift //Add gift part
        mode={mode}
        cardStyle={cardStyle}
        id={id}
        chosenGift={chosenGift}
        setChosenGift={setChosenGift}
      />{" "}
      <CreateFinal //View final card (front and inside text)
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
        lineHeight={lineHeight}
        textFilters={textFilters}
        cardheight={cardheight}
        cardwidth={cardwidth}
        chosenGift={chosenGift}
        popoverDrafts={popoverDrafts}
        setPopoverDrafts={setPopoverDrafts}
      />
    </div>
  );
};

export default Create;
