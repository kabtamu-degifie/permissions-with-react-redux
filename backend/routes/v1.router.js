const express = require("express");

const indexRoute = require("./v1/index");
const userRoute = require("./v1/user");
const authRoute = require("./v1/auth");

const router = express.Router();

router.use("/", indexRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
