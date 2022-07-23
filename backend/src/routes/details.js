const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const DetailsController = require("../controllers/details");



router.route("/").put( secured, DetailsController.updateAccount);

module.exports = router;  