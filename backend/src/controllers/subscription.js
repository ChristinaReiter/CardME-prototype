const Order = require("../models/order");
const Account = require("../models/account");
const Subscription = require("../models/subscription");

const getSubscription = async (req, res) => {
  try {
    //find account
    const account = await Account.findById(req.account.id);

    //find subscriptions
    const subscriptions = await Subscription.find({ account: account });

    return res.status(200).json(subscriptions);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const setSubscription = async (req, res) => {
  try {
    if (!req.body.order || !req.body.account || !req.body.paypalSubscription) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing Values" });
    }
    //create subscription
    const subscription = await Subscription.create({
      order: req.body.order,
      account: req.body.account,
      paypalSubscription: req.body.paypalSubscription,
    });

    return res.status(200).json(subscription);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    //find subscription
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(400).json({ error: "Acquaintance not found" });
    }
    //find account to check if the user is allowed to delete the subscription
    const account = await Account.findById(req.account.id);

    if (!account) {
      res.status(401).json({ error: "Account not found" });
    }

    if (account.id !== subscription.account.toString()) {
      return res
        .status(401)
        .json({ error: "You are not allowed to edit this acquaintance" });
    }
    //delete subscription
    await subscription.remove();

    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server errorr",
      message: err.message,
    });
  }
};

module.exports = {
  getSubscription,
  setSubscription,
  deleteSubscription,
};
