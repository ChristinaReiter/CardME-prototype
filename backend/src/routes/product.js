const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

router.get("/", ProductController.list);
router.post("/single", ProductController.singleItem);

module.exports = router;
