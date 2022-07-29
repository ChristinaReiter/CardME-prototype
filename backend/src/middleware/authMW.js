const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const config = require("../config");

//protect routes by checking if there is an Authorization header that has a valid token, if not deny the request
const secured = async (req, res, next) => {
  let token;
  try {
    //check for auth header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //get the token from the header
      token = req.headers.authorization.split(" ")[1];
      //verify the token
      const decoded = jwt.verify(token, config.jwtSecret);
      
      //find the account in the database
      const account = await Account.findById(decoded.id);

      if (!account) {
        return res
          .status(401)
          .json({ status: error, error: "Account not found" });
      }
      //add the account to the request object
      req.account = account;
      next();
    }
  } catch (err) {
    return res
      .status(401)
      .json({
        status: "error",
        message: "Unauthorized, maybe your token expired",
        error: "Unauthorized",
      });
  }
  if (!token) {
    return res
      .status(401)
      .json({
        status: "error",
        message: "Unauthorized, you have no valid session",
      });
  }
};

module.exports = {
  secured,
};
