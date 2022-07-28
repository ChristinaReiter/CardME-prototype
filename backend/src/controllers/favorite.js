const Account = require("../models/account");

const getFavorite = async (req, res) => {
    try {
      //find the account by its id
      const account = await Account.findById(req.account.id);
      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }
      
      //get the favorites from the account
      const favorites = account.favorites;
      
      return res.status(200).json(favorites);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const setFavorite = async (req, res) => { 
    try {
      //find the account by its id
      const account = await Account.findById(req.account.id);


      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }

      //create a new component with the favorited product
      var newFaves = {
        $addToSet: {favorites: req.body.product}
      }
      
      //update the account
      const updatedAccount = await Account.findByIdAndUpdate(account.id, newFaves);
  
      //return the favorites of the updated account
      return res.status(200).json(await updatedAccount.favorites);
      
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
      //find the account by its id
      const account = await Account.findById(req.account.id);

      if (!account) {
        return res.status(400).json({error:"Account not found"});
      }

      //favorite that has to be removed
      var newFaves = {
        $pullAll: {favorites: [req.body.product]}
      }
      
      //update the account by removing the given favorite
      const updatedAccount = await Account.findByIdAndUpdate(account.id, newFaves);
  
      //return the account's favorite
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