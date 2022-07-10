const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const config = require('../config');

const secured = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {            
        const token = req.headers.authorization.split(" ")[1]; //token from header
        const decoded = jwt.verify(token, config.jwtSecret); //verify the token
        const account = await Account.findById(decoded._id); //Muss vielleicht spezifiziert werden?!?!?
        if (!account) {
            return res.status(401).json({ error: "Account not found" });
        }
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.account = account;
        next();
    }
    } catch (err) {
        console.log(error)
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = {
    secured
}