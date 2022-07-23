const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  favorites: {
    productID: String,
  }
});

UserSchema.set("versionKey", false);

module.exports = mongoose.model("User", UserSchema);
