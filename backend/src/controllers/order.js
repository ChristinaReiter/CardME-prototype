const Order = require("../models/order");
const Address = require("../models/address");
const User = require("../models/user");

const create = async (req, res) => {
  try {
    // probably to outsource to own function
    const recipientAddress = await Address.create({
      street: req.body.recipient.street,
      streetNumber: req.body.recipient.number,
      zipCode: req.body.recipient.zipcode,
      city: req.body.recipient.city,
      country: req.body.recipient.country,
    });

    let billingAddress = await Address.findOne({
      street: req.body.billingAddress.street,
      streetNumber: req.body.billingAddress. number,
      zipCode: req.body.billingAddress.zipcode,
      city: req.body.billingAddress.city,
      country: req.body.billingAddress.country,
    });

    if (billingAddress == undefined) {
      billingAddress = await Address.create({
        street: req.body.billingAddress.street,
        streetNumber: req.body.billingAddress.number,
        zipCode: req.body.billingAddress.zipcode,
        city: req.body.billingAddress.city,
        country: req.body.billingAddress.country,
      });
    }
    let userName = req.body.billingAddress.firstName + " " + req.body.billingAddress.lastName;

    let user = await User.findOne({ email: req.body.email });

    if (user == undefined) {
      user = await User.create({ email: req.body.email, name: userName });
    }

    let recipientName =
      req.body.recipient.firstName + " " + req.body.recipient.lastName;

    const order = await Order.create({
      user: user._id,
      deliveryDate: req.body.deliveryDate,
      billingAddress: billingAddress._id,
      recipientName: recipientName,
      recipientAddress: recipientAddress._id,
      products: req.body.product,
    });

    return res.status(201).json({ response: "success", order: order });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const getOrder = async (req, res) => {
  //TODO
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

const updateOrder = async (req, res) => {
  //TODO
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

const deleteOrder = async (req, res) => {
  //TODO
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
  create,
  getOrder,
  updateOrder,
  deleteOrder,
};
