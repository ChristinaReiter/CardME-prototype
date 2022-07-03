const User = require("../models/user");
const Account = require('../models/account');


const register = async (req, res) => {
  console.log(req.body);
  try {
    /* const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      
    }) */
    const account = await Account.create({
      user: await User.create ({
        name: req.body.name,
        email: req.body.email,
        
      }),
      password: req.body.password,
    })

  return res.json({status: 'ok'})

} catch (err) {
  console.log(err)
  return res.json({status: 'error', message: err.message})
}
};

const login = async (req, res) => {
    try{
    const account = await User.findOne({
      email: req.body.email,
      password: req.body.password,    
  })

  if (account){
  res.json({status: 'ok'})
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
 