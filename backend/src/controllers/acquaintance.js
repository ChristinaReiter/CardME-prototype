const Acquaintance = require("../models/acquaintance");
const Adress = require("../models/address");

const getAcquaintances = async (req, res) => { //TODO
    try {
      const acquaintances = await Acquaintance.find();
  
      return res.status(200).json(acquaintances);
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
      console.log(req.body)
      if (!req.body.name || !req.body.acquaintanceAddress) {
        return res.status(400).json({error:"Missing Values"});
      }
      const acquaintanceAddress = await Address.create({
        street: req.body.street,
        streetNumber: req.body.number,
        zipCode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country,
      }); 
      const acquaintance = await Acquaintance.create({
        name: req.body.name,
        acquaintanceAdress: acquaintanceAddress._id,

      });
  
      return res.status(200).json(acquaintance);
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
      const acquaintance = await Acquaintance.findById(req.params.id);

      if(!acquaintance) {
        return res.status(400).json({error:"Acquaintance not found"});
      }

      const updatedAcquaintance = await Acquaintance.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
      return res.status(200).json(updatedAcquaintance);
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
      const acquaintance = await Acquaintance.findById(req.params.id);

      if(!acquaintance) {
        return res.status(400).json({error:"Acquaintance not found"});
      }

      await acquaintance.remove();

  
      return res.status(200).json({message: "Acquaintance deleted"});
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  module.exports = {
    getAcquaintances,
    setAcquaintance,
    updateAcquaintance,
    deleteAcquaintance,
  };
  