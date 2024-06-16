const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const TokenController = require("../controllers/tokenController");

const router = express.Router();
const tokenController = new TokenController();

router.post("/add-token", authMiddleware(["1", "2", "3"]), (req, res) => tokenController.addToken(req, res));

module.exports = router;
