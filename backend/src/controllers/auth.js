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
    const userTest = await User.findOne({ email: req.body.email }); //to check if user (email) already exists
    if (userTest) {
    const accountTest = await Account.findOne({ user: userTest._id }); // to make sure you can't change the name of accounts over the register page
    if (accountTest) {
      return res
        .status(404)
        .json({
          status: "error",
          message: "Email already belongs to an account",
        });
    }
  }
    const securePassword = await bcrypt.hash(req.body.password, 10);
    if (!userTest) {
      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
      });
      const account = await Account.create({
        user: user._id,
        password: securePassword,
      });
      return res
        .status(201)
        .json({
          _id: account.id,
          user: user.id,
          email: user.email,
          name: user.name,
        });
    } else {
      const updatedUser = await User.findByIdAndUpdate(userTest._id, req.body, {
        new: true,
      }); // to update the user's name if he already had a use but not an account
      const account = await Account.create({
        user: updatedUser._id,
        password: securePassword,
      });

      return res
        .status(201)
        .json({
          _id: account.id,
          user: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({
        status: "error",
        message: "Email already belongs to an account",
      });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const account = await Account.findOne({
      user: user._id,
    });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      account.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: account.id,
        },
        config.jwtSecret, // secret
        {
          expiresIn: "7d", // expires in 1 week
        }
      );
      return res
        .status(201)
        .json({
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
