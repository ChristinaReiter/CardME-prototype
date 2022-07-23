const express = require("express");
const router = express.Router();

const FavoriteController = require("../controllers/favorite");

router.route("/").get(FavoriteController.getFavorite).post(FavoriteController.setFavorite).put(FavoriteController.removeFavorite);

module.exports = router;  