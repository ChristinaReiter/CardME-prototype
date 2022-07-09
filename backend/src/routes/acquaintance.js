const express = require("express");
const router = express.Router();

const AcquaintanceController = require("../controllers/acquaintance");

router.route("/").get(AcquaintanceController.getAcquaintance).post(AcquaintanceController.setAcquaintance).put(AcquaintanceController.updateAcquaintance).delete(AcquaintanceController.deleteAcquaintance);

module.exports = router;  