const express = require("express");
const controller = require("../../controllers/role.controller");
const { hasPermission } = require("../../middlewares/auth");

const router = express.Router();

// get role by id
router.get("/:id", hasPermission("view_role"), controller.get);

// get all roles
router.get("/", hasPermission("view_role"), controller.all);

// create role
router.post("/", hasPermission("view_role", "create_role"), controller.create);

// update role
router.put(
  "/:id",
  hasPermission("view_role", "update_role"),
  controller.update
);

// remove role
router.delete(
  "/:id",
  hasPermission("view_role", "remove_role"),
  controller.remove
);

module.exports = router;
