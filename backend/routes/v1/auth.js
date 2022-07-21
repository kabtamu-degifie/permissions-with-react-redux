const express = require("express");
const { login } = require("../../controllers/auth.controller");

const router = express.Router();

// user login
router.post("/", login);

module.exports = router;
