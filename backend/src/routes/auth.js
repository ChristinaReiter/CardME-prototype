const express = require("express");
const router = express.Router();
const Secure = require("../middleware/authMW");
const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", Secure.secured, AuthController.getMe);

module.exports = router;  