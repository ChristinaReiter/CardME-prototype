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
});

AcquaintanceSchema.set("versionKey", false);

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
