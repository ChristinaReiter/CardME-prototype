const Order = require("../models/order");
const Account = require("../models/account");
const Subscription = require("../models/subscription");

const getSubscription = async (req, res) => { //TODO
  try {
    
    const account = await Account.findById(req.account.id);

   
    const subscriptions = await Subscription.find({ account: account });
    console.log(subscriptions);

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
      console.log(req.body)
      const subscription = await Subscription.create({
        order: req.body.id,   
        account: req.account.id 
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

  const deleteSubscription = async (req, res) => { //TODO
    try {
      const orders = await Order.find();
  
      return res.status(200).json(orders);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  module.exports = {
    getSubscription,
    setSubscription,
    deleteSubscription,
  };
  