const Users = require("../models/user");
const Account = require("../models/account");

const getFavorite = async (req, res) => { //TODO
    try {
      if (!req.query.id) { 
        return res.status(400).json({error:"Missing Values"});
      }
      
      const account = await Account.findById(req.account.id);
      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }
      
      const favorites = account.favorites;
      console.log(account);
      
      return res.status(200).json(favorites);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const setFavorite = async (req, res) => { //TODO
    try {
      const account = await Account.findById(req.account.id);

      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }

      var newFaves = {
        $addToSet: {favorites: req.body.product}
      }
      
      const updatedAccount = await Account.findOneAndUpdate({id: req.account.id}, newFaves);
  
      return res.status(200).json(updatedAccount);
      
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const removeFavorite = async (req, res) => { 
    try {
      const account = await Account.findById(req.account.id);

      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }

      var newFaves = {
        $pullAll: {favorites: req.params.deleteUId}
      }
      console.log(req.params.deleteUId);
      
      const updatedAccount = await Account.findOneAndUpdate({id: req.account.id}, newFaves);
  
      return res.status(200).json(updatedAccount.favorites);
      
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  module.exports = {
    getFavorite,
    setFavorite,
    removeFavorite,
  };