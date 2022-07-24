const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const FavoriteController = require("../controllers/favorite");

router.route("/").get(secured, FavoriteController.getFavorite).post(secured, FavoriteController.setFavorite).delete(secured, FavoriteController.removeFavorite);

module.exports = router;  