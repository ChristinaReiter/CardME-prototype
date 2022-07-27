const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const OrderController = require("../controllers/order");

router.post("/order", upload.single('image'), OrderController.create); //router.post("/", OrderController.create);

router.route("/profile/orders").get( secured, OrderController.getOrders)

module.exports = router;