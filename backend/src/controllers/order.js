const Order = require("../models/order");
const Address = require("../models/address");
const User = require("../models/user");

const create = async (req, res) => {
  try {
    // probably to outsource to own function
    const recipientAddress = await Address.create({
      street: req.body.recipientStreet,
      streetNumber: req.body.recipientNumber,
      zipCode: req.body.recipientZipcode,
      city: req.body.recipientCity,
      country: req.body.recipientCountry,
    });
    const billingAddress = await Address.create({
      street: req.body.billingStreet,
      streetNumber: req.body.billingNumber,
      zipCode: req.body.billingZipcode,
      city: req.body.billingCity,
      country: req.body.billingCountry,
    });
    let userName = req.body.billingFirstName + " " + req.body.billingLastName;

    const user = await User.create({ email: req.body.email, name: userName });

    let recipientName =
      req.body.recipientFirstName + " " + req.body.recipientLastName;

    const order = Order.create({
      user: user._id,
      deliveryDate: req.body.deliveryDate,
      billingAddress: billingAddress._id,
      recipientName: recipientName,
      recipientAddress: recipientAddress._id,
      products: []
    });

    return res.status(201).json({ response: "success" });
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
};
