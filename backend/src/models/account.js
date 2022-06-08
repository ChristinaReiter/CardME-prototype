const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  password: {
    type: String,
    required: true,
  },
  preferences: [String],

  // Not quite sure if below are referenced correctly
  favorites: [ProductSchema],
  calendarEvents: [CalendarEventSchema],
  pastOrders: [OrderSchema],
  subscriptions: [SubscriptionSchema],
  acquaintances: [AcquaintanceSchema]
});

module.exports = mongoose.model("Account", AccountSchema);
