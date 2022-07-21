const express = require("express");

const router = express.Router();

/**
 * Returns API status
 *
 * @route GET /
 * @group index - Validate and gives you back API service status
 * @returns {object} 200  - {
 *     title: "Node Express Boilerplate API",
 *     version: "1.0.0",
 *     description: "Node Express Boilerplate.",
 * }
 * @returns {Error} default - Unexpected error
 */

router.get("/", (req, res) => {
  res.json({
    title: "Node Express Boilerplate",
    version: "1.0.0",
    description: "Node Express Boilerplate.",
  });
});

module.exports = router;
