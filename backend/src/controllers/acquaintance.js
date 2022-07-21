const Acquaintance = require("../models/acquaintance");
const Address = require("../models/address");
const Account = require("../models/account");
const mongoose = require('mongoose');
const getAcquaintances = async (req, res) => { 
    try {
   
      const acquaintances = await Acquaintance.find({ account: req.account.id });
  
      return res.status(200).json(acquaintances);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const setAcquaintance = async (req, res) => { 
    try {
      console.log(req.body)
      if (!req.body.name || !req.body.street || !req.body.number || !req.body.city || !req.body.zipcode || !req.body.country) {
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
        acquaintanceAddress: acquaintanceAddress._id,
        account: req.account.id 

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
    res.status(200).json({message: `Update ${req.params.id}`})
  
    /* try {
      const acquaintance = await Acquaintance.findById(req.params.id); //params.id

      if(!acquaintance) {
        return res.status(400).json({error:"Acquaintance not found"});
      }

      const account = await Account.findById(req.account.id);

      if(!account) {
        res.status(401).json({error:"Account not found"});
      }

      if(account.id !== acquaintance.account.toString()) {
        return res.status(401).json({error:"You are not allowed to edit this acquaintance"});
      }

      const updatedAcquaintance = await Acquaintance.findByIdAndUpdate(req.body.id, req.body, {new: true});
  
      return res.status(200).json(updatedAcquaintance);
      
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    } */
  };

  const deleteAcquaintance = async (req, res) => { 
    console.log("Hello")
    console.log(mongoose.isValidObjectId(req.params.id))
    try {
      const acquaintance = await Acquaintance.findById(req.params.id); 

      if(!acquaintance) {
        return res.status(400).json({error:"Acquaintance not found"});
      }

      const account = await Account.findById(req.account.id);

      if(!account) {
        res.status(401).json({error:"Account not found"});
      }

      if(account.id !== acquaintance.account.toString()) {
        return res.status(401).json({error:"You are not allowed to edit this acquaintance"});
      } 

      await acquaintance.remove();

  
      return res.status(200).json({id: req.params.id}); 
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server errorr",
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
  