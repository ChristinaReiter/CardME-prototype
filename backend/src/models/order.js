const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDate: {
    type: Date,
    required: true,
  },
  billingAddress: {
    type: AddressSchema,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientAddress: {
    type: AddressSchema,
    required: true,
  },
  products: {
    type: [ProductSchema],
  },

  // Subscription
});

module.exports = mongoose.model("Order", OrderSchema);
