const express = require("express");
const router = express.Router();
// @router  GET api/posts/test
// @desc    Test posts routes
// @access  Public
router.get("/testposts", () => res.json({ name: "posts" }));

module.exports = router;
