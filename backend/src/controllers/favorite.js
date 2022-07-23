const Users = require("../models/user");

const getFavorite = async (req, res) => { //TODO
    try {
      if (!req.query.id) { 
        return res.status(400).json({error:"Missing Values"});
      }

      const users = await Users.findById(req.query.id);
      if (!users) {
        return res.status(400).json({error:"User not found"});
      }

      const favorites = users.favorites;
  
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
      const users = await Users.find();
      
      return res.status(200).json(users);
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
      console.log(res);
      const user = await Users.findById(req.body.userID).exec();
      

      if (!user) {
        return res.status(400).json({error:"User not found"});
      }

      const favorites = user.favorites;
  
      return res.status(200).json(user);
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