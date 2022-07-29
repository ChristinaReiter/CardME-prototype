const Address = require("../models/address");

const getAddress = async (req, res) => {
  try {
    //find the address by its id
    const address = await Address.findOne({ _id: req.params.id });

    return res.status(201).json(address);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  getAddress,
};
