const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const config = require('../config');

const secured = async (req, res, next) => {
    let token
    try {
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {            
         token = req.headers.authorization.split(" ")[1]; //token from header
        const decoded = jwt.verify(token, config.jwtSecret); //verify the token
       
        const account = await Account.findById(decoded.id);
    
        if (!account) {
            return res.status(401).json({ error: "Account not found" });
        }
      
        req.account = account;
        next();
    }
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
     if (!token) {
        return res.status(401).json({ status: "error", message: "Unauthorized, you have no valid session" });
    } 
}

module.exports = {
    secured
}