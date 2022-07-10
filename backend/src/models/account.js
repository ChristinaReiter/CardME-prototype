const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
  password: {
    type: String,
    required: true,
  },
  preferences: [String],

  // Not quite sure if below are referenced correctly - maybe now
  /* favorites: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  calendarEvents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CalendarEvent",
      },
    ],
  },
  pastOrders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  subscriptions: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
  },
  acquaintances: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Acquaintance",
      },
    ],
  }, */
});

AccountSchema.set("versionKey", false);

module.exports = mongoose.model("Account", AccountSchema);
