const Product = require("../models/product");

const list = async (req, res) => {
  try {
    let product = await Product.find({}).exec();

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  list,
};
