const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDate: {
    type: Date,
    required: true,
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  status: {
    type: String,
    //required: true,
  },
  products: {
    type: Object
  },
 //Subscription?
});

OrderSchema.set("versionKey", false);

module.exports = mongoose.model("Order", OrderSchema);
