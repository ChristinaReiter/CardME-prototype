const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema({
  price: Number,
  title: String,
  designer: String,
  description: String,
  url: String,
  pricerange: String,
  size: String,
  occasion: Array,
  date: Date,
  foldername: String,
  popularity: String,
});

GiftSchema.set("versionKey", false);

module.exports = mongoose.model("Gift", GiftSchema);
