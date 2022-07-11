const mongoose = require("mongoose");

const AcquaintanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  acquaintanceAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

AcquaintanceSchema.set("versionKey", false);

module.exports = mongoose.model("Acquaintance", AcquaintanceSchema);
