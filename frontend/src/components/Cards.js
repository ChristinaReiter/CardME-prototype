import React, { useEffect, useState } from "react";
import CardService from "../services/CardService";

const Cards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    CardService.getAllCards().then((result) => {
      setProducts(result);
    }, (error) => {
      console.log(error)
    });
  }, []);

  return (
    <div>
      <p>All Cards:</p>
      {products.map((product) => (
        <div>
          <p key={product._id}>{product.title} by {product.designer}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
