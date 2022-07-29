const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const DetailsController = require("../controllers/details");

router.route("/profile/details").put(secured, DetailsController.updateAccount);
router
  .route("/profile/password")
  .put(secured, DetailsController.changePassword);

module.exports = router;
