const Order = require("../models/order");
const Address = require("../models/address");
const User = require("../models/user");
const Account = require("../models/account");

const create = async (req, res) => {
  try {
    if (!req.body.recipient || !req.body.billingAddress || !req.body.email || !req.body.product || !req.body.deliveryDate || !req.file) {
      return res.status(400).json({status: "error", message: "Missing Values"});
    }

    // Parse recipient fields, create address
    const recipientBody = JSON.parse(req.body.recipient)
    const recipientAddress = await Address.create({
      street: recipientBody.street,
      streetNumber: recipientBody.number,
      zipCode: recipientBody.zipcode,
      city: recipientBody.city,
      country: recipientBody.country,
    });

    // Parse billing fields, interim object
    const billingBody = JSON.parse(req.body.billingAddress)
    let billingObject = {
      street: billingBody.street,
      streetNumber: billingBody.number,
      zipCode: billingBody.zipcode,
      city: billingBody.city,
      country: billingBody.country,
    }

    // Search for billing address already exisitng
    let billingAddress = await Address.findOne(billingObject);

    // If not create a new one
    if (billingAddress == undefined) {
      billingAddress = await Address.create(billingObject);
    }

    // Search for user already existing
    let userName = billingBody.firstName + " " + billingBody.lastName;
    let user = await User.findOne({ email: req.body.email });

    // If not create a new one
    if (user == undefined) {
      user = await User.create({ email: req.body.email, name: userName });
    }

    let recipientName =
      recipientBody.firstName + " " + recipientBody.lastName;

    const productBody = JSON.parse(req.body.product) 

    const order = await Order.create({
      user: user._id,
      dateCreated: new Date().toISOString(),
      deliveryDate: req.body.deliveryDate,
      billingAddress: billingAddress._id,
      recipientName: recipientName,
      recipientAddress: recipientAddress._id,
      products: productBody,
      total: (productBody.cardPrice + productBody.giftPrice),
      status: "CREATED"
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

const getOrders = async (req, res) => {
  
  try {
    
    const account = await Account.findById(req.account.id);

   
    const orders = await Order.find({ user: account.user });
    console.log(account.user);
    console.log(orders)

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

// user cant update/delete by himself => needs to write a email 

module.exports = {
  create,
  getOrders,
};
