const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  password: {
    type: String,
    required: true,
  },
  preferences: [String],

  favorites: {
    type: mongoose.Schema.Types.Array,
    ref: "Product",
  },
});

AccountSchema.set("versionKey", false);

module.exports = mongoose.model("Account", AccountSchema);
