const mongoose = require("mongoose");

const AcquaintanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
});

AcquaintanceSchema.set("versionKey", false);

module.exports = mongoose.model("Acquaintance", AcquaintanceSchema);
