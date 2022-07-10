const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

SubscriptionSchema.set("versionKey", false);

module.exports = mongoose.model("Subscription", SubscriptionSchema);