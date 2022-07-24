const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  price: Number,
  title: String,
  designer: String,
  description: String,
  url: String,
  color: Array,
  vibe: Array,
  style: Array,
  recipient: Array,
  occasion: Array,
  season: Array,
  date: Date,
  foldername: String,
});

ProductSchema.set("versionKey", false);

module.exports = mongoose.model("Product", ProductSchema);
