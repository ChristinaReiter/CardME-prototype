const Order = require("../models/order");

const getAccount = async (req, res) => { //TODO
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

  const updateAccount = async (req, res) => { //TODO
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
    getAccount,
    updateAccount,
  };