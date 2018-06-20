const express = require("express");
const router = express.Router();

// @router  GET api/profiles/test
// @desc    Test profiles routes
// @access  Public
router.get("/testprofile", () => res.json({ name: "profile" }));

module.exports = router;
