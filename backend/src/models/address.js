const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  additional: String,
});

AddressSchema.set("versionKey", false);

module.exports = mongoose.model("Address", AddressSchema);
