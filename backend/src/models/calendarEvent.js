const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,    
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

CalendarEventSchema.set("versionKey", false);

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
