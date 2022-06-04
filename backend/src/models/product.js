const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  price: Number,
  title: String,
  designer: String,
  description: String,
});

module.exports = mongoose.model("Product", ProductSchema);
