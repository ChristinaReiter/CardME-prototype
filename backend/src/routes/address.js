const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const AddressController = require("../controllers/address");

router.route("/:id").get(AddressController.getAddress) 

module.exports = router;  