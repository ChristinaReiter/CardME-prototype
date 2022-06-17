const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  price: Number,
  title: String,
  designer: String,
  description: String,
});

ProductSchema.set("versionKey", false);

module.exports = mongoose.model("Product", ProductSchema);
