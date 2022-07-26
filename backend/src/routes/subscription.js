const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const SubscriptionController = require("../controllers/subscription");

router.route("/").get( secured, SubscriptionController.getSubscription)
router.post("/", SubscriptionController.setSubscription)

router.route("/:id").delete( secured, SubscriptionController.deleteSubscription);

module.exports = router;  