const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order");

router.post("/", OrderController.create);

router.route("/profile/orders").get(OrderController.getOrder).put(OrderController.updateOrder).delete(OrderController.deleteOrder); //TODO

module.exports = router;