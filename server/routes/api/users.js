const express = require("express");
const router = express.Router();

// @router  GET api/users/test
// @desc    Test users routes
// @access  Public
router.get("/testuser", () => res.json({ name: "user" }));

module.exports = router;
