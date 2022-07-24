const express = require("express");
const router = express.Router();

const GiftController = require("../controllers/gift");

router.get("/", GiftController.list);
router.get("/single", GiftController.singleItem);

module.exports = router;