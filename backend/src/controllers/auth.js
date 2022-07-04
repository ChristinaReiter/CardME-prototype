const User = require("../models/user");
const Account = require('../models/account');


const register = async (req, res) => {
    console.log(req.body)
    try{
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
         })
      const account = await Account.create({
        user: user._id,
        password: req.body.password,
      })
      return res.json({response: 'success'})
    
    
    } catch (err) {
      console.log(err)
     return res.json({status: "error", error: "Duplicate Email"})
    }
    
  }
  

 const login = async (req, res) => {
    try{
    const user = await User.findOne({email: req.body.email})
    const account = await Account.findOne({
      user: user._id,
      password: req.body.password,    
  })

  if (account){
  res.json({status: 'ok', account: true})
  }else {
    res.json({status: 'error', message: 'User not found'})
  }
  } catch (err) {
  return res.status(404).json({
    error: "User Not Found",
    message: err.message,
    });
  }
};  


module.exports = {
    register,
    login,
  };
  