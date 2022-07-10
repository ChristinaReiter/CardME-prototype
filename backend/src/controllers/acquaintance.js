const Order = require("../models/order");

const getAcquaintance = async (req, res) => { //TODO
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

  const setAcquaintance = async (req, res) => { //TODO
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

  const updateAcquaintance = async (req, res) => { //TODO
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

  const deleteAcquaintance = async (req, res) => { //TODO
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
    getAcquaintance,
    setAcquaintance,
    updateAcquaintance,
    deleteAcquaintance,
  };
  