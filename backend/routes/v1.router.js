const express = require("express");

const indexRoute = require("./v1/index");
const userRoute = require("./v1/user");
const authRoute = require("./v1/auth");
const permissionRoute = require("./v1/permission");

const router = express.Router();

router.use("/", indexRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/permissions", permissionRoute);

module.exports = router;
