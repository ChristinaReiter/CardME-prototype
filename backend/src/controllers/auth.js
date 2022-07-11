const User = require("../models/user");
const Account = require('../models/account');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");


const register = async (req, res) => {
    console.log(req.body)
    try{
      if (!req.body.name || !req.body.email || !req.body.password) { // Is this even needed with the form?
        return res.status(400).json({error:"Missing Values"});
      }
      const securePassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
         })
      const account = await Account.create({
        user: user._id,
        password: securePassword,
      })
      return res.status(201).json({_id: account.id, user: user.id, email: user.email, name: user.name})
    
    
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
    })
    console.log(account.password)
    const isPasswordValid = await bcrypt.compare(req.body.password, account.password)
     
    if (isPasswordValid){
      
        const token = jwt.sign({
        _id: account._id,
        },
        config.jwtSecret,  // secret
        {
          expiresIn: "1d", // expires in 1 day
        }
        );
        return res.status(201).json({_id: account.id, user: user.id, email: user.email, name: user.name, token: token})
      
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

const getMe = async (req, res) => {
  const account = await Account.findById(req.account._id)
  const user = await User.findById(account.user)
  
  res.status(200).json({
    _id: account.id,
    user: user.id,
    email: user.email,
    name: user.name,    
  })
}


module.exports = {
    register,
    login,
    getMe
  };
  