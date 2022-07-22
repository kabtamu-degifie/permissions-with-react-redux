const express = require("express");
const controller = require("../../controllers/permission.controller");
const { hasPermission } = require("../../middlewares/auth");

const router = express.Router();

// get permission by id
router.get("/:id", hasPermission("view_permission"), controller.get);

// get all permissions
router.get("/", hasPermission("view_permission"), controller.all);

module.exports = router;
