const Product = require("../models/product");
const fs = require("fs");
var path = require("path");

const list = async (req, res) => {
  try {
    //find all products available in the database
    let product = await Product.find({}).exec();

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const singleItem = async (req, res) => {
  try {
    if (!req.query.id) { 
      return res.status(400).json({error:"Missing Values"});
    }
    
    //find one single product by its id
    let product = await Product.findById(req.query.id).exec();
    

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const imageDirectory = async (req, res) => {
  try {
    if (!req.query.dir) { 
      return res.status(400).json({error:"Missing Values"});
    }
    
    //find the directory that contains all images of the products
    const messedPath = __dirname + "/../../public/" + req.query.dir;
    const correctPath = path.normalize(messedPath);
    const files = fs.readdirSync(correctPath);
    
    //return that directory
    return res.status(200).json(files);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  list,
  singleItem,
  imageDirectory,
};
