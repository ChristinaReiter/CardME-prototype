const Account = require("../models/account");
const User = require("../models/user");


  const updateAccount = async (req, res) => { 
    try {
      console.log(req.body);
      const account = await Account.findById(req.account.id); 



      if(!account) {
        return res.status(400).json({error:"Account not found"});
      }

      const user = await User.findById(account.user);
      console.log(user);

      if(!user) {
        res.status(401).json({error:"User not found"});
      }

      if(account.user.toString() !== user.id) {
        return res.status(401).json({error:"You are not allowed to edit this acquaintance"});
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {new: true});
    
      console.log(updatedUser)

  
      return res.status(200).json(updatedUser);
      
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    } 
  };

  module.exports = {
    updateAccount,
  };