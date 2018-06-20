const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const secret = require("../../config/keys").secret;

// @router  GET api/users/test
// @desc    Test users routes
// @access  Public
router.get("/testuser", (req, res) => res.json({ name: "user" }));

// @router  GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(email => {
    if (email) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default size
      });

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @router  GET api/users/login
// @desc    Login user / Return JWT token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //Find user by email
  User.findOne({ email }).then(user => {
    //Check user
    if (!user) return res.status(404).json({ message: "User not found" });
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User found
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        // Generate token
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
