const Account = require("../models/account");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const updateAccount = async (req, res) => {
  try {
    //find account
    const account = await Account.findById(req.account.id);

    if (!account) {
      return res.status(400).json({ error: "Account not found" });
    }
    // find user to update the name
    const user = await User.findById(account.user);

    if (!user) {
      res.status(401).json({ error: "User not found" });
    }

    if (account.user.toString() !== user.id) {
      return res
        .status(401)
        .json({ error: "You are not allowed to edit this account" });
    }
    //update user
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    //find account
    const account = await Account.findById(req.account.id);

    //check old password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      account.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Password",
      });
    } else {
      //assign new password and update account
      const securePassword = await bcrypt.hash(req.body.newPassword, 10);
      const updatedAccount = await Account.findByIdAndUpdate(
        account.id,
        {
          password: securePassword,
        },
        { new: true }
      );
      return res.status(200).json(updatedAccount);
    }
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
  changePassword,
};
