const Gift = require("../models/gift");

const list = async (req, res) => {
  try {
    let gift = await Gift.find({}).exec();

    return res.status(200).json(gift);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const singleItem = async (req, res) => {
  try {
    if (!req.query.id) { 
      return res.status(400).json({error:"Missing Values"});
    }
    
    let gift = await Gift.findById(req.query.id).exec();
    

    return res.status(200).json(gift);
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
  singleItem,
};
