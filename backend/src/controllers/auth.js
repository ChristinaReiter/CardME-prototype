const User = require("../models/user");
const Account = require("../models/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing Values" });
    }
    //to check if user (email) already exists
    const userTest = await User.findOne({ email: req.body.email });
    if (userTest) {
      // to make sure you can't change the name of accounts over the register page
      const accountTest = await Account.findOne({ user: userTest._id });
      if (accountTest) {
        return res.status(404).json({
          status: "error",
          message: "Email already belongs to an account",
        });
      }
    }
    // hash password
    const securePassword = await bcrypt.hash(req.body.password, 10);
    if (!userTest) {
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
      });
      //create new account
      const account = await Account.create({
        user: user._id,
        password: securePassword,
      });
      return res.status(201).json({
        _id: account.id,
        user: user.id,
        email: user.email,
        name: user.name,
      });
    } else {
      // to update the user's name if he already had an user from creating an order but not an account
      const updatedUser = await User.findByIdAndUpdate(userTest._id, req.body, {
        new: true,
      });
      //create new account
      const account = await Account.create({
        user: updatedUser._id,
        password: securePassword,
      });

      return res.status(201).json({
        _id: account.id,
        user: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "error",
      message: "Email already belongs to an account",
    });
  }
};

const login = async (req, res) => {
  try {
    //find user and his account
    const user = await User.findOne({ email: req.body.email });
    const account = await Account.findOne({
      user: user._id,
    });
    //check password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      account.password
    );

    if (isPasswordValid) {
      //assign token
      const token = jwt.sign(
        {
          id: account.id,
        },
        // secret
        config.jwtSecret,
        {
          // expires in 1 week
          expiresIn: "7d",
        }
      );
      return res.status(201).json({
        _id: account.id,
        user: user.id,
        email: user.email,
        name: user.name,
        token: token,
      });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "Password Invalid" });
    }
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "Account Not Found",
    });
  }
};

const getMe = async (req, res) => {
  const account = await Account.findById(req.account.id);
  const user = await User.findById(account.user);

  res.status(200).json(user);
};

const accountFree = async (req, res) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing Values" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const account = await Account.findOne({ user: user._id });

      if (account) {
        return res.status(200).json({
          existing: true,
        });
      } else {
        return res.status(200).json({
          existing: false,
        });
      }
    } else {
      return res.status(200).json({
        existing: false,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "Account Not Found",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  accountFree,
};
