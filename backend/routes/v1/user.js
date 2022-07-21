const express = require("express");
const controller = require("../../controllers/user.controller");

const router = express.Router();
/**
 * @typedef USER
 * @property {string} username.required - A Unique usename
 * @property {string} email.required - A Unique email
 * @property {string} password.required - A Strong password
 */

/**
 * Create a new user
 *
 * @route GET /users
 * @group User - CRUD on user model
 * @param {string} sort.query - sort parameter
 * @param {string} page.query - set the page number
 * @param {string} filter.query - set filter string
 * @security JWT
 * @returns {object} 200 - Array of users
 * @returns {Error} default - Unexpected error
 *
 */
router.get("/:id", controller.get);

// get all users
router.get("/", controller.all);

// add a new user
router.post("/", controller.create);

// update user
router.put("/:id", controller.update);
module.exports = router;
