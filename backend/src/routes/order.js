const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const OrderController = require("../controllers/order");

router.post("/order", OrderController.create); //router.post("/", OrderController.create);

router.route("/profile/orders").get( secured, OrderController.getOrders)

module.exports = router;