const express = require("express");
const router = express.Router();

const SubscriptionController = require("../controllers/subscription");

router.route("/").get(SubscriptionController.getSubscription).post(SubscriptionController.setSubscription).delete(SubscriptionController.deleteSubscription);

module.exports = router;  