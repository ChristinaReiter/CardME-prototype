const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const AcquaintanceController = require("../controllers/acquaintance");

router
  .route("/")
  .get(secured, AcquaintanceController.getAcquaintances)
  .post(secured, AcquaintanceController.setAcquaintance);

router
  .route("/:id")
  .put(secured, AcquaintanceController.updateAcquaintance)
  .delete(secured, AcquaintanceController.deleteAcquaintance);

module.exports = router;
