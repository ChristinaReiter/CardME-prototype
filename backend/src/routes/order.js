const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");
const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Restore extension
    let extArray = file.mimetype.split("/");
    let extension = extArray[1];
    cb(null, uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

const OrderController = require("../controllers/order");

router.post("/order", upload.single("image"), OrderController.create);
router.route("/profile/orders").get(secured, OrderController.getOrders);

module.exports = router;
