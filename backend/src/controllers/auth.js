const User = require("../models/user");
const Account = require('../models/account');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
    console.log(req.body)
    try{
      const securePassword = await bcrypt.hash(req.body.password, 8);
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
         })
      const account = await Account.create({
        _id: user._id,
        password: securePassword,
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
        _id: user._id, 
    })
    console.log(account.password)
    const isPasswordValid = await bcrypt.compare(req.body.password, account.password)
     
    if (isPasswordValid){
        const token = jwt.sign({
        _id: account._id,
        },
        "secret123"  // better secret needed
        ) 
        return res.json({status: 'ok', account: token})
      
     }else {
        return res.json({status: 'error', message: 'Password Invalid'})
     }
    } catch (err) {
        return res.status(404).json({
          error: "Account Not Found",
          message: err.message,
        });
    }
};  


module.exports = {
    register,
    login,
  };
  