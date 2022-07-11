const Order = require("../models/order");

const getCalendarEvent = async (req, res) => { //TODO
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

  const setCalendarEvent = async (req, res) => { //TODO
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

  const updateCalendarEvent = async (req, res) => { //TODO
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

  const deleteCalendarEvent = async (req, res) => { //TODO
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
    getCalendarEvent,
    setCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  };
  